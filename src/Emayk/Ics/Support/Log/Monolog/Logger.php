<?php
/**
 * Copyright (C) 2013  Emay Komarudin
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * @author Emay Komarudin
 *
 **/


namespace Emayk\Ics\Support\Log\Monolog;

use Carbon\Carbon;
use \Monolog\Logger as LoggerMonolog;
use \File;
use \Emayk\Ics\Exception\FileNotFoundException;
use \Config;
use \Log;

//use \Events;

/**
 * Class Logger
 *
 * @package Emayk\Ics\Support\Log\Monolog
 */
class Logger
{
	/**
	 * @var
	 */
	protected $logger;
	/**
	 * @var null
	 */
	protected $file;
	/**
	 * @var string
	 */
	protected $defaultlevel = 'info';
	/**
	 * @var array
	 */
	protected $allowLevel = array('DEBUG', 'INFO', 'NOTICE', 'WARNING', 'ERROR', 'CRITICAL', 'ALERT', 'EMERGENCY');
	/**
	 * @var string
	 */
	protected $channel;
	/**
	 * @var string
	 */
	protected $level;
	/**
	 * @var
	 */
	protected $path;

	/**
	 * @return mixed
	 */
	public function getPath()
	{
		return Config::get('ics::path.logger');
	}


	/**
	 * @param string $channel
	 */
	public function setChannel($channel)
	{
		$this->channel = $channel;
	}

	/**
	 * @return string
	 */
	public function getChannel()
	{
		return $this->channel;
	}

	/**
	 * @param mixed $file
	 */
	public function setFile($file)
	{
		$this->file = $this->setterFn($file);
	}

	/**
	 * @return mixed
	 */
	public function getFile()
	{
		return $this->file;
	}

	/**
	 * @return string
	 */
	protected function setMessage()
	{
		return
			'============================================================================' . PHP_EOL .
			'New Starting Log File : Created By System at ' . Carbon::create() . PHP_EOL .
			'============================================================================' . PHP_EOL;
	}

	/**
	 * @param string $level
	 */
	public function setLevel($level)
	{
		$this->level = $level;
	}

	/**
	 * @return string
	 */
	public function getLevel()
	{
		return $this->level;
	}

	/**
	 * @param       $msg
	 * @param array $context
	 *
	 * @return bool
	 */
	public function  warning($msg, array $context = array())
	{
		return $this->logger->addWarning($msg, $context);
	}

	/**
	 * @return mixed
	 */
	public function getLogger()
	{
		return $this->logger;
	}

	/**
	 * @param       $message
	 * @param array $context
	 *
	 * @return bool
	 */
	public function debug($message, array $context = array())
	{
		Log::useDailyFiles($this->setterFn('Ics-Common'));
		Log::debug($message, $context);
	}

	/**
	 * @param       $message
	 * @param array $context
	 *
	 * @return mixed
	 */
	public function info($message, array $context = array())
	{
		return $this->log($message, $context);
	}

	protected  function log($message, array $context = array(), $severity = 'info')
	{
		$severity = strtolower($severity);
		switch ($severity) {
			case 'debug' :
			{
				Log::debug($message, $context);
				break;
			}
			case 'notice' :
			{
				Log::notice($message, $context);
				break;
			}
			case 'error' :
			{
				Log::error($message, $context);
				break;
			}
			case 'warning' :
			{
				Log::warning($message, $context);
				break;
			}
			case 'critical' :
			{
				Log::critical($message, $context);
				break;
			}
			case 'alert' :
			{
				Log::alert($message, $context);
				break;
			}
			default :
				{
				Log::info($message, $context);
				break;
				}

		}

		return Log::info($message, $context);
	}

	/**
	 * @param array $context
	 */
	public function loginfailure(array $context = array())
	{
		Log::useDailyFiles($this->setterFn('LoginFailure'));
		Log::debug('Error Login ', $context);
		Event::fire('user.login.failure', $context);
	}

	/**
	 * @param       $message
	 * @param array $context
	 */
	public function login($message, $context = array())
	{
//		$logger = $this->createMonolog('security', 'info', 'Login');
//		$logger->addInfo($message, $context);
		$this->log($message,$context,'alert');
		Event::fire('user.login.failure', $context);
	}

	/**
	 * @param $file
	 *
	 * @return mixed
	 * @throws \Emayk\Ics\Exception\FileNotFoundException
	 */
	protected function checkFileAndCreate($file)
	{
		/**
		 * Cek keberadaan File
		 */
		try {
			if (!File::exists($file)) {
				File::put($file, $this->setMessage());
				return $file;
			}

		} catch (\Exception $e) {
			throw new FileNotFoundException( "Directory Problem {$file}" );
		}
		return $file;

	}

	/**
	 * @param $level
	 *
	 * @return string
	 */
	protected function checkLevelAllowed($level)
	{
		$level = strtoupper($level);
		return ( !in_array($level, $this->allowLevel) )
			? strtoupper($this->defaultlevel) : $level;
	}

	/**
	 * @param        $channel
	 * @param string $level
	 * @param string $file
	 *
	 * @return LoggerMonolog
	 */
	protected function createMonolog($channel, $level = 'INFO', $file = 'Common')
	{
		$file   = $this->setterFn($file);
		$logger = new \Monolog\Logger( $channel );

		$file = $this->checkFileAndCreate($file);

		$level = $this->checkLevelAllowed($level);

		$logger->pushHandler(
			new FileHandler( $file, constant("\\Monolog\\Logger::$level") )
		);

		return $logger;

	}

	/**
	 * @param $file
	 *
	 * @return string
	 */
	protected function setterFn($file)
	{
		return $this->getPath() . '/' . 'IcsLog_' . $file . '.log';
	}


}

/** 1/7/14 **/
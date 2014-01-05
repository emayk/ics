<?php namespace Emayk\Ics\Support\Log\Chrome;
use Monolog\Logger;
use Monolog\Handler;
use ChromePhp;
Emayk\Ics\Support\Log\LogInterface;
/**
* Chrome Logger
* base on : "ccampbell/chromephp": "dev-master"
*/

class Chrome implements LogInterface{
			protected $channel = 'icsChrome_log';
			public $used = true;
			protected $logger;
			protected $ch;
			protected $allow_type = array(
	               'log',
	               'warn',
	               'error',
	               'group',
	               'info',
	               'groupEnd',
	               'groupCollapsed',
	               'table',
	               );
			function __construct($used = true)
			{
				$this->logger = new Logger($this->channel);
				$this->logger->pushHandler(new Handler\ChromePHPHandler() );
				$this->used = $used;
			}

			/**
			*
			* Mengirimkan Log ke Chrome menggunakan Monolog Stream Handler
			*
			**/

			public  function logger()
			{
				return $this->logger;
			}

			public function warning($msg)
			{
				if (is_object($msg)) $msg = serialize($msg);
				return $this->log->addWarning($msg);
			}

			/**
			*
			* Mengirimkan Log ke Browser Chrome menggunakan Chromephp
			*
			*  Jika Type tidak diizinkan akan diset ke log function ;
			*
			**/

			public function log( $msg, $info = 'info')
			{
				if ($this->used)
				{
					return (in_array($info, $this->allow_type) )  ? ChromePhp::$info($msg) : ChromePhp::log($msg);
				}
			}

			public function warn($obj)
			{

			}
			public function error($obj)
			{

			}
			public function group($obj)
			{

			}
			public function info($obj)
			{

			}
			public function groupEnd($obj)
			{

			}
			public function groupCollapsed($obj)
			{

			}
			public function table($obj)
			{

			}
}
<?php namespace Emayk\Ics\Support\Log;

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
**/

/**
*
*/
use \Log;
class FirePhp implements LogInterface
{
	protected $log;
	function __construct()
	{
				/* Get Monolog instance from Laravel */
		// $this->log = Log::getMonolog();

		// /* Add the FirePHP handler */
		// $this->log->pushHandler(new \Monolog\Handler\FirePHPHandler());

		/* Log information */

	}

			public function warn($obj)
			{

			}

			public function log($obj)
			{
//                return $this->get_caller_info();
//                $msg  = $this->get_caller_info();
                return \ChromePhp::log($obj);
			}

			function objectToArray ($object) {

			}
			protected function test($log)
			{

			}
			// public function error($obj)
			// {

			// }
			// public function group($obj)
			// {

			// }
			// public function info($obj)
			// {

			// }
			// public function groupEnd($obj)
			// {

			// }
			// public function groupCollapsed($obj)
			// {

			// }
			// public function table($obj)
			// {

			// }
    public function test2($msg){
        return $this->getBacktrace();
    }

    /**
     * Getting backtrace
     *
     * @param int $ignore ignore calls
     *
     * @return string
     */
    protected function getBacktrace($ignore = 2)
    {
        $trace = '';
        foreach (debug_backtrace() as $k => $v) {
            if ($k < $ignore) {
                continue;
            }

            array_walk($v['args'], function (&$item, $key) {
                $item = var_export($item, true);
            });

            $trace .= '#' . ($k - $ignore) . ' ' . $v['file'] . '(' . $v['line'] . '): ' . (isset($v['class']) ? $v['class'] . '->' : '') . $v['function'] . '(' . implode(', ', $v['args']) . ')' . "\n";
        }

        return $trace;
    }

    public function get_caller_info() {
        $c = '';
        $file = '';
        $func = '';
        $class = '';
        $trace = debug_backtrace();
        if (isset($trace[2])) {
            $file = $trace[1]['file'];
            $func = $trace[2]['function'];
            if ((substr($func, 0, 7) == 'include') || (substr($func, 0, 7) == 'require')) {
                $func = '';
            }
        } else if (isset($trace[1])) {
            $file = $trace[1]['file'];
            $func = '';
        }
        if (isset($trace[3]['class'])) {
            $class = $trace[3]['class'];
            $func = $trace[3]['function'];
            $file = $trace[2]['file'];
        } else if (isset($trace[2]['class'])) {
            $class = $trace[2]['class'];
            $func = $trace[2]['function'];
            $file = $trace[1]['file'];
        }
        if ($file != '') $file = basename($file);
        $c = $file . ": ";
        $c .= ($class != '') ? ":" . $class . "->" : "";
        $c .= ($func != '') ? $func . "(): " : "";
        return($c);
    }

}
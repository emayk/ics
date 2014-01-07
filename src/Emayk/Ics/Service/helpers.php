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


	 if (! function_exists ('mylog')) {

			function msglog ($msg, $exception = null, $code = 999)
			{
				 if (null == $exception) {
						$exception = new \Exception('Logger Exception', $code);
				 }
				 icssyslogger ($msg, $exception, $code);
			}
	 }
	 if (! function_exists ('icssyslogger')) {


			function icssyslogger ($msg, \Exception $exception = null, $code = 0)
			{
				 /**
					* Kalo Yang terjadi Exception Http Kernel
					*/
				 $msg = ($exception instanceof  Symfony\Component\HttpKernel\Exception\HttpExceptionInterface)
					 ? 'Symfony\Component\HttpKernel\Exception\HttpExceptionInterface'
					 : $msg;
				 /**
					* Simpan Pada Database
					*  todo : Bagaimana jika disimpan juga pada file ?
					*/

				 \DB::table ('sys_log')->insert (
						array (
							 'message'     => "[ " . $code . " ] " . $msg,
							 'description' => $exception,
							 'created_at'  => \Carbon\Carbon::create (),
							 'updated_at'  => \Carbon\Carbon::create ()
						));
			}
	 }
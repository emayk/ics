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
		* Model Structure Eloquent
		*
		**/

	 /**
		*
		* Register Event Handling
		*
		*/

	 //App::error(function(Exception $exception)
	 //{
	 //    Log::error($exception);
	 //    return \Illuminate\Support\Facades\Response::json($exception);
	 //});
	 //App::fatal(function($exception)
	 //{
	 //    //
	 //});

	 use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

	 $app = $this->app;
	 # Handle HttpException errors (Not others)
	 $app->error (function (HttpExceptionInterface $exception, $code) use ($app) {

//			$e = new \Exception($exception->getMessage());
			msglog(get_class($exception), $exception->getMessage(), $code);

			if ($app['request']->header ('accept') === 'application/json') {
				 // I thought you must create 'Request' object manually
				 // as $app['response'] doesn't exit when this is ran...
				 // However we can grab its Facade (apparently)
				 // via $app['Response'] - Note the capitalization

				 //$response = new Response; # Don't need

				 return $app['Response']::json ([
							 'success' => false,
							 'error'   => true,
							 'message' => $exception->getMessage (),
							 'code'    => $code,
							 'type'    => 'HttpExceptionInterface'
						],
						$code
				 );
			}

	 });

	 /**
		*
		* Menangkap Semua Exception
		*
		*/
	 App::error (function (Exception $exception, $code) use ($app) {
			msglog ($exception->getMessage (), $exception, $code);
			Log::error ('Application Error ', array ($exception));
			if (! $app['request']->header ('accept') === 'application/json') {
				 return $app['Response']::json (array (
						'success' => false,
						'error'   => true,
						'message' => 'Something went wrong (Exception)',
						'type'    => 'Exception'
				 ), 500);
			}
			/*todo: untuk exception normal belum diimplementasikan */
	 });

	 /**
		*
		* Menangkap Semua Exception Model Data Tidak Ada
		*
		*/
	 App::error (function (Illuminate\Database\Eloquent\ModelNotFoundException $exception, $code) use ($app) {
			$msg = "[{$code}] Application Error [ Model Not Found]";
			Log::error ($msg, array ($exception->getMessage ()));
			msglog($exception->getMessage (), $exception, $code);
			if ($app['request']->header ('accept') === 'application/json') {
				 return Response::json (array (
						'success' => false,
						'error'   => true,
						'message' => 'Record Not Found',
						'type'    => 'ModelNotFoundException'
				 ), 500);
			}
	 });

	 /**
		*
		* Query Exception
		*
		* - Jika Column tidak ada
		*/
	 App::error (function (Illuminate\Database\QueryException $exception, $code) use ($app) {
			Log::error ("[{$code}] Application Error [QueryException]", array ($exception->getMessage ()));
			msglog($exception->getMessage (), $exception, $code);
			if ($app['request']->header ('accept') === 'application/json') {
				 return Response::json (array (
						'success' => false,
						'error'   => true,
						'message' => 'Record Cannot Process'
				 ), 500);
			}
	 });

	 /**
		*
		* Jika Metoda tidak ada Routing
		*
		*/
	 App::error (function (BadMethodCallException $exception, $code) use ($app) {
			Log::error ("[{$code}] Application Error [BadMethodCallException]", array ($exception->getMessage ()));
			msglog($exception->getMessage (), $exception, $code);
			if ($app['request']->header ('accept') === 'application/json') {
				 return Response::json (array (
						'success' => false,
						'error'   => true,
						'message' => 'Method Process Cannot Found'
				 ), 500);
			}
	 });

	 /**
		* Jika Terjadi Fatal
		*
		* Sementara di disable
		* terjadi karena
		* - Tidak ada Object / record pada model
		*/

	 //	 App::error (function (Symfony\Component\Debug\Exception\FatalErrorException $exception, $code) use ($app) {
	 //			Log::emergency ("[{$code}] Application Error [FatalErrorException]", array ($exception->getMessage ()));
	 //			if ($app['request']->header ('accept') === 'application/json') {
	 //				 return Response::json (array (
	 //						'success' => false,
	 //						'error'   => true,
	 //						'message'   => 'Fatal Error Record Not Found',
	 //						'type'    => 'FatalErrorException'
	 //				 ), 500);
	 //			}
	 //	 });


	 //
	 //App::error(function(NotAllowedException $exception, $code)
	 //{
	 //    return Response::json(array(
	 //        'error' => 'Something went wrong (NotAllowedException)'
	 //    ), 401);
	 //});


	 //
	 //App::error(function(InvalidUserException $exception)
	 //{
	 //    Log::error($exception);
	 //
	 //    return 'Sorry! Something is wrong with this account!';
	 //});

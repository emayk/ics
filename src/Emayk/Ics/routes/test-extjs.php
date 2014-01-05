<?php
/*==========  Testing Extjs Direct  ==========*/
	/**
	*
	* Testing Extjs Direct
	*
	**/
	Route::get('extjs-example.php',function(){
			return View::make('ics::extjs.direct');
	});
	Route::get('extjsdirect.php',function(){
				// Extjsdirect::get_api();
				Extjsdirect::provide('Server');
	});
	Route::post('extjsdirect.php',function(){
				// Extjsdirect::get_api();
				Extjsdirect::provide('Server');
	});
/*==========  /Testing Extjs Direct  ==========*/
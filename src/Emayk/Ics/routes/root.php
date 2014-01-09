<?php
Route::group(array('prefix' => \Config::get('ics::path.baseUrl') ),function(){
	/*==========  Routing Home  ==========*/
	Route::get('/', array('as' => 'icsroot', 'uses' => 'Emayk\\Ics\\Controllers\\BaseController@index'));
	/*==========  Routing Home  ==========*/
	require __DIR__.'/auth.php';
	/*==========  Routing Home  ==========*/
	require __DIR__.'/help.php';
	/*==========  Routing Home  ==========*/
	require __DIR__.'/test-extjs.php';
	/*==========  Routing Home  ==========*/
	require __DIR__.'/api/root.php';
	/*==========  Routing Home  ==========*/
	require __DIR__.'/test.php';
	/*==========  Routing Home  ==========*/
});
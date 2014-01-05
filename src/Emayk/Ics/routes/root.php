<?php
$root = Config::get('ics::prefix_url');
$nsController = 'Emayk\\Ics\\Controllers\\';

Route::group(array('prefix' => $root),function() use ($nsController){
	/*==========  Routing Home  ==========*/
	Route::get('/',
	           array(
	                 'as' => 'icsroot',
	                 'uses' => $nsController.'BaseController@index'
	                 )
	           );
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
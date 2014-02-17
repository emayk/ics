<?php
Route::group(array('prefix' => \Config::get('ics::path.baseUrl') ),function(){
	/*==========  Routing Home  ==========*/
	Route::get('/', array('as' => 'icsroot', 'uses' => 'Emayk\\Ics\\Controllers\\BaseController@index'));
    Route::group(array('namespace' => "Emayk\\Ics2\\",'prefix' => 'js'),function(){
        /**
         * Generate /js ke view extjs.app.blade.php
         */
        Route::get('/',function(){
            $test = time();
            $contents = View::make("ics::extjs.app",compact('test'));
            $response = Response::make($contents);
            $response->header('Content-Type','application/javascript');
            return $response;
        });

        Route::get('{jsfile}',function($jsfile){
            return $jsfile;
            $test = time();
            $contents = View::make("ics::extjs.{$jsfile}",compact('test'));
            $response = Response::make($contents);
            $response->header('Content-Type','application/javascript');
            return $response;
        });



    });
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
	require __DIR__.'/generate.php';
});
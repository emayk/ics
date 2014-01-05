<?php
Route::group(array('prefix' => 'api'),function() use ($nsController)  {
	/*==========  Routing Begin  ==========*/
		Route::get('/',
            array('as' => 'icsservice',
                function() {
                    return '';
                }
            )
        );
        require __DIR__.'/resource-api.php';

/*==========  /Routing Begin Api ==========*/
});
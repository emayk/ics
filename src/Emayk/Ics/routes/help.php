<?php
/**
*
* Routing Help
*
**/

Route::get('help',function() {
	$id = Input::get('id', 0);
	$content = 'Ini Content Help dari '. $id . '<li>Semua HTML di izinkan</li>';
	return Response::json(
	        array('success' => true,
	              'results' => array('title' => '<h1>Help For '.$id.'</h1>', 'content' => $content )
	              )
	        );
});
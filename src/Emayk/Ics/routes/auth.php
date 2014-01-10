<?php
/**
 *
 * Routing Yang berkenaan dengan Auth
 *
 **/

/*==========  Regen Session  ==========*/
Route::get('regensession', function () {
	Session::regenerate();
});
/*==========  Login Routing  ==========*/
Route::post('login.php', '\Emayk\Ics\Repo\Login\LoginController@login');
/*==========  Login Get  ==========*/
Route::get('login.php', '\Emayk\Ics\Repo\Login\LoginController@getLogin');
/*==========  Logout Get  ==========*/
Route::get('logout.php', function () {
	$uid = Auth::user()->getAuthIdentifier();
	Auth::logout();
	$logout = true;

	if ($logout) { Session::forget('logged'); $msg = 'Successfully Logout from System'; }
	else { $msg = 'Cannot Logout, Please Try Again'; }

	Event::fire('user.login', array(
		'msg' =>
			array(
				'msg'  => "{$msg}",
				'data' => "data:[$uid]" ),
	));

	return \Response::json(array('success' => $logout, 'message' => $msg));
});

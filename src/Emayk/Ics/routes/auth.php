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
Route::post('login.php', function () {
	Input::replace(
		array('user'     => base64_encode('admin'),
		      'password' => base64_encode('123')
		));

	$logged          = Auth::check();
	$decode_username = base64_decode(Input::get('user'));
	$decode_password = base64_decode(Input::get('password'));
	$authenticated   = Auth::attempt(array('username' => $decode_username, 'password' => $decode_password));
	if ($authenticated) {
		Session::put('logged', true);
		$fullname = Auth::user()->fullname;
		$msg      = 'Authentiated Successfully';
		$user     = Auth::user()->toArray();
	} else {
		Session::put('logged', false);
		$msg      = 'Authentiated Failed';
		$fullname = 'Anonymous';
		$user     = array('username' => $fullname);
	};

	Event::fire('user.login', array(
		'msg' =>
		array(
			'msg'  => "{$fullname} {$msg}",
			'data' => "Input {$decode_username},{$decode_password}" ),
		));

	return array('success'  => $authenticated,
	             'login_as' => $fullname,
	             'msg'      => $msg,
	             'user'     => $user
	);
});
/*==========  Login Get  ==========*/
Route::get('login', function () {
	return 'Please Login First';
});
/*==========  Logout Get  ==========*/
Route::get('logout.php', function () {
	$uid = Auth::user()->getAuthIdentifier();
	Auth::logout();
	$logout = true;
	if ($logout) {
		Session::forget('logged');
		$msg = 'Successfully Logout from System';


	} else {
		$msg = 'Cannot Logout, Please Try Again';
	}

	Event::fire('user.login', array(
		'msg' =>
			array(
				'msg'  => "{$msg}",
				'data' => "data:[$uid]" ),
	));

	return \Response::json(array('success' => $logout, 'message' => $msg));
});

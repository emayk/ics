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
 * Bussiness Logic Login
 *
 **/

namespace Emayk\Ics\Repo\Login;

use Carbon\Carbon;
use \Auth;
use \Response;
use \Input;
use \Session;
use \Event;

class LoginEloquent implements LoginInterface
{
	protected $login;

	function __construct(Login $login)
	{
		$this->login = $login;
	}
	/**
	 * Melakukan Login
	 *
	 * @return Response
	 */

	public function login()
	{
//		Input::replace(
//			array(
//				'user'     => base64_encode('admin'),
//				'password' => base64_encode('123')
//			));

		$logged          = Auth::check();
		$decode_username = base64_decode(Input::get('user'));
		$decode_password = base64_decode(Input::get('password'));
		$authenticated   = Auth::attempt(array(
			'username' => $decode_username,
			'password' => $decode_password)
		);

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
					'data' => "Input {$decode_username},{$decode_password}"
				),
		));

		return array(
			'success'  => $authenticated,
			'login_as' => $fullname,
			'msg'      => $msg,
			'user'     => $user
		);
	}


	public function logout()
	{
		// TODO: Implement logout() method.
	}

	public function regenerate()
	{
		// TODO: Implement regenerate() method.
	}

	public function getLogin()
	{
		return 'Please Login First';
	}


}

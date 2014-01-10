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
**/

namespace Emayk\Ics\Repo\Login;
use Emayk\Ics\Controllers\BaseController as Base;
use \Input;

/**
 * Class LoginController
 *
 * @package Emayk\Ics\Repo\Login
 */
class LoginController extends Base {
	/**
	 * @var LoginInterface
	 */
	protected  $login;

	/**
	 * @param LoginInterface $login
	 */
	function __construct(LoginInterface $login)
    {
        $this->login = $login;
    }

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function login()
	{
		return $this->login->login();
	}

	public function getLogin()
	{
		return $this->login->getLogin();
	}
	/**
	 * Display the specified resource.
	 *
	 * @internal param int $id
	 * @return Response
	 */
	public function logout()
	{
			return $this->login->logout();
	}

	/**
	 * @return mixed
	 */
	public function regenerate()
 {
	 return $this->login->regenerate();
 }

}

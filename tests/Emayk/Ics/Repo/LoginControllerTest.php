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

namespace Emayk\Ics;
use Emayk\Ics\Ics;
use Orchestra\Testbench\TestCase;

class LoginControllerTest extends IcsTestCase {

	/**
	 * A basic functional test example.
	 *
	 * @return void
	 */
	public function testLoginIndex()
	{
		$root = \Config::get('ics::prefix_url').'/api/login';
		$crawler = $this->client->request('GET', '/'.$root);
		$this->assertTrue($this->client->getResponse()->isOk());
	}

	public function testLoginShow()
	{
		$root = \Config::get('ics::prefix_url').'/api/login/1';
		$crawler = $this->client->request('GET', '/'.$root);
		$this->assertTrue($this->client->getResponse()->isOk());
	}

	public function testLoginEdit()
	{
		$root = \Config::get('ics::prefix_url').'/api/login/1/edit';
		$crawler = $this->client->request('GET', '/'.$root);
		$this->assertTrue($this->client->getResponse()->isOk());
	}
}

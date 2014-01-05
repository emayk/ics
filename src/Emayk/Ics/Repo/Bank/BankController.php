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

namespace Emayk\Ics\Repo\Bank;

/**
* Bank Controller
*/
use \Controller;

class BankController extends Controller
{
	protected $bank;
	function __construct(BankInterface $bank)
	{
		$this->bank = $bank;
	}

	public function index()
	{

		 return $this->bank->all();
	}

	public function show($id)
	{
		 return $this->bank->find($id);
	}

	public function edit($id)
	{
		 return $this->bank->find($id);
	}

    public function store(){
        return $this->bank->store();
    }

    public function update($id){

        return $this->bank->update($id);
    }

}
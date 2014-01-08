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
**/



namespace Emayk\Ics\Support\Dummy\Faker;


class AbstractGenerate implements GenerateInterface {
	protected $fake;
	protected $owners = array('\Emayk\Ics\Repo\Buyers\Buyers', '\Emayk\Ics\Repo\Suppliers\Suppliers');
	protected $defaultOwner = '\Emayk\Ics\Repo\Suppliers\Suppliers';
	function __construct()
	{
		$this->fake = \Faker\Factory::create();
	}


	/**
	 * Mendapatkan ID dari Array
	 * @param array $data
	 *
	 * @return mixed
	 */
	public function getIdRandomFromArray(array $data){
		return $data[rand(0,count($data)-1)];
	}

	public function create()
	{
		// TODO: Implement create() method.
	}

	public function othersAttributesArray($uuid = null,$createbyId = 1,$lastUpdateById =1)
	{
		if (null == $uuid) {
			$uuid = $this->fake->uuid;
		}
		return array(
			'uuid'            => $uuid,
			'createby_id'     => $createbyId,
			'lastupdateby_id' => $lastUpdateById,
			'created_at'      => $this->fake->dateTimeBetween("-3 year"),
			'updated_at'      => $this->fake->dateTimeBetween("-1 year"),
		);
	}


}

/** 1/8/14 **/ 
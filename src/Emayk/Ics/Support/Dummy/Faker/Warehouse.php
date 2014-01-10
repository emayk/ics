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


/**
 * Class Warehouse
 *
 * @package Emayk\Ics\Support\Dummy\Faker
 */
class Warehouse extends AbstractGenerate{
	/**
	 * @param $name
	 * @param $cityId
	 * @param $catId
	 *
	 * @return array
	 */
	public function createWarehouse($name, $cityId,$catId)
	{
		return array_merge(
			array('name' => $name,
				'address' => $this->fake->streetAddress,
				'city_id' => $cityId,
				'cat_id' => $catId
			), $this->othersAttributesArray()
		);
	}

	public function createWarehouseCategory($name)
	{
		return array_merge(array('name' => $name, 'info' => "Information {$name}"),$this->othersAttributesArray());
	}
}

/** 1/11/14 **/ 
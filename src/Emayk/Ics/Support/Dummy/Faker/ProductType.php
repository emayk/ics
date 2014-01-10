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
 * Class ProductType
 *
 * @package Emayk\Ics\Support\Dummy\Faker
 */
class ProductType extends AbstractGenerate{

	/**
	 *
	 */
	protected function listGradeIds()
	{
		//
	}

	/**
	 * @param $fabricTypeId
	 *
	 * @return array
	 */
	public function generate($fabricTypeId)
	{
		return array_merge(
			array(
				'name' => "Product Type ".$this->createLetters(),
				'fabrictype_id' =>$fabricTypeId
			),
			$this->othersAttributesArray()
		);
	}

}

/** 1/10/14 **/ 
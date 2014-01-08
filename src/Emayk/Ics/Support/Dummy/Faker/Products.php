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
	 * Class Products
	 *
	 * @package Emayk\Ics\Support\Dummy\Faker
	 */
/**
 * Class Products
 *
 * @package Emayk\Ics\Support\Dummy\Faker
 */
class Products extends AbstractGenerate
{
	/**
	 * @var array
	 */
	protected $categories = array(
		'Category A', 'Category B',
		'Category C', 'Category D',
		'Category E', 'Category F',
		'Category G', 'Category H',
		'Category I', 'Category J',
	);
protected  $defaultParentType = '\Emayk\Ics\Repo\Productcategory\Productcategory';
	/**
	 * Membuat Product
	 */
	public function product()
	{

	}


	/**
	 * Membuat Category
	 *
	 * @param null $name
	 * @param int  $parent_id
	 * @param int  $createbyId
	 * @param int  $lastUpdateById
	 *
	 * @return array
	 */
	public function category($name = null, $parent_id = 0, $createbyId = 1, $lastUpdateById = 1)
	{
		if (null == $name) $name = $this->fake - randomElement($this->categories);
		$category = array(
			'name'         => $name,
			'info'         => "Information {$name}",
			'parent_id'    => $parent_id,
			'parent_type'  => $this->defaultParentType,
			'kodeinternal' => $this->fake->uuid,
		);
		return array_merge($category, $this->othersAttributesArray($createbyId, $lastUpdateById));
	}


	/**
	 * Mendapatkan List Category
	 * berdasarkan Total Category yang diberikan
	 *
	 * @param $total
	 *
	 * @return array
	 */
	public function createNestedCategori($total)
	{
		$categories = array();
		for ($cat = 0; $cat <= $total; $cat++) {
			for ($c = 1; $c <= 3; $c++) {
				$name          = $this->fake->randomElement($this->categories);
				$categories[ ] = $this->category("{$name} {$cat}-{$c}", $cat);
			}
		}
		return $categories;
	}
}

/** 1/8/14 **/
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
 * Class Colors
 *
 * @package Emayk\Ics\Support\Dummy\Faker
 */
class Colors extends AbstractGenerate{

	/**
	 * @return array
	 */
	protected  function color()
	{
		$color = $this->getFake()->unique()->colorName.'_sample_'.time();
		return array_merge(
			array(
				'name' => $color,
				'info' => "Information Of {$color}",
			),
			$this->othersAttributesArray()
		);
	}

	/**
	 * @param int $count
	 *
	 * @return array
	 */
	public function generateColorSample($count = 10)
	{
		for ($record=0;$record<$count;$record++)
		{
			$colors[] = $this->color();
		}
		return $colors;
	}
}

/** 1/8/14 **/ 
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
 * Class Position
 *
 * @package Emayk\Ics\Support\Dummy\Faker
 */
class Position extends AbstractGenerate
{
	/**
	 * @var string
	 */
	protected $defaultPosition = 'System';

	/**
	 * @param int $count
	 *
	 * @return array
	 */
	public function generatePositions($count = 10)
	{
		for ($p = 0; $p < $count; $p++) {
			$positions [ ] = $this->createPosition('Position ');
		}
		return $positions;
	}

	/**
	 * @param string $name
	 *
	 * @return array
	 */
	public function createPosition($name = '')
	{
		if (empty( $name )) $name = $name . $this->createLetters() . rand(2, 10);
		return array_merge(
			$this->setDummyAttribut($name),
			$this->othersAttributesArray()
		);
	}

	/**
	 * @param $name
	 *
	 * @return array
	 */
	protected function setDummyAttribut($name)
	{
		return array(
			'name' => $name,
			'info' => "Informasion {$name}"
		);
	}
}

/** 1/10/14 **/ 
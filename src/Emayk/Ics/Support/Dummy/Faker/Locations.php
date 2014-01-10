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


use Aws\Tests\Common\Exception\InstanceProfileCredentialsExceptionTest;

/**
 * Class Locations
 *
 * @package Emayk\Ics\Support\Dummy\Faker
 */
class Locations extends AbstractGenerate
{

	/**
	 * @param $level
	 * @param $name
	 *
	 * @return string
	 */
	protected function getInfo($level, $name)
	{
		switch ($level) {
			case 1 :
			{
				$info = "Country {$name}";
				break;
			}
			case 2 :
			{
				$info = "Province {$name}";
				break;
			}
			case 3 :
			{
				$info = "Province {$name}";
				break;
			}
			default :
				{
				$info = "Country {$name}";
				break;
				}
		}
		return $info;
	}

	/**
	 * @param     $name
	 * @param     $level
	 * @param int $parent_id
	 *
	 * @return array
	 */
	protected function generate($name, $level, $parent_id = 0)
	{
		return array(
			'name'        => $name,
			'info'        => $this->getInfo($level, $name),
			'level'       => $level,
			'parent_id'   => $parent_id,
			'parent_type' => '\Emayk\Ics\Repo\Locations\Locations',
		);
	}

	/**
	 * @param $name
	 * @param $level
	 * @param $parent_id
	 *
	 * @return array
	 */
	public function createLocationByName($name,$level,$parent_id)
	{
		return array_merge($this->generate($name,$level,$parent_id), $this->othersAttributesArray() );
	}

	/**
	 * @return array
	 */
	public function country()
	{
		$name = $this->fake->unique()->country;
		return array_merge($this->generate($name, 1), $this->othersAttributesArray()
		);
	}

	/**
	 * @param        $countryId
	 * @param string $countryName
	 *
	 * @return array
	 */
	public function province($countryId, $countryName = '')
	{
		if (empty($countryName)) $countryName = "{$countryId} ";
		$name = "{$countryName}-Province " . $this->createLetters(12);
		return array_merge($this->generate($name, 2, $countryId), $this->othersAttributesArray() );
	}

	/**
	 * @param $provinceId
	 * @param $provinceName
	 *
	 * @return array
	 */
	public function city($provinceId, $provinceName)
	{
		$name = "{$provinceName}-City " . $this->fake->city;
		return array_merge($this->generate($name, 3, $provinceId), $this->othersAttributesArray() );
	}
}

/** 1/9/14 **/





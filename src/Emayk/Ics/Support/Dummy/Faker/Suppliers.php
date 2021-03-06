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
 * Class Suppliers
 *
 * @package Emayk\Ics\Support\Dummy\Faker
 */
class Suppliers extends AbstractGenerate{

	/**
	 * @param $typeId
	 * @param $legalityId
	 * @param $typeProdId
	 * @param $countryId
	 * @param $provinceId
	 * @param $cityId
	 * @param $statusId
	 *
	 * @return array
	 */
	public function createSupplier($typeId,$legalityId,$typeProdId,$countryId,$provinceId,$cityId,$statusId)
	{
		return array_merge(
			array(
				'name' => $this->fake->name,
				'codepos' => "400".rand(100,900),
				'npwp' => '02930-202930-20393'.rand(90,200),
				'fax' => $this->fake->phoneNumber,
				'email' => $this->fake->email,
				'plafon' => (20100100 * $this->fake->randomDigitNotNull),
				'kredit' => rand(1,365),
				'deleted_at' => Null,
				'address' => $this->fake->streetAddress,
				'rt' => rand(1,15),
				'rw' => rand(1,15),
				'phone' => $this->fake->phoneNumber,
				'status_id' => $statusId,
				'tipe_id' => $typeId,
				'legality_id' => $legalityId,
				'typeprod_id' => $typeProdId,
				'country_id' => $countryId,
				'province_id' => $provinceId,
				'city_id' => $cityId,
				'codeinternal' => $this->fake->uuid
			),
			$this->othersAttributesArray()
		);
	}

	/**
	 * @param       $total
	 * @param array $lists_typeId
	 * @param array $lists_typeProdId
	 * @param array $lists_legalityId
	 * @param       $country
	 * @param       $province
	 * @param       $city
	 * @param       $ListstatusIds
	 *
	 * @return array
	 */
	public function generateSuppliers($total, array $lists_typeId, array $lists_typeProdId,
	                               array $lists_legalityId, $country, $province, $city,
	                               array $ListstatusIds)
	{
		$suppliers = array();
		for($record=0;$record <= $total;$record++)
		{
			$typeId = $this->getRandomList($lists_typeId);
			$typeProdId = $this->getRandomList($lists_typeProdId);
			$legalityId = $this->getRandomList($lists_legalityId);
			$statusId = $this->getRandomList($ListstatusIds);
			$suppliers[] = $this->createSupplier($typeId,$legalityId,$typeProdId,$country,$province,$city,$statusId);
		}
		return $suppliers;
	}

	protected function getRandomList(array $lists)
	{
		return $this->getFake()->randomElement($lists);
	}
}

/** 1/10/14 **/ 
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


class Buyers extends AbstractGenerate
{
	public function buyer($type, $legality, $typeprod,
	                      $country, $province, $city,
	                      $createby = 1, $lastupdateby = 1)
	{
		return array(
			'name'            => $this->fake->name,
			'codepos'         => '4090' . $this->fake->randomDigit,
			'npwp'            => '920-20202-30303' . $this->fake->randomDigit,
			'fax'             => $this->fake->phoneNumber,
			'email'           => $this->fake->email,
			'plafon'          => ( 1000000 * $this->fake->randomDigitNotNull ),
			'kredit'          => rand(1, 365),
			'deleted_at'      => null,
			'address'         => $this->fake->streetAddress,
			'rt'              => rand(1, 15),
			'rw'              => rand(1, 15),
			'phone'           => $this->fake->phoneNumber,
			'status_id'       => 1,
			'tipe_id'         => $type,
			'legality_id'     => $legality,
			'typeprod_id'     => $typeprod,
			'country_id'      => $country,
			'province_id'     => $province,
			'city_id'         => $city,
			'uuid'            => $this->fake->uuid,
			'createby_id'     => $createby,
			'lastupdateby_id' => $lastupdateby,
			'codeinternal'    => $this->fake->uuid,
			'created_at'      => $this->fake->dateTimeBetween("-5 year"),
			'updated_at'      => $this->fake->dateTimeBetween("-2 year")
		);
	}


	/**
	 *
	 * Mengenerate Buyer Sesuai dengan Jumlah Yang diberikan
	 *
	 * @param       $total
	 * @param array $lists_typeId
	 * @param array $lists_typeProdId
	 * @param array $lists_legalityId
	 * @param       $country
	 * @param       $province
	 * @param       $city
	 * @param int   $createby
	 * @param int   $lastupdateby
	 *
	 * @return array
	 */
	public function generatebuyers($total, array $lists_typeId, array $lists_typeProdId,
	                               array $lists_legalityId, $country, $province, $city,
	                               $createby = 1, $lastupdateby = 1)
	{
		$buyers = array();
		for($buyer=0;$buyer <= $total;$buyer++)
		{
			$typeId = $this->getIdRandomFromArray($lists_typeId);
			$typeProdId = $this->getIdRandomFromArray($lists_typeProdId);
			$legalityId = $this->getIdRandomFromArray($lists_legalityId);
			$buyers[] = $this->buyer($typeId,$legalityId,$typeProdId,$country,$province,$city,$createby,$lastupdateby);
		}
		return $buyers;
	}

	public function create()
	{

	}
}

/** 1/8/14 **/ 
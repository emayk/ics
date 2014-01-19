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
 * Class Buyers
 *
 * @package Emayk\Ics\Support\Dummy\Faker
 */
class Buyers extends AbstractGenerate
{
    /**
     * @param $type
     * @param $legality
     * @param $typeprod
     * @param $country
     * @param $province
     * @param $city
     *
     * @param $status
     * @return array
     */
    protected function buyer($type, $legality, $typeprod,
                             $country, $province, $city, $status)
    {
        return
            array_merge(
                array(
                    'name' => $this->fake->name,
                    'codepos' => '4090' . $this->fake->randomDigit,
                    'npwp' => '920-20202-30303' . $this->fake->randomDigit,
                    'fax' => $this->fake->phoneNumber,
                    'email' => $this->fake->email,
                    'plafon' => (1000000 * $this->fake->randomDigitNotNull),
                    'kredit' => rand(1, 365),
                    'deleted_at' => null,
                    'address' => $this->fake->streetAddress,
                    'rt' => rand(1, 15),
                    'rw' => rand(1, 15),
                    'phone' => $this->fake->phoneNumber,
                    'status_id' => $status,
                    'tipe_id' => $type,
                    'legality_id' => $legality,
                    'typeprod_id' => $typeprod,
                    'country_id' => $country,
                    'province_id' => $province,
                    'city_id' => $city,
                    'note' => $this->fake->text
                ), $this->othersAttributesArray()
            );
    }


    /**
     * @param       $total
     * @param array $lists_typeId
     * @param array $lists_typeProdId
     * @param array $lists_legalityId
     * @param       $countryId
     * @param       $provinceId
     * @param       $cityId
     *
     * @param array $statusIds
     *
     * @return array
     */
    public function generatebuyers($total, array $lists_typeId, array $lists_typeProdId,
                                   array $lists_legalityId, $countryId, $provinceId, $cityId, array $statusIds)
    {
        $records = array();
        for ($record = 0; $record <= $total; $record++) {
            $typeId = $this->getIdRandomFromArray($lists_typeId);
            $typeProdId = $this->getIdRandomFromArray($lists_typeProdId);
            $legalityId = $this->getIdRandomFromArray($lists_legalityId);
            $statusId = $this->getIdRandomFromArray($statusIds);
            $records[] = $this->createBuyer($typeId, $legalityId, $typeProdId, $countryId, $provinceId, $cityId, $statusId);
        }
        return $records;
    }

    /**
     * @param $typeId
     * @param $legalityId
     * @param $typeprodId
     * @param $countryId
     * @param $provinceId
     * @param $cityId
     *
     * @param $status
     *
     * @return array
     */
    public function createBuyer($typeId, $legalityId, $typeprodId,
                                $countryId, $provinceId, $cityId, $status)
    {
        return $this->buyer($typeId, $legalityId, $typeprodId, $countryId, $provinceId, $cityId, $status);
    }

    /**
     * @param       $count
     * @param array $lists_typeId
     * @param array $lists_typeProdId
     * @param array $lists_legalityId
     * @param       $countryId
     * @param       $provinceId
     * @param       $cityId
     *
     * @param       $statusIds
     *
     * @return array
     */
    public function createBuyers($count, array $lists_typeId, array $lists_typeProdId,
                                 array $lists_legalityId, $countryId, $provinceId, $cityId, $statusIds)
    {
        return $this->generatebuyers($count, $lists_typeId, $lists_typeProdId,
            $lists_legalityId, $countryId, $provinceId, $cityId, $statusIds);
    }

}

/** 1/8/14 **/ 
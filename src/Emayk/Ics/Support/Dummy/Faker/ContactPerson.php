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
	 * Class ContactPerson
	 *
	 * @package Emayk\Ics\Support\Dummy\Faker
	 */
/**
 * Class ContactPerson
 *
 * @package Emayk\Ics\Support\Dummy\Faker
 */
/**
 * Class ContactPerson
 *
 * @package Emayk\Ics\Support\Dummy\Faker
 */
class ContactPerson extends AbstractGenerate
{

	/**
	 * @param $posId
	 * @param $deptId
	 * @param $parentId
	 * @param $parentType
	 *
	 * @return array
	 */
	protected function contact($posId, $deptId, $parentId, $parentType)
	{
		$name = $this->fake->name;
		return array_merge(
			array(
				'name'        => $name,
				'info'        => "Information {$name}",
				'pos_id'      => $posId,
				'dept_id'     => $deptId,
				'phone'       => $this->fake->phoneNumber,
				'email'       => $this->fake->email,
				'fax'         => $this->fake->phoneNumber,
				'parent_id'   => $parentId,
				'parent_type' => $parentType
			),
			$this->othersAttributesArray()
		);
	}

	/**
	 * @param $positionId
	 * @param $departementId
	 * @param $parent_id
	 * @param $parent_type
	 *
	 * @return array
	 */
	public function generateContact($positionId, $departementId, $parent_id, $parent_type)
	{
		return $this->contact($positionId, $departementId, $parent_id, $parent_type);
	}

	/**
	 * @param       $count
	 * @param array $positionIds
	 * @param array $departementIds
	 * @param array $supplierIds
	 * @param array $buyersIds
	 *
	 *
	 * @return array
	 */
	public function generateContacts($count,
	                                 array $positionIds,
	                                 array $departementIds,
	                                 array $supplierIds,
	                                 array $buyersIds)
	{
		$records = array();

		for ($record = 0; $record < $count; $record++) {
			$buyerId    = $this->fake->randomElement($buyersIds);
			$supplierId = $this->fake->randomElement($supplierIds);
			$parents    = $this->getParents($buyerId, $supplierId);
			$parent     = $parents[ rand(0, 1) ];
			$parentId   = $parent[ 'id' ];
			$parentType = $parent[ 'type' ];
			$records[ ] = $this->generateContact(
				$this->fake->randomElement($positionIds),
				$this->fake->randomElement($departementIds),
				$parentId, $parentType
			);
		}
		return $records;
	}

	/**
	 * @param $buyerId
	 * @param $supplierId
	 *
	 * @return array
	 */
	protected  function getParents($buyerId, $supplierId)
	{
		return array(
			[
				'id'   => $buyerId,
				'type' => '\Emayk\Ics\Repo\Buyers\Buyers'
			],
			[
				'id'   => $supplierId,
				'type' => '\Emayk\Ics\Repo\Suppliers\Suppliers'
			]
		);

	}
}

/** 1/8/14 **/ 
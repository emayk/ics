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
 * Class Banks
 *
 * @package Emayk\Ics\Support\Dummy\Faker
 */
class Banks extends AbstractGenerate
{
	/**
	 * @var array
	 */
	protected $cmd = array('type', 'account', 'bank');
	/**
	 * @var array
	 */
	protected $accountType = array(
		'Deposit', 'Tabungan'
	);

	/**
	 * Membuat Account Type
	 * @return array
	 */
	public function accountType()
	{
		$type = $this->fake->randomElement($this->accountType);
		return array_merge(
			array(
				'name' => $type,
				'info' => "Information Of {$type}",
			),
			$this->othersAttributesArray()
		);

	}

	/**
	 * @param        $id
	 * @param string $owner
	 * @param int    $type
	 *
	 * @return array
	 */
	public function account($id, $owner = 'suppliers', $type = 1)
	{
		$owner  = "\\Emayk\\Ics\\Repo\\{$owner}\\{$owner}";
		if (!in_array($owner, $this->owners)) $owner = $this->defaultOwner ;

			return array_merge(
			array(
				'bank_id'    => 1,
				'number'     => $this->fake->numberBetween(),
				'name'       => $this->fake->name,
				'owner_id'   => $id,
				'owner_type' => $owner,
				'type_id'    => $type,
			),
			$this->othersAttributesArray()
		);
	}

	/**
	 * @return array
	 */
	public function bank()
	{
		$name = $this->fake->name;
		$info = 'Information ' . $name;
		return array_merge(
			array(
				'notelp'  => $this->fake->phoneNumber,
				'address' => $this->fake->numberBetween(),
				'name'    => $name,
				'info'    => $info,
			),
			$this->othersAttributesArray($this->fake->uuid));
	}

	/**
	 *
	 */
	public function create()
	{
		// TODO: Implement create() method.
	}


}

/** 1/8/14 **/ 
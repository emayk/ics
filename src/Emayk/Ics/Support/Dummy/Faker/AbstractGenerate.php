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
 * Class AbstractGenerate
 *
 * @package Emayk\Ics\Support\Dummy\Faker
 */
class AbstractGenerate implements GenerateInterface
{
	/**
	 * @var \Faker\Generator
	 */
	protected $fake;
	/**
	 * @var array
	 */
	protected $owners = array('\Emayk\Ics\Repo\Buyers\Buyers', '\Emayk\Ics\Repo\Suppliers\Suppliers');
	/**
	 * @var string
	 */
	protected $defaultOwner = '\Emayk\Ics\Repo\Suppliers\Suppliers';

	/**
	 *
	 */
	function __construct()
	{
		$this->fake = \Faker\Factory::create();
	}


	/**
	 * Mendapatkan ID dari Array
	 *
	 * @param array $data
	 *
	 * @return mixed
	 */
	public function getIdRandomFromArray(array $data)
	{
		return $data[ rand(0, count($data) - 1) ];
	}

	/**
	 *
	 */
	public function create()
	{
		// TODO: Implement create() method.
	}

	/**
	 * @return Currency
	 */
	public function getCurrency()
	{
		return new Currency();
	}

	/**
	 * @return Colors
	 */
	public function  getColor()
	{
		return new Colors();
	}

	/**
	 * @param null $uuid
	 * @param int  $createbyId
	 * @param int  $lastUpdateById
	 *
	 * @return array
	 */
	public function othersAttributesArray($uuid = null, $createbyId = 1, $lastUpdateById = 1)
	{
		if (null == $uuid) {
			$uuid = $this->fake->uuid;
		}
		return array(
			'uuid'            => $uuid,
			'createby_id'     => $createbyId,
			'lastupdateby_id' => $lastUpdateById,
			'created_at'      => $this->fake->dateTimeBetween(),
			'updated_at'      => $this->fake->dateTimeBetween(),
		);
	}


	/**
	 * @param int $len
	 *
	 * @return string
	 */
	protected function createLetters($len = 10)
	{
		$o = '';
		for ($c = 0; $c < $len; $c++) {
			$o .= $this->fake->randomLetter;
		}
		return $o;
	}

	/**
	 * @return \Faker\Generator
	 */
	public function getFake()
	{
		return $this->fake;
	}

	/**
	 * @return Buyers
	 */
	public function getBuyers()
	{
		return new Buyers();

	}

	/**
	 * @return Products
	 */
	public function getProduct()
	{
		return new Products();
	}

	/**
	 * @return TypeSupBuy
	 */
	public function typeSuplierBuyer()
	{
		return new TypeSupBuy();
	}

	/**
	 * @return TypeSupBuy
	 */
	public function getTypeSupplierBuyer()
	{
		return $this->typeSuplierBuyer();
	}

	/**
	 * @return Legality
	 */
	public function getLegality()
	{
		return new Legality();
	}

	/**
	 * @return ProductType
	 */
	public function getProductType()
	{
		return new ProductType();
	}

	/**
	 * @return Fabric
	 */
	public function getFabric()
	{
		return new Fabric();
	}

	/**
	 * @return Departement
	 */
	public function getDept()
	{
		return new Departement();
	}

	/**
	 * @return Position
	 */
	public function getPosition()
	{
		return new Position();
	}

	/**
	 * @return Locations
	 */
	public function getLocation()
	{
		return new Locations();
	}

	/**
	 * @return Warehouse
	 */
	public function getWarehouse()
	{
		return new Warehouse();
	}

	/**
	 * @return Suppliers
	 */
	public function getSupplier()
	{
		return new Suppliers();
	}

	/**
	 * @return ContactPerson
	 */
	public function getContacts()
	{
		return new ContactPerson();
	}

	/**
	 * @return Banks
	 */
	public function getBank()
	{
		return new Banks();
	}


	/**
	 * @param $name
	 * @param $typeId
	 *
	 * @return array
	 */
	public function createRecordUnit($name, $typeId)
	{
		return array_merge(array(
			'name'    => $name,
			'info'    => "Information {$name}",
			'type_id' => $typeId
		), $this->othersAttributesArray());
	}


	/**
	 * @param $name
	 *
	 * @return array
	 */
	protected function recordUnitType($name)
	{
		return array_merge(array(
			'name' => $name,
			'info' => "Information {$name}",
		), $this->othersAttributesArray());
	}

	/**
	 * @return array
	 */
	public function createRecordUnitType()
	{
		$units = array('Panjang', 'Lebar', 'Lain-Lain');

		foreach ($units as $unit) {
			$records [ ] = $this->recordUnitType($unit);
		}
		return $records;
	}


	/**
	 * @param $ownerId
	 * @param $ownerType
	 *
	 * @return array
	 */
	public function createRecordImage($ownerId, $ownerType)
	{
		$name  = "image" . rand(1, 900) . $this->createLetters(20);
		$dir   = public_path('/packages/emayk/ics/uploads/Products');
//		$image = $this->getFake()->image($dir, 640, 480, 'business');
		$image = 'imagefile'.rand(0,2000);
		return array_merge(array(
			"name"           => $name,
			"info"           => "Information {$name}",
			"filename"       => $image,
			"filelocation"   => public_path(),
			"url"            => url($dir),
			"thumbfile"      => $image,
			"imageable_id"   => $ownerId,
			"imageable_type" => $ownerType
		), $this->othersAttributesArray());
	}
}

/** 1/8/14 **/ 
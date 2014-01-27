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
 * Model Structure Eloquent
 *
 **/
namespace Emayk\Ics\Repo\Phones;

use Emayk\Ics\Repo\Buyers\Buyers;
use Emayk\Ics\Repo\Suppliers\Suppliers;
use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;
use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Phones\Phones'
 *
 * @property integer        $id
 * @property string         $number
 * @property string         $info
 * @property integer        $parent_id
 * @property string         $parent_type
 * @property string         $uuid
 * @property integer        $createby_id
 * @property integer        $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class Phones extends Model
{
	/**
	 * @var array
	 */
	protected $guarded = array();
	protected $hidden = ['parent_type'];
	/**
	 * @var string
	 */
	protected $table = 'master_phones';
	/**
	 * @var array
	 */
	public static $rules = array();
	public $appends = ['parenttype'];

	public function getParenttypeAttribute()
	{
		return $this->attributes[ 'parenttype' ] =
			$this->getOwnerTypeInverse(
				$this->attributes[ 'parent_type' ]);
	}

	public function getOwnerTypeInverse($type)
	{
		$allowOwner = [
			'\Emayk\Ics\Repo\Buyers\Buyers',
			'\Emayk\Ics\Repo\Suppliers\Suppliers',
			'\Emayk\Ics\Repo\Contactperson\Contactperson',
			'\Emayk\Ics\Repo\Offices\Offices'

		];
		if (!in_array($type, $allowOwner))
			$type = '\Emayk\Ics\Repo\Suppliers\Suppliers';

		switch ($type) {
			case '\Emayk\Ics\Repo\Offices\Offices' :
				$owner = 'office';
				break;
			case '\Emayk\Ics\Repo\Buyers\Buyers' :
				$owner = 'buyer';
				break;
			case '\Emayk\Ics\Repo\Suppliers\Suppliers' :
				$owner = 'supplier';
				break;
			case '\Emayk\Ics\Repo\Contactperson\Contactperson' :
				$owner = 'contact';
				break;
		};
		return $owner;
	}

	/**
	 * @param $owner
	 *
	 * @return string
	 */
	public function getOwnerType($owner)
	{
		$allowOwner = ['supplier', 'buyer', 'contact', 'office'];
		if (!in_array($owner, $allowOwner)) $owner = 'supplier';
		switch ($owner) {
			case 'office' :
				$type = '\Emayk\Ics\Repo\Offices\Offices';
				break;
			case 'buyer' :
				$type = '\Emayk\Ics\Repo\Buyers\Buyers';
				break;
			case 'supplier' :
				$type = '\Emayk\Ics\Repo\Suppliers\Suppliers';
				break;
			case 'contact' :
				$type = '\Emayk\Ics\Repo\Contactperson\Contactperson';
				break;
		};
		return $type;
	}

	/**
	 *
	 */
	public function buyers()
	{
//		 TODO : phone buyers
	}

	/**
	 *
	 */
	public function suppliers()
	{
//		 TODO : phone suppliers
	}

	/**
	 *
	 */
	public function office()
	{
//		 TODO : phone suppliers
	}


	/**
	 * @param        $parentId
	 * @param        $parentType
	 *
	 * @param string $number
	 *
	 * @return array
	 */
	protected static function getRecordValue($parentId, $parentType, $number = '')
	{
		if (empty( $number )) $number = self::getFake()->getFake()->phoneNumber;

		return array_merge(
			array(
				'number'      => $number,
				'parent_id'   => $parentId,
				'info'        => "Information Phone {$number}",
				'parent_type' => $parentType
			),
			self::getFake()->othersAttributesArray()
		);

	}

	/**
	 * @param $number
	 * @param $parentId
	 * @param $parentType
	 *
	 * @return array
	 */
	public static function createPhoneHaveBy($number, $parentId, $parentType)
	{
		return static::getRecordValue($parentId, $parentType, $number);
	}

	/**
	 * @param $parentId
	 * @param $parentType
	 *
	 * @return array
	 */
	protected static function _generatePhone($parentId, $parentType)
	{
		return static::getRecordValue($parentId, $parentType);
	}

	/**
	 * @return AbstractGenerate
	 */
	protected static function getFake()
	{
		return new AbstractGenerate();
	}


	public static function generateMassivePhoneSample($resultIds = false, $count = 10)
	{
		$listBuyerIds    = Buyers::getRecordIdsOrCreate();
		$listSupplierIds = Suppliers::getRecordIdsOrCreate();
		$ids             = array();
		for ($r = 0; $r < $count; $r++) {
			$buyerId    = static::pickOneFromArray($listBuyerIds);
			$supplierId = static::pickOneFromArray($listSupplierIds);
			$parents    = static::getParentRecord($buyerId, $supplierId);
			$parent     = $parents[ rand(0, 1) ];
			$parentId   = $parent[ 'id' ];
			$parentType = $parent[ 'type' ];
			$newrecord  = static::createRecord(static::getRecordValue($parentId, $parentType));
			$ids [ ]    = $newrecord->id;
		}
		$total = count($ids);
		return ( $resultIds ) ? $ids : "Generate Phone with {$total} record ";
	}


	/**
	 * @param array $record
	 *
	 * @return Model|static
	 */
	protected static function createRecord(array $record)
	{
		return static::create($record);
	}

	/**
	 * @param array $lists
	 *
	 * @return string
	 */
	protected static function pickOneFromArray(array $lists)
	{
		return static::getFake()->getFake()->randomElement($lists);
	}

	/**
	 * @param $buyerId
	 * @param $supplierId
	 *
	 * @return array
	 */
	protected static function getParentRecord($buyerId, $supplierId)
	{
		return array(
			array('id' => $buyerId, 'type' => '\Emayk\Ics\Repo\Buyers\Buyers'),
			array('id' => $supplierId, 'type' => '\Emayk\Ics\Repo\Suppliers\Suppliers')
		);
	}
}

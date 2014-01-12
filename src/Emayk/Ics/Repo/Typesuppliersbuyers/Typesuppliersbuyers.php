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
namespace Emayk\Ics\Repo\Typesuppliersbuyers;

use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;
use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Typesuppliersbuyers\Typesuppliersbuyers'
 *
 * @property integer                                                                             $id
 * @property string                                                                              $name
 * @property string                                                                              $info
 * @property string                                                                              $uuid
 * @property integer                                                                             $createby_id
 * @property integer                                                                             $lastupdateby_id
 * @property \Carbon\Carbon                                                                      $created_at
 * @property \Carbon\Carbon                                                                      $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\Emayk\Ics\Repo\Suppliers\Suppliers[] $suppliers
 * @property-read \Illuminate\Database\Eloquent\Collection|\Emayk\Ics\Repo\Buyers\Buyers[]       $buyers
 */
class Typesuppliersbuyers extends Model
{
	/**
	 * @var array
	 */
	protected $guarded = array();
	/**
	 * @var string
	 */
	protected $table = 'master_type_supplier_buyer';
	/**
	 * @var array
	 */
	public static $rules = array();

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function suppliers()
	{
//			todo : supplier type list
		return $this->hasMany('Emayk\Ics\Repo\Suppliers\Suppliers', 'tipe_id');
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function buyers()
	{
//			todo : buyer type list
		return $this->hasMany('Emayk\Ics\Repo\Buyers\Buyers', 'tipe_id');
	}

	/**
	 * @return AbstractGenerate
	 */
	public static function  getFake()
	{
		return new AbstractGenerate();
	}

	/**
	 *
	 * Mengenerate data dump
	 *
	 * @param bool $resultIds
	 *
	 * @return array|string
	 */
	public static function generateDummyData($resultIds = false)
	{
		$typesIds = self::getListIds();
		if (!count($typesIds)) {
			/**
			 * Jika Belum ada akan dibuat
			 */
			$types = static::getFake()->getTypeSupplierBuyer()->types();
			foreach ($types as $type) {
				$ty           = self::create($type);
				$typesIds [ ] = $ty->id;
			}
			\Log::debug("Sudah digenerate " . count($typesIds) . " record");
		};

		return ( $resultIds ) ? $typesIds : "Generate data " . count($typesIds) . " records";
	}

	/**
	 * @return int
	 */
	public static function getIdDefaultTypeOrCreate()
	{
		$records = static::getListIds();
		if (count($records) ) {
			/*Jika sudah ada Pilih salah satu id */
			$record = $records[rand(0,count($records)-1)];
		}else{
			/*Belum ada*/
			$records = static::getFake()->getTypeSupplierBuyer()->createDefaultType();
			foreach ($records as $rec)
			{
				$newrecord = static::create($rec);
			}
			/*Ambil Id*/
			$record = $newrecord->id;
		}
		return $record;
	}

	/**
	 * @return array
	 */
	public static function getIdsOrGenerateDummydata()
	{
		return static::generateDummyData(true);
	}

	/**
	 * @param $q
	 * @param $name
	 *
	 * @return mixed
	 */
	public function scopeOfName($q,$name)
	{
		return $q->whereName($name);
	}


	/**
	 * Mendapatkan Semua ID
	 *
	 * @return array
	 */
	public static function getListIds()
	{
		return self::lists('id');
	}

}

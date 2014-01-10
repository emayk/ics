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

use Emayk\Ics\Support\Dummy\Faker\TypeSupBuy;
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
	protected $guarded = array();
	protected $table = 'master_type_supplier_buyer';
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
			$fake  = new TypeSupBuy();
			$types = $fake->types();
			foreach ($types as $t) {
				$ty           = self::create($t);
				$typesIds [ ] = $ty->id;
			}
		};

		return ($resultIds) ? $typesIds : "Generate data ". count($typesIds). " records";
	}

	/**
	 * Mendapatkan Semua ID
	 * @return array
	 */
	public static function getListIds()
	{
		return self::lists('id');
	}

}

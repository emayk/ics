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
namespace Emayk\Ics\Repo\Warehouse;

use Emayk\Ics\Repo\Warehousecategory\Warehousecategory;
use Emayk\Ics\Repo\Locations\Locations;
use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;
use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Warehouse\Warehouse'
 *
 * @property integer                                                                                     $id
 * @property string                                                                                      $name
 * @property string                                                                                      $address
 * @property string                                                                                      $city_id
 * @property integer                                                                                     $cat_id
 * @property string                                                                                      $uuid
 * @property integer                                                                                     $createby_id
 * @property integer                                                                                     $lastupdateby_id
 * @property \Carbon\Carbon                                                                              $created_at
 * @property \Carbon\Carbon                                                                              $updated_at
 * @property-read \Emayk\Ics\Repo\Countries\Countries                                                    $city
 * @property-read Warehousecategory                                                                      $category
 * @property-read \Illuminate\Database\Eloquent\Collection|\Emayk\Ics\Repo\Stockproducts\Stockproducts[] $stocks
 * @method static Emayk\Ics\Repo\Warehouse\Warehouse name($name) 
 */
class Warehouse extends Model
{
	/**
	 * @var array
	 */
	protected $guarded = array();
	/**
	 * @var string
	 */
	protected $table = 'master_warehouse';
	/**
	 * @var array
	 */
	public static $rules = array();
	/**
	 * @var string
	 */
	protected static $defaultName = 'Warehouse Center';

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function city()
	{
		return $this->belongsTo('Emayk\Ics\Repo\Countries\Countries', 'city_id');
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function category()
	{
		return $this->belongsTo('Emayk\Ics\Repo\Warehousecategory\Warehousecategory', 'cat_id');
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function stocks()
	{
		return $this->hasMany('Emayk\Ics\Repo\Stockproducts\Stockproducts', 'wh_id');
	}

	/**
	 * @param $query
	 * @param $name
	 *
	 * @return mixed
	 */
	public function scopeName($query, $name)
	{
		return $query->whereName($name);
	}

	/**
	 * @return AbstractGenerate
	 */
	public static function getFake()
	{
		return new AbstractGenerate();
	}


	/**
	 * @return int|mixed
	 */
	public static function getDefaultWarehouseIdOrCreate()
	{
		$id = static::Name(static::$defaultName)->pluck('id');

		if (null == $id) {
			/* Create Record */
			$countryId = Locations::getIdsDefaultCountryOrCreate();

			$provinceId = Locations::getIdsDefaultProvinceOrCreate($countryId);
			$cityId     = Locations::getIdsDefaultCityOrCreate($provinceId);
			$catId      = Warehousecategory::getIdDefaultWarehouseCategoryOrCreate();
			$wh         = static::create(
				static::getFake()->getWarehouse()->createWarehouse(static::$defaultName, $cityId, $catId)
			);
			$id         = $wh->id;
		}
		return $id;
	}
}

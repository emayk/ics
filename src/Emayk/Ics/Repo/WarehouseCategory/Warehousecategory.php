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
namespace Emayk\Ics\Repo\Warehousecategory;

use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;
use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\WarehouseCategory\WarehouseCategory'
 *
 * @property integer                                                                                     $id
 * @property string                                                                                      $name
 * @property string                                                                                      $info
 * @property string                                                                                      $uuid
 * @property integer                                                                                     $createby_id
 * @property integer                                                                                     $lastupdateby_id
 * @property \Carbon\Carbon                                                                              $created_at
 * @property \Carbon\Carbon                                                                              $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\Emayk\Ics\Repo\Stockproducts\Stockproducts[] $stocks
 */
class Warehousecategory extends Model
{
	/**
	 * @var array
	 */
	protected $guarded = array();
	/**
	 * @var string
	 */
	protected $table = 'master_warehouse_category';
	/**
	 * @var array
	 */
	public static $rules = array();
	/**
	 * @var string
	 */
	protected static $defaultName = 'Center';

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function stocks()
	{
		return $this->hasMany('Emayk\Ics\Repo\Stockproducts\Stockproducts', 'catwh_id');
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
	public static function  getFake()
	{
		return new AbstractGenerate();
	}

	/**
	 * @return int|mixed
	 */
	public static function  getIdDefaultWarehouseCategoryOrCreate()
	{
		$id = static::Name(static::$defaultName);
		if ($id->count()) {
			$id = $id->pluck('id');
		} else {
			$catwh = static::create(
				static::getFake()->getWarehouse()->createWarehouseCategory(static::$defaultName)
			);
			$id = $catwh->id;
		}
		return $id;
	}
}

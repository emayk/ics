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
namespace Emayk\Ics\Repo\Producttype;

use Emayk\Ics\Repo\Fabrictype\Fabrictype;
use Illuminate\Database\Eloquent\Model;
use \Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Producttype\Producttype'
 *
 * @property integer $id
 * @property string $name
 * @property integer $fabrictype_id
 * @property string $uuid
 * @property integer $createby_id
 * @property integer $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\Emayk\Ics\Repo\Products\Products[] $products
 */
class Producttype extends Model
{
	/**
	 * @var array
	 */
	protected $guarded = array();
	/**
	 * @var string
	 */
	protected $table = 'master_product_type';
	/**
	 * @var array
	 */
	public static $rules = array();


	/**
	 * Type Products
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function products()
	{
		return $this->hasMany('Emayk\Ics\Repo\Products\Products', 'type_id');
	}


	/**
	 * @param int $count
	 *
	 * @return array
	 */
	public static function getIdsOrCreateDummy ($count = 10)
	{
		$ids = static::lists('id');
		if (!count($ids)) {
			$ListfabricTypeIds = Fabrictype::getIdsOrCreateDummy($count);
			$records = static::getFake()->getProductType()->generateMassiveRecords($ListfabricTypeIds,$count);
			foreach ($records as $rec)
			{
				$prodType = static::create($rec);
				$ids [] = $prodType->id;
			}
		};
		return $ids;

	}

	/**
	 * @return AbstractGenerate
	 */
	public static function getFake()
	{
		return new  AbstractGenerate();
	}
}

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
namespace Emayk\Ics\Repo\Productdetails;
use Illuminate\Database\Eloquent\Model;
use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;
/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Productdetails\Productdetails'
 *
 * @property integer $id
 * @property integer $product_id
 * @property integer $color_id
 * @property integer $unit_id
 * @property integer $grade_id
 * @property float $salesprice
 * @property float $salespricemin
 * @property integer $currsp_id
 * @property integer $currspm_id
 * @property integer $parent_id
 * @property string $parent_type
 * @property string $uuid
 * @property integer $createby_id
 * @property integer $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Emayk\Ics\Repo\Products\Products $product
 */
class Productdetails extends Model {
	protected $guarded = array();
	protected $table = 'master_product_details';
    protected  $hidden = array('parent_id', 'parent_type');
	public static $rules = array();

    public function product()
    {
        return $this->belongsTo('Emayk\Ics\Repo\Products\Products','product_id');
    }

	protected static function  getFake()
{
	return new AbstractGenerate();
}
	protected static  function getIdOrCreate($productId,$colorId, $unitId, $gradeId, $currSp, $currSpm)
	{
		$product = static::whereProductId($productId);
		if (!$product->count()){
			$newRecord = static::create(
					static::getFake()->getProduct()->createDetail($productId,$colorId, $unitId, $gradeId, $currSp, $currSpm)
			);
			$productId = $newRecord->id;
		}else{
			$productId = $product->pluck('id');
		}
		return $productId;
	}
}

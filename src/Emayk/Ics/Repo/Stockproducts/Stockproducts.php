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
namespace Emayk\Ics\Repo\Stockproducts;
use Illuminate\Database\Eloquent\Model;
/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Stockproducts\Stockproducts'
 *
 * @property integer $id
 * @property integer $catwh_id
 * @property integer $product_id
 * @property integer $total
 * @property integer $wh_id
 * @property integer $lengthfabric
 * @property string $onday
 * @property integer $unit_id
 * @property string $uuid
 * @property integer $createby_id
 * @property integer $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Emayk\Ics\Repo\Products\Products $product
 * @property-read \Emayk\Ics\Repo\WarehouseCategory\WarehouseCategory $categorywarehouse
 * @property-read \Emayk\Ics\Repo\Warehouse\Warehouse $warehouse
 * @property-read \Emayk\Ics\Repo\Users\Users $createby
 * @property-read \Emayk\Ics\Repo\Users\Users $updateby
 */
class Stockproducts extends Model {
	protected $guarded = array();
	protected $table = 'stock_card_product';
	public static $rules = array();

	 public function product()
	 {
			return $this->belongsTo('Emayk\Ics\Repo\Products\Products','product_id');
	 }

	 public function categorywarehouse()
	 {
			return $this->belongsTo('Emayk\Ics\Repo\WarehouseCategory\WarehouseCategory','catwh_id');
	 }

	 public function warehouse()
	 {
			return $this->belongsTo('Emayk\Ics\Repo\Warehouse\Warehouse','wh_id');
	 }

	 public function createby()
	 {
			return $this->belongsTo('Emayk\Ics\Repo\Users\Users','createby_id');
	 }

	 public function updateby()
	 {
			return $this->belongsTo('Emayk\Ics\Repo\Users\Users','lastupdateby_id');
	 }

	 public function withrelations($obj){
			return $obj->with(
				 'product',
				 'categorywarehouse',
				 'createby',
				 'updateby'
			);
	 }

}

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
namespace Emayk\Ics\Repo\Transorderdetails;
use Illuminate\Database\Eloquent\Model;
/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Transorderdetails\Transorderdetails'
 *
 * @property integer $id
 * @property integer $qty
 * @property float $price
 * @property string $info
 * @property integer $product_id
 * @property integer $order_id
 * @property string $uuid
 * @property integer $createby_id
 * @property integer $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class Transorderdetails extends Model {
	protected $guarded = array();
	protected $table = 'trans_order_details';
	public static $rules = array();
	public $hidden = ['price'];
	public $appends = [
		'productimg','productname'
	];

	public function product()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Products\Products','product_id');
	}


	public function getProductnameAttribute()
	{
		return $this->attributes[ "productname" ] = $this->product()->pluck('name');
	}

	public function getProductimgAttribute()
	{
		/**
		 * @todo : url image
		 */
		return $this->attributes[ "productimg" ] = 'http://';
	}

}

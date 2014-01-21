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
namespace Emayk\Ics\Repo\Saleproduct;
use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Saleproduct\Saleproduct'
 *
 * @property integer $id
 * @property integer $saleid
 * @property integer $product_id
 * @property integer $qty
 * @property float $price
 * @property string $desc
 * @property float $subtotal
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Emayk\Ics\Repo\Transsale\Transsale $sale
 */
class Saleproduct extends Model {
	/**
	 * @var array
	 */
	protected $guarded = array();
	/**
	 * @var string
	 */
	protected $table = 'trans_saleproducts';
	/**
	 * @var array
	 */
	public static $rules = array();
	/**
	 * @var array
	 */
	protected $appends = [
		'productname'
	];

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function product()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Products\Products','product_id');
	}

	/**
	 * @return mixed
	 */
	public function getProductnameAttribute()
	{
		return $this->attributes[ 'productname' ] = $this->product()->pluck('name');
	}
	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function sale(){
		return $this->belongsTo('\Emayk\Ics\Repo\Transsale\Transsale','saleid');
	}
}

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
namespace Emayk\Ics\Repo\Productsuppliers;
use Illuminate\Database\Eloquent\Model;
/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Productsuppliers\Productsuppliers'
 *
 * @property integer $id
 * @property integer $master_product_id
 * @property integer $master_supplier_id
 * @property-read \Illuminate\Database\Eloquent\Collection|\Emayk\Ics\Repo\Products\Products[] $products
 * @property-read \Emayk\Ics\Repo\Suppliers\Suppliers $suppliers
 */
class Productsuppliers extends Model {
	protected $guarded = array();
	protected $table = 'master_product_suppliers';
	public static $rules = array();
	public  $timestamps = false;
	public $hidden = ['master_supplier_id','master_product_id'];
	protected $appends = [
		'productname',
		'suppliername',
		'supplierid',
		'productid',
		'productstock'
	];

    public function products()
    {
	    return $this->belongsTo('Emayk\Ics\Repo\Products\Products', 'master_product_id');
//        return $this->hasMany('Emayk\Ics\Repo\Products\Products','master_product_id');
//        return $this->hasMany('Emayk\Ics\Repo\Products\Products','id');
    }

    public function suppliers()
    {
//        return $this->belongsTo('Emayk\Ics\Repo\Suppliers\Suppliers', 'id');
        return $this->belongsTo('Emayk\Ics\Repo\Suppliers\Suppliers', 'master_supplier_id');
    }

	public function getProductnameAttribute()
	{
		return $this->attributes['productname'] = $this->products->name ;//$this->products()->pluck('name');
	}
	public function getSuppliernameAttribute()
	{
		return $this->attributes['suppliername'] = $this->suppliers->name;
	}

	public function getSupplieridAttribute()
	{
		return $this->attributes['supplierid'] = $this->suppliers->id;
	}
	public function getProductidAttribute()
	{
		return $this->attributes['productid'] = $this->products->id;
	}
	public function getProductstockAttribute()
	{
		return $this->attributes['productstock'] = $this->products->countStocks();
	}

}

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
namespace Emayk\Ics\Repo\Products;
use \Event;
use Illuminate\Database\Eloquent\Model;
/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Products\Products'
 *
 * @property integer $id
 * @property string $name
 * @property string $nodesign
 * @property string $contruction
 * @property integer $cat_id
 * @property integer $type_id
 * @property string $weight
 * @property integer $unitweight_id
 * @property integer $width
 * @property integer $unitwidth_id
 * @property string $codeinternal
 * @property integer $parent_id
 * @property string $parent_type
 * @property string $uuid
 * @property integer $createby_id
 * @property integer $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Emayk\Ics\Repo\Productcategory\Productcategory $category
 * @property-read \Emayk\Ics\Repo\Producttype\Producttype $type
 * @property-read \Emayk\Ics\Repo\Units\Units $unitweight
 * @property-read \Emayk\Ics\Repo\Units\Units $unitwidth
 * @property-read \User $createby
 * @property-read \Emayk\Ics\Repo\Users\Users $updateby
 * @property-read \Emayk\Ics\Repo\Productdetails\Productdetails $detail
 * @property-read \Illuminate\Database\Eloquent\Collection|\Emayk\Ics\Repo\Stockproducts\Stockproducts[] $stocks
 * @property-read \Illuminate\Database\Eloquent\Collection|\Emayk\Ics\Repo\Productsuppliers\Productsuppliers[] $suppliers
 */
class Products extends Model {
	protected $guarded = array();
	protected $table = 'master_products';
	public static $rules = array();
	 protected  $appends = array();
	 protected $hidden = array();
	 protected $with = array(
			'type',
			'category',
			'image',
			'unitweight',
			'unitwidth',
			'createby',
			'detail',
			'updateby',
			'stocks',
			'countStocks'
	 );

    /**
     * Category Product
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category(){
        return $this->belongsTo('Emayk\Ics\Repo\Productcategory\Productcategory','cat_id');
    }

    /**
     * Type Product
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function type(){
        return $this->belongsTo('Emayk\Ics\Repo\Producttype\Producttype','type_id');
    }

    /**
     *
     * Satuan Berat Product
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function unitweight(){
        return $this->belongsTo('Emayk\Ics\Repo\Units\Units','unitweight_id');
    }

    /**
     *
     * Satuan Lebar Product
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function unitwidth(){
        return $this->belongsTo('Emayk\Ics\Repo\Units\Units','unitwidth_id');
    }

    /**
     * Create Record By User
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function createby(){
        return $this->belongsTo('Emayk\Ics\Repo\Users\Users','createby_id');
    }

    /**
     *
     * Update Record By User
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function updateby(){
        return $this->belongsTo('Emayk\Ics\Repo\Users\Users','lastupdateby_id');
    }


    /**
     *
     * Detail Product
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function detail(){
        return $this->hasOne('Emayk\Ics\Repo\Productdetails\Productdetails','product_id');
    }


    /**
     *
     * Stocks Products
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function stocks(){
        return $this->hasMany('Emayk\Ics\Repo\Stockproducts\Stockproducts','product_id');
    }


    /**
     *
     * Suppliers Products
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function suppliers(){
        return $this->hasMany('Emayk\Ics\Repo\Productsuppliers\Productsuppliers','master_product_id');
    }

	 /**
		* Mendapatkan Image Product
		* @return \Illuminate\Database\Eloquent\Relations\MorphOne
		*/
	 public function image()
		{
			 return $this->morphOne('Emayk\Ics\Repo\Images\Images','imageable');
		}

	 /**
		* Mendapatkan Jumlah Stocks
		* @return \Illuminate\Database\Eloquent\Relations\HasOne
		*/
	 public function countStocks(){
			return $this->hasOne('Emayk\Ics\Repo\Statsproduct\Statsproduct','product_id');
	 }

//	 public function getHasStocksAttribute(){
//				return $this->attributes["hasStocks"] = true;
//	 }
////
//	 public function getTotalStocksAttribute(){
//				return $this->attributes["totalStocks"] = rand(1,200);
//	 }

//
//	 protected function getTotalStock(){
//			return $this->stocks()->sum('total');
//	 }
//

////contoh ::
	 public static function boot(){
//			public $timestamps = false;
			parent::boot();

			static::creating(function($model) {

//				 $dt = new DateTime;
//				 $model->created_at = $dt->format('m-d-y H:i:s');
				 return true;
			});
//
//			static::updating(function($model) {
//				 $dt = new DateTime;
//				 $model->updated_at = $dt->format('m-d-y H:i:s');
//				 return true;
//			});
	 }


}

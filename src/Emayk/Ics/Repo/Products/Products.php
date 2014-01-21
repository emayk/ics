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

use Emayk\Ics\Repo\Colors\Colors;
use Emayk\Ics\Repo\Currencies\Currencies;
use Emayk\Ics\Repo\Fabricgrade\Fabricgrade;
use Emayk\Ics\Repo\Images\Images;
use Emayk\Ics\Repo\Productcategory\Productcategory;
use Emayk\Ics\Repo\Productdetails\Productdetails;
use Emayk\Ics\Repo\Productsuppliers\Productsuppliers;
use Emayk\Ics\Repo\Producttype\Producttype;
use Emayk\Ics\Repo\Stockproducthistory\Stockproducthistory;
use Emayk\Ics\Repo\Stockproducts\Stockproducts;
use Emayk\Ics\Repo\Suppliers\Suppliers;
use Emayk\Ics\Repo\Units\Units;
use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;
use Emayk\Ics\Support\Dummy\Faker\Products as SampleProducts;
use \Event;
use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Products\Products'
 *
 * @property integer                                                                                           $id
 * @property string                                                                                            $name
 * @property string                                                                                            $nodesign
 * @property string                                                                                            $contruction
 * @property integer                                                                                           $cat_id
 * @property integer                                                                                           $type_id
 * @property string                                                                                            $weight
 * @property integer                                                                                           $unitweight_id
 * @property integer                                                                                           $width
 * @property integer                                                                                           $unitwidth_id
 * @property string                                                                                            $codeinternal
 * @property integer                                                                                           $parent_id
 * @property string                                                                                            $parent_type
 * @property string                                                                                            $uuid
 * @property integer                                                                                           $createby_id
 * @property integer                                                                                           $lastupdateby_id
 * @property \Carbon\Carbon                                                                                    $created_at
 * @property \Carbon\Carbon                                                                                    $updated_at
 * @property-read \Emayk\Ics\Repo\Productcategory\Productcategory                                              $category
 * @property-read mixed                                                                                        $catname
 * @property-read mixed                                                                                        $widthname
 * @property-read mixed                                                                                        $weightname
 * @property-read mixed                                                                                        $typename
 * @property-read \Emayk\Ics\Repo\Producttype\Producttype                                                      $type
 * @property-read \Emayk\Ics\Repo\Units\Units                                                                  $unitweight
 * @property-read \Emayk\Ics\Repo\Units\Units                                                                  $unitwidth
 * @property-read \Emayk\Ics\Repo\Users\Users                                                                  $createby
 * @property-read \Emayk\Ics\Repo\Users\Users                                                                  $updateby
 * @property-read \Emayk\Ics\Repo\Productdetails\Productdetails                                                $detail
 * @property-read \Illuminate\Database\Eloquent\Collection|\Emayk\Ics\Repo\Stockproducts\Stockproducts[]       $stocks
 * @property-read \Illuminate\Database\Eloquent\Collection|\Emayk\Ics\Repo\Productsuppliers\Productsuppliers[] $suppliers
 * @property-read \Illuminate\Database\Eloquent\Collection|\Emayk\Ics\Repo\Statsproduct\Statsproduct[]         $stats
 * @property-read \Emayk\Ics\Repo\Statsproduct\Statsproduct                                                    $countStocks
 * @property-read mixed                                                                                        $totalstocks
 */
class Products extends Model
{
	protected $guarded = array();
	protected $table = 'master_products';
	public static $rules = array();
	protected $appends = array('totalstocks', 'catname', 'typename', 'widthname', 'weightname');
	protected $hidden = array('parent_id', 'parent_type');
	protected $with = array(//        'count',
//        'type',
//        'category',
//        'image',
//        'unitweight',
//        'unitwidth',
//        'createby',
//        'detail',
//        'updateby',
//        'stocks',
//        'countStocks'
	);

	public function sale()
	{
		return $this->hasMany('\Emayk\Ics\Repo\Saleproduct\Saleproduct', 'product_id');
	}

	/**
	 * Category Product
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function category()
	{
		return $this->belongsTo('Emayk\Ics\Repo\Productcategory\Productcategory', 'cat_id');
	}

	public function getCatnameAttribute()
	{
		return $this->attributes[ 'catname' ] = $this->category()->pluck('name');
	}

	public function getWidthnameAttribute()
	{
		return $this->attributes[ 'widthname' ] = $this->unitwidth()->pluck('name');
	}

	public function getWeightnameAttribute()
	{
		return $this->attributes[ 'weightname' ] = $this->unitweight()->pluck('name');
	}

	public function getTypenameAttribute()
	{
		return $this->attributes[ 'typename' ] = $this->type()->pluck('name');
	}

	/**
	 * Type Product
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function type()
	{
		return $this->belongsTo('Emayk\Ics\Repo\Producttype\Producttype', 'type_id');
	}

	/**
	 *
	 * Satuan Berat Product
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function unitweight()
	{
		return $this->belongsTo('Emayk\Ics\Repo\Units\Units', 'unitweight_id');
	}

	/**
	 *
	 * Satuan Lebar Product
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function unitwidth()
	{
		return $this->belongsTo('Emayk\Ics\Repo\Units\Units', 'unitwidth_id');
	}

	/**
	 * Create Record By User
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function createby()
	{
		return $this->belongsTo('Emayk\Ics\Repo\Users\Users', 'createby_id');
	}

	/**
	 *
	 * Update Record By User
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function updateby()
	{
		return $this->belongsTo('Emayk\Ics\Repo\Users\Users', 'lastupdateby_id');
	}


	/**
	 *
	 * Detail Product
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function detail()
	{
		return $this->hasOne('Emayk\Ics\Repo\Productdetails\Productdetails', 'product_id');
	}


	/**
	 *
	 * Stocks Products
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function stocks()
	{
		return $this->hasMany('Emayk\Ics\Repo\Stockproducts\Stockproducts', 'product_id');
	}


	/**
	 *
	 * Suppliers Products
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function suppliers()
	{
		return $this->hasMany('Emayk\Ics\Repo\Productsuppliers\Productsuppliers', 'master_product_id');
	}

	public function stats()
	{
		return $this->hasMany('\Emayk\Ics\Repo\Statsproduct\Statsproduct', 'product_id');
	}

	/**
	 * Mendapatkan Image Product
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\MorphOne
	 */
	public function image()
	{
		return $this->morphOne('Emayk\Ics\Repo\Images\Images', 'imageable');
	}

	/**
	 * Mendapatkan Jumlah Stocks
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne
	 */
	public function countStocks()
	{
		return $this->hasOne('Emayk\Ics\Repo\Statsproduct\Statsproduct', 'product_id');
	}

	public function getTotalstocksAttribute()
	{
		return $this->attributes[ "totalstocks" ] = $this->stocks()->pluck('total');
	}

//
//	 protected function getTotalStock(){
//			return $this->stocks()->sum('total');
//	 }
//

////contoh ::
//    public static function boot()
//    {
////			public $timestamps = false;
//        parent::boot();
//
//        static::creating(function ($model) {
//
////				 $dt = new DateTime;
////				 $model->created_at = $dt->format('m-d-y H:i:s');
//            return true;
//        });
////
////			static::updating(function($model) {
////				 $dt = new DateTime;
////				 $model->updated_at = $dt->format('m-d-y H:i:s');
////				 return true;
////			});
//    }


	protected static function  getFake()
	{
		return new AbstractGenerate();
	}

	protected static function  createRecord(array $record)
	{
		return static::create($record);
	}

	public static function generateSampleProducts($count = 10)
	{
//		Type
		$typeIds = Producttype::getIdsOrCreateDummy();
//		category
		$categoryIds = Productcategory::getIdsOrCreateSampelData();
//		unit berat
		$unitIds = Units::getIdsOrCreateSampleUnits();

//		parent_id
		$parentId = 0;
		$fake     = static::getFake();
//

//		Buat Product
		$catId = $fake->getFake()->randomElement($categoryIds);

		$typeId = $fake->getFake()->randomElement($typeIds);

		$unitWeightId = $fake->getFake()->randomElement($unitIds);

		$unitWidthId = $fake->getFake()->randomElement($unitIds);


		$supplierIds = Suppliers::getRecordIdsOrCreate();
		$currencyIds = Currencies::getIdsOrCreateSample();
//		color
		$colorIds = Colors::getIdsOrCreate();
//  gradeIds
		$gradeIds = Fabricgrade::getIdsOrCreate();

		$productIds = array();
		for ($rec = 0; $rec < $count; $rec++) {
			$product        = $fake->getProduct()->product(
				$catId, $typeId, $unitWeightId, $unitWidthId, $parentId,
				'\Emayk\Ics\Repo\Productcategory\Productcategory'
			);
			$record         = static::createRecord($product);
			$productId      = $record->id;
			$productIds [ ] = $productId;
			//		Image/ Photo Product
			$imagesIds [ ] = Images::getIdsOrCreate($productId, '\Emayk\Ics\Repo\Products\Products');
//			Supplier Product
//		Product Supplier (Product dapat dari Supplier mana ?)
			$supplierId        = $fake->getFake()->randomElement($supplierIds);
			$supplierProduct   = Productsuppliers::create(
				array('master_product_id' => $productId, 'master_supplier_id' => $supplierId));
			$supplierProductId = $supplierProduct->id;

//			Create Detail
//		Buat Product Detail
			$unitId  = $fake->getFake()->randomElement($unitIds);
			$colorId = $fake->getFake()->randomElement($colorIds);
			$gradeId = $fake->getFake()->randomElement($gradeIds);
			$currSp  = $fake->getFake()->randomElement($currencyIds);
			$currSpm = $fake->getFake()->randomElement($currencyIds);

			$detailIds [ ] = Productdetails::getIdOrCreate(
				$productId, $colorId, $unitId, $gradeId, $currSp, $currSpm
			);

//Buat Stock
//		Buat Stock
			$stockIds[ ] = Stockproducts::createStock($productId);

		}

		foreach ($stockIds as $stockId) {

			for ($history = 0; $history < 9; $history++) {
				//		Buat Stock Detail/History
				if (( $history % 2 == 0 ) || ( $history == 0 )) {
					$typeHistory = 'in';
				} else {
					$typeHistory = 'out';
				}

				$firstHistory = ( $history == 0 );
//                $stockHistoryIds[] =
				Stockproducthistory::createHistoryStockSample(
					$stockId, $typeHistory, $firstHistory);
			}
		}

		return "Sudah Generate sebanyak " . count($productIds) . " records";

		return s($productIds, $supplierProductId, $imagesIds, $detailIds);


	}
}

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
**/



namespace Emayk\Ics\Repo\Factory\Product;


use Emayk\Ics\Models\BaseModel;

/**
 * Class Eloquent
 *
 * @package Emayk\Ics\Repo\Factory\Product
 */
class Eloquent extends BaseModel{
	/**
	 * @var array
	 */
	protected $guarded = [];
	/**
	 * @var string
	 */
	protected $table = 'master_products';
	/**
	 * @var array
	 */
	public static $rules = [];
	/**
	 * @var array
	 */
	protected $appends = ['totalstocks', 'catname', 'typename', 'widthname', 'weightname','totallength','totalroll'];
	/**
	 * @var array
	 */
	protected $hidden = ['parent_id', 'parent_type'];
//	protected $with = ['category','type','unitweight','unitheight'];


	/**
	 * @return int
	 */
	public function getTotallengthAttribute()
	{
		/*@todo: relasikan dengan totalroll yang ada di kartu stock*/
		$totallength = $this->stocks()->pluck('totallength');
		$count = (is_null($totallength) ) ? 0 :  $totallength ;
		return $this->attributes[ 'totallength' ] = $count;
	}

	/**
	 * @return int
	 */
	public function getTotalrollAttribute()
	{
		/*@todo: relasikan dengan totalroll yang ada di kartu stock*/
		$totalroll = $this->stocks()->pluck('totalroll');
		$count = (is_null($totalroll) ) ? 0 :  $totalroll ;
		return $this->attributes[ 'totalroll' ] =$count;
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function orderItem()
	{
		return $this->hasMany('\Emayk\Ics\Repo\Transorderdetails\Transorderdetails','product_id');
	}

	/**
	 * Barang - barang yang sudah dijual
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
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

		return $this->belongsTo('\Emayk\Ics\Repo\Factory\Product\Category\Eloquent', 'cat_id');
	}

	/**
	 * @return mixed
	 */
	public function getCatnameAttribute()
	{
		return $this->attributes[ 'catname' ] = $this->category()->pluck('name');
//		return $this->attributes[ 'catname' ] = $this->category->name;
	}

	/**
	 * @return mixed
	 */
	public function getWidthnameAttribute()
	{
//		return $this->attributes[ 'widthname' ] = $this->unitwidth->name;//->pluck('name');
		return $this->attributes[ 'widthname' ] = $this->unitwidth()->pluck('name');
	}

	/**
	 * @return mixed
	 */
	public function getWeightnameAttribute()
	{
		return $this->attributes[ 'weightname' ] = $this->unitweight()->pluck('name');
	}

	/**
	 * @return mixed
	 */
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
		return $this->hasOne('\Emayk\Ics\Repo\Factory\Product\Detail\Eloquent', 'product_id');
	}

	/**
	 * Mendapatkan Sales Price
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne
	 */
	public function price()
	{
		return $this->hasOne('\Emayk\Ics\Repo\Factory\Product\SalesPrice\Eloquent', 'product_id');
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
		return $this->belongsToMany('\Emayk\Ics\Repo\Suppliers\Suppliers', 'master_product_suppliers', 'master_product_id', 'master_supplier_id');
	}


	/**
	 * Mendapatkan Relasi Statistik
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
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

	/**
	 * @return mixed
	 */
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


	/**
	 * @return AbstractGenerate
	 */
	protected static function  getFake()
	{
		return new AbstractGenerate();
	}

	/**
	 * @param array $record
	 *
	 * @return \Illuminate\Database\Eloquent\Model|static
	 */
	protected static function  createRecord(array $record)
	{
		return static::create($record);
	}

	/**
	 * @param int $count
	 *
	 * @return string
	 */
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

	/**
	 * Mendapatkan Model Category Product
	 * @return Category\Eloquent
	 */
	public function getCategory(){
		return new Category\Eloquent();
	}

	/**
	 * Mendapatkan Model Detail Product
	 * @return Detail\Eloquent
	 */
	public function getDetail(){
		return new Detail\Eloquent();
	}

	/**
	 * Mendapatkan SalesPrice Object
	 * @return SalesPrice\Eloquent
	 */
	public function getSalesPrice(){
		return new SalesPrice\Eloquent();
	}


}
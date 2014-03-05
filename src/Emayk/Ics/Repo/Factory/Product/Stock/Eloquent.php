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


namespace Emayk\Ics\Repo\Factory\Product\Stock;


use Emayk\Ics\Models\BaseModel;
use Emayk\Ics\Repo\Units\Units;
use Emayk\Ics\Repo\Warehouse\Warehouse;
use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;


/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Stockproducts\Stockproducts'
 *
 * @property integer                                                  $id
 * @property integer                                                  $product_id
 * @property integer                                                  $total
 * @property integer                                                  $wh_id
 * @property integer                                                  $lengthfabric
 * @property string                                                   $onday
 * @property integer                                                  $unit_id
 * @property string                                                   $uuid
 * @property integer                                                  $createby_id
 * @property integer                                                  $lastupdateby_id
 * @property \Carbon\Carbon                                           $created_at
 * @property \Carbon\Carbon                                           $updated_at
 */
class Eloquent extends BaseModel
{
	/**
	 * @var array
	 */
	protected $guarded = array();
	/**
	 * @var string
	 */
	protected $table = 'stock_card_product';
	/**
	 * @var array
	 */
	public static $rules = array();


	/**
	 * @return mixed
	 */
	public function product()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Factory\Product\Eloquent', 'product_id');
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function categorywarehouse()
	{
		return $this->belongsTo('Emayk\Ics\Repo\WarehouseCategory\WarehouseCategory', 'catwh_id');
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function warehouse()
	{
		return $this->belongsTo('Emayk\Ics\Repo\Warehouse\Warehouse', 'wh_id');
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function createby()
	{
		return $this->belongsTo('Emayk\Ics\Repo\Users\Users', 'createby_id');
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function updateby()
	{
		return $this->belongsTo('Emayk\Ics\Repo\Users\Users', 'lastupdateby_id');
	}

	/**
	 * @param $obj
	 *
	 * @return mixed
	 */
	public function withrelations($obj)
	{
		return $obj->with(
			'product',
			'categorywarehouse',
			'createby',
			'updateby'
		);
	}

	/**
	 * @return AbstractGenerate
	 */
	protected static function  getFake()
	{
		return new AbstractGenerate();
	}


	/**
	 * @param $productId
	 *
	 * @return int|mixed
	 */
	public static function createStock($productId)
	{
		$warehouseId = Warehouse::getDefaultWarehouseIdOrCreate();
		$unitIds     = Units::getIdsOrCreateSampleUnits();
		$unitId      = static::getFake()->getFake()->randomElement($unitIds);
		$newRecord   = static::create(
			static::getFake()->getProduct()->createStockProduct($productId, $warehouseId, $unitId)
		);
		return $newRecord->id;
	}

	/**
	 * @return string
	 */
	protected function getPrefixStock()
	{
		return $this->getPrefix()->stockcard();
	}


	/**
	 * Membuat Stock
	 *
	 * @param \Emayk\Ics\Repo\Factory\Product\Eloquent $product
	 * @param                                          $totalqty
	 * @param                                          $totalroll
	 * @param                                          $createby_id
	 *
	 * @return \Illuminate\Database\Eloquent\Model|static
	 */
	public function add(\Emayk\Ics\Repo\Factory\Product\Eloquent $product,
	                    $totalqty,
	                    $totalroll,
	                    $createby_id
	)

	{
		/**
		 * Jika Product Sudah Ada
		 * Jangan ditambahkan.
		 */

		$productId = $product->id;
		if (!$this->getCountProduct($productId)) {
			$newStock = [
				'trxnumber'       => $product->uuid,
				'product_id'      => $productId,
				'totalqty'        => $totalqty,
				'totalqty'        => $totalqty,
				'totalroll'       => $totalroll,
				'createby_id'     => $createby_id,
				'lastupdateby_id' => $createby_id,
				'uuid'            => $this->createUuid($product->uuid)
			];

			return $this->create($newStock);
		}
	}


	protected function getCountProduct($productId)
	{
		return ( $this->whereProductId($productId)->count() > 0 );
	}

	public function history()
	{
		return $this->hasMany('\Emayk\Ics\Repo\Factory\Product\Stock\History', 'stock_id');
	}
}

 
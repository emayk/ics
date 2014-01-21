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
namespace Emayk\Ics\Repo\Stockproducthistory;

use Emayk\Ics\Repo\Stockproducts\Stockproducts;
use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;
use Emayk\Ics\Support\Dummy\Faker\Products as FakeProduct;
use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Stockproducthistory\Stockproducthistory'
 *
 * @property integer $id
 * @property integer $stock_id
 * @property string $refdoc
 * @property string $noroll
 * @property integer $qty_in
 * @property integer $qty_out
 * @property integer $qty_balance
 * @property integer $total
 * @property string $uuid
 * @property string $authenticate_text
 * @property integer $createby_id
 * @property integer $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \ $stock
 * @method static Emayk\Ics\Repo\Stockproducthistory\Stockproducthistory ofStocks($idStock) 
 */
class Stockproducthistory extends Model
{
	/**
	 * @var array
	 */
	protected $guarded = array();
	/**
	 * @var string
	 */
	protected $table = 'stock_card_product_history';
    /**
     * @var array
     */
    protected $hidden = array('authenticate_text');
	/**
	 * @var array
	 */
	public static $rules = array();

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function stock()
	{
		return $this->belongsTo('', 'stock_id');
	}

	/**
	 * @return AbstractGenerate
	 */
	protected static function  getFake()
	{
		return new AbstractGenerate();
	}

	/**
	 * @param        $stockId
	 * @param string $typeHistory
	 * @param bool   $firstHistory
	 *
	 * @return int|mixed
	 */
	public static function createHistoryStockSample($stockId, $typeHistory = 'in', $firstHistory = true)
	{
		$rollNumber   = 'Stock-' . $stockId . rand(1, 1000); //Stockproducts::whereOnday($stockId);
		$recordStock  = Stockproducts::findOrFail($stockId);
		$totalActive = $recordStock->total;
		$typeHistory  = strtolower($typeHistory);

		$qtyIn  = rand(1, 200);
		$qtyOut = rand(10, 100);

		if (!in_array($typeHistory, array('in', 'out'))) $typeHistory = 'in';

		/*Jika Qty Keluar Lebih besar dari Total Yang ada */
		if ($totalActive < $qtyOut) $qtyOut = $totalActive;
		/*Jika Total 0 Maka Tidak Bisa mengeluarkan Barang*/
		if ($totalActive == 0) $qtyOut = 0;

		if ($firstHistory) {
			$qtyOut = 0;
			/*Rumus => total =  QtyIn - QtyOut*/
			$total       = $qtyIn - $qtyOut;
			$typeHistory = 'in';
		} else {
			/*Rumus => total = (totalsebelumny)+(qtyIn-QtyOut)  */
			$total = ( $totalActive + ( $qtyIn - $qtyOut ) );
		}


		if ($typeHistory == 'in') {
			/*Jika History Input/Terima Barang*/
			$qtyOut     = 0;
			$qtyBalance = $totalActive + $qtyIn;
		} else {
			/*Jika Keluar Barang */
			/* dan akan mengurang balance */
			$qtyIn      = 0;
			$qtyBalance = $totalActive + ( $qtyIn - $qtyOut );
		}

		$recordHistoryStock = static::create(
			static::getFake()
				->getProduct()
				->createHistoryStockProduct(
					$stockId, $rollNumber, $qtyIn, $qtyOut, $qtyBalance, $total)
		);
		/*Update Total Stock */
		$recordStock->total = $qtyBalance;
		$recordStock->save();
		return $recordHistoryStock->id;
	}


	/**
	 * Apakah Stock Sudah ada sebelumnya?
	 * @param $stockId
	 *
	 * @return bool
	 */
	protected static function  isStockAlreadyExist($stockId)
	{
		return ( Stockproducts::whereId($stockId)->count() > 0 );
	}

	/**
	 * Mendapatkan Total Stock
	 * @param $stockId
	 *
	 * @return mixed
	 */
	public  static function getTotalStockFromStockId($stockId)
	{
		if (static::isStockAlreadyExist($stockId))
		{
			return Stockproducts::whereId($stockId)->pluck('total');
		}
		return false;
	}

	/**
	 * Mendapatkan Instance Stock
	 * @return Stockproducts
	 */
	public  static function getStock()
	{
		return new Stockproducts();
	}


    /**
     * Mendapatkan History dari Stock ID
     * @param $query
     * @param $idStock
     * @return mixed
     */
    public function scopeOfStocks($query,$idStock){
        return $query->whereStockId($idStock);
    }
}

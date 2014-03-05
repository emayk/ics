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

use Emayk\Ics\Repo\Factory\Product\Stock\Eloquent as ModelStock;
use Emayk\Ics\Models\BaseModel;

/**
 * Class History
 *
 * @package Emayk\Ics\Repo\Factory\Product\Stock
 */
class History extends BaseModel
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
		return $this->belongsTo('\Emayk\Ics\Repo\Factory\Product\Stock\Eloquent', 'stock_id');
	}


	/**
	 * Melakukan Penambahan Record Stock History
	 *
	 * @param \Eloquent|\Emayk\Ics\Repo\Factory\Product\Stock\Eloquent $stock
	 * @param                                                          $refDoc
	 * @param                                                          $noRoll
	 * @param                                                          $qty_in
	 * @param                                                          $qtyRoll_in
	 * @param                                                          $totalqtyreceived
	 * @param                                                          $totalrollreceived
	 * @param                                                          $receivedate
	 * @param                                                          $createBy
	 * @param int                                                      $sj_id
	 *
	 * @internal param $total
	 * @internal param $qtyBalance
	 * @return \Illuminate\Database\Eloquent\Model|static
	 */
	public function addrecord(ModelStock $stock,
	                          $refDoc,
	                          $noRoll, $qty_in,
	                          $qtyOut,
	                          $qtyBalance,
	                          $qtyRoll_in,
	                          $totalqtyreceived,
	                          $totalrollreceived,
	                          $receivedate,
	                          $createBy,
	                          $sj_id = 0
	)
	{
		$newStockHistory = $this->create([
			'stock_id'          => $stock->id,
			'refdoc'            => $refDoc,
			'noroll'            => $noRoll,
			'qty_in'            => $qty_in,
			'qty_out'           => $qtyOut,
			'qty_balance'       => $qtyBalance,
			'total'             => $totalqtyreceived, // ?
			'totalroll'         => $totalrollreceived,
			'authenticate_text' => '', //generate
			'createby_id'       => $createBy,
			'receivedate'       => $receivedate,
			'lastupdateby_id'   => $createBy,
			'sj_id'             => $sj_id,
			'uuid'              => uniqid('ItemHistory_' . $stock->id),
			'qtyroll_in'        => $qtyRoll_in,
			'trxnumber'         => $refDoc . $stock->id,
		]);

//		$newStockHistory->increment('qty_balance', $qty_in);
		$newStockHistory->qty_balance = $this->getBalance($stock->id);
		$newStockHistory->save();

		$stock->increment('totalqty', $qty_in);
		$stock->increment('totalroll', $qtyRoll_in);
		$stock->save();

		return $newStockHistory;
	}

	protected function getBalance($stockId)
	{
		$records = $this->where('stock_id',$stockId);
		$outSum = $records->sum('qty_out');
		$inSum = $records->sum('qty_in');
		$balance = $inSum - $outSum;
		return $balance;
	}

	/**
	 * @param $q
	 *
	 * @return mixed
	 */
	public function scopeToday($q)
	{
		$date = date('Y-m-d');
		return $q->whereReceivedate($date);
	}

	/**
	 * Mendapatkan
	 *
	 * @return mixed
	 */
	public function getCountToday()
	{
		return ( $this->Today()->count() + 1 );
	}

	/**
	 * Mendapatkan Nomor Roll Berikutnya
	 * (10-02-2014-1);
	 *
	 * @return mixed
	 */
	public function getNextNoroll()
	{
		return $this->getPrefixNoroll() . $this->getCountToday();
	}

	/**
	 * Mendapatkan Prefix No Roll
	 *
	 * @return bool|string
	 */
	protected function getPrefixNoroll()
	{
		return date('d-m-Y');
	}

	public function getRefDoc()
	{
		return $this->getPrefix()->stockcardhistory();
	}
}

 
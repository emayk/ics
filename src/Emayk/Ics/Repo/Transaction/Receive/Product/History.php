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


namespace Emayk\Ics\Repo\Transaction\Receive\Product;

//use \Emayk\Ics\Repo\Transaction\Receive\Product\Model;
use Carbon\Carbon;
use Emayk\Ics\Models\BaseModel;

/**
 * Class History
 *
 * @package Emayk\Ics\Repo\Transaction\Receive\Product
 */
class History extends BaseModel
{
	/**
	 * @var string
	 */
	protected $table = 'trans_receive_product_items_history';
	/**
	 * @var array
	 */
	protected $guarded = [];

	/**
	 * @var array
	 */
	public $appends = [
		'nomorsuratjalan', 'canprint',
		'totalqtyorder'
	];

	public function gettotalqtyorderAttribute()
	{
		return $this->attributes[ 'totalqtyorder' ] = $this->item->productname;
	}


	/**
	 * Mendapatkan Nomor Surat jalan
	 *
	 * @return mixed
	 */
	public function getNomorsuratjalanAttribute()
	{
		return $this->attributes[ 'nomorsuratjalan' ] = $this->suratjalan->nomor;
	}

	/**
	 * @return bool
	 */
	public function getCanprintAttribute()
	{
		return $this->attributes[ 'canprint' ] = $this->isPrinted();
	}

	/**
	 * Membuat History Terima barang
	 *
	 * @param      $qty
	 * @param      $updatedby_id
	 * @param      $item_id
	 * @param      $productId
	 * @param int  $qtyroll
	 * @param      $sj_id
	 * @param      $receivedate
	 * @param      $cntreceive
	 * @param      $qtyreceived
	 * @param      $qtyrollreceive
	 * @param null $message
	 *
	 * @internal param $cntreceive
	 * @return \Illuminate\Database\Eloquent\Model|static
	 */
	public function createRecord($qty, $updatedby_id, $item_id, $productId, $qtyroll,
	                             $sj_id,
	                             $receivedate,
	                             $cntreceive,
	                             $qtyreceived,
	                             $qtyrollreceive,
	                             $message = null)
	{

		$username = $this->getUserFullname();
		$message  = ( is_null($message) )
			? '[ ' . $username . ' ] terima barang '
			: '[ ' . $username . ' ] ' . $message;
		$now      = Carbon::create();

		$totalRollreceived   = $qtyrollreceive + $qtyroll;
		$totalQtyYardReceive = $qtyreceived + $qty;
		return $this->create([
			"qty"             => $qty,
			"cntreceive"      => $cntreceive,
			"qtyroll"         => $qtyroll,
			"product_id"      => $productId,
			"message"         => $message,
			"created_at"      => $now,
			"updated_at"      => $now,
			"updatedby_id"    => $updatedby_id,
			"receiveby_id"    => $updatedby_id,
			"receivedate"     => $receivedate,
			"qtyreceived"     => $totalQtyYardReceive,
			"qtyrollreceived" => $totalRollreceived,
			"sj_id"           => $sj_id,
			"item_id"         => $item_id

		]);
	}


	/**
	 * Membuat History
	 *
	 * @param      $qty
	 * @param      $updatedby_id
	 * @param      $item_id
	 * @param      $productId
	 * @param      $qtyroll
	 * @param      $sj_id
	 * @param      $receivedate
	 * @param null $message
	 *
	 *
	 * @internal param $cntreceive
	 *
	 * @return \Illuminate\Database\Eloquent\Model|static
	 */
	public function createHistory($qty, $updatedby_id, $item_id, $productId, $qtyroll,
	                              $sj_id,
	                              $receivedate,
	                              $message = null)
	{

		return $this->createRecord($qty, $updatedby_id, $item_id, $productId, $qtyroll,
			$sj_id,
			$receivedate,
			$message);
	}


	/**
	 * relasi ke Product
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function product()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Factory\Product\Eloquent', 'product_id');
	}

	/**
	 * Siapa yang update
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function updateby()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Factory\User\Eloquent', 'updatedby_id');
	}

	/**
	 * Siapa yang menerima
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function receiveby()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Factory\User\Eloquent', 'receiveby_id');
	}

	/**
	 * Relasi ke Suratjalan
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function suratjalan()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Transaction\Receive\Product\Suratjalan', 'sj_id');
	}

	/**
	 * Mendapatkan Item Receive
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function item()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Transaction\Receive\Product\Item\Model', 'item_id');
	}

	/**
	 * Relasi ke Item Receive
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function getItemreceive()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Transaction\Receive\Product\Item\Model', 'item_id');
	}

	/**
	 * Mendapatkan record2 yang diinput hari ini
	 *
	 * @param $q
	 *
	 * @return mixed
	 */
	public function scopeCreateToday($q)
	{
		$today = date('Y-m-d');
		return $q->where('created_at','LIKE',"%{$today}%");
	}

	/**
	 * Apakah Sudah diprint ?
	 *
	 * @return bool
	 */
	public function isPrinted()
	{
		return ( $this->printed == 0 );
	}

	/**
	 * Menambahkan Count Print
	 */
	public function addCountPrint()
	{
		$this->increment('cntprint', 1);
	}

	/**
	 * @return mixed|string
	 */
	public function getKirimanke()
	{
		$cnt = $this->cntreceive;
		return ( $cnt == 0 ) ? 'Tidak ada data' : $cnt;
	}

	/**
	 * @param $itemId
	 *
	 * @return mixed
	 */
	public function getCountReceivedItem($itemId)
	{
		$cnt = $this->where('item_id', $itemId)->count();
		return $cnt;
	}

	/**
	 * @param $itemId
	 *
	 * @return mixed
	 */
	public function getCountReceiveItemHistory($itemId)
	{
		$cntItemId = ( $this->getCountReceivedItem($itemId) + 1 );
		return $cntItemId;
	}

	/**
	 * Setup Printed
	 */
	public function setPrinted()
	{
		return $this->setAttribute('printed',1);
	}

	/**
	 * Mendapatkan Total Qty (yard) yang diterima.
	 * @return mixed
	 */
	public function getTotalQtyReceived()
	{
		return $this->qtyreceived;
	}

	/**
	 * Mendapatkan Total Roll Yang sudah diterima
	 * @return mixed
	 */
	public function getTotalRollReceived()
	{
		return $this->qtyrollreceived;
	}

	public function getReceiveBy()
	{
		return $this->receiveby_id;
	}

}

 
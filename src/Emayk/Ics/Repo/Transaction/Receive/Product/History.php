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

	public $appends = [
		'nomorsuratjalan',
	];

	public function getNomorsuratjalanAttribute()
	{
		return $this->attributes[ 'nomorsuratjalan' ] = $this->suratjalan->nomor;
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
	 * @param null $message
	 *
	 * @return \Illuminate\Database\Eloquent\Model|static
	 */
	public function createRecord($qty, $updatedby_id, $item_id, $productId, $qtyroll,
	                             $sj_id,
	                             $receivedate,
	                             $message = null)
	{
		$username = $this->getUserFullname();
		$message  = ( is_null($message) )
			? '[ ' . $username . ' ] terima barang '
			: '[ ' . $username . ' ] ' . $message;
		$now      = Carbon::create();

		return $this->create([
			"qty"          => $qty,
			"qtyroll"      => $qtyroll,
			"product_id"   => $productId,
			"message"      => $message,
			"created_at"   => $now,
			"updated_at"   => $now,
			"updatedby_id" => $updatedby_id,
			"receiveby_id" => $updatedby_id,
			"receivedate"  => $receivedate,
			"sj_id"        => $sj_id,
			"item_id"      => $item_id

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


	public function product()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Factory\Product\Eloquent', 'product_id');
	}

	public function updateby()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Factory\User\Eloquent', 'updatedby_id');
	}

	public function receiveby()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Factory\User\Eloquent', 'receiveby_id');
	}

	public function suratjalan()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Transaction\Receive\Product\Suratjalan', 'sj_id');
	}

	public function item()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Transaction\Receive\Product\Item\Model', 'item_id');
	}

	public function getItemreceive()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Transaction\Receive\Product\Item\Model', 'item_id');
	}

	public function scopeCreateToday($q)
	{
		$today = date('Y-m-d');
		return $q->whereReceivedate($today);
//		return $q->where('receivedate', "LIKE", "%$date%");
	}

}

 
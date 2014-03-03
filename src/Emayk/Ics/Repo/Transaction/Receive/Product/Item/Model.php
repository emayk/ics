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

namespace Emayk\Ics\Repo\Transaction\Receive\Product\Item;

use Emayk\Ics\Models\BaseModel;
use Emayk\Ics\Repo\Transaction\Receive\Product\History;

/**
 * Class Model
 *
 * @package Emayk\Ics\Repo\Transaction\Receive\Product\Item
 */
class Model extends BaseModel
{
	/**
	 * @var string
	 */
	protected $table = 'trans_receive_product_items';
	/**
	 * @var array
	 */
	protected $guarded = [];
	/**
	 * @var array
	 */
	protected $rules = [];
	/**
	 * @var array
	 */
	public $appends = [
		'qtyelapse', "totalrollreceived", "productname","totalreceiveditem"

	];
	/**
	 * @var array
	 */
	public $hidden = [
		'receive',
		'product'
	];

	/**
	 * @return mixed
	 */
	public function getTotalrollreceivedAttribute()
	{
		return $this->attributes[ "totalrollreceived" ] = $this->receive->totalrollreceived;
	}
	public function getTotalreceiveditemAttribute()
	{
		return $this->attributes[ "totalreceiveditem" ] = $this->receive->totalreceiveditem;
	}

	/**
	 * @return mixed
	 */
	public function getProductnameAttribute()
	{
		return $this->attributes[ 'productname' ] = $this->product->name;
	}

	/**
	 * Membuat Record Item Terima Barang
	 *
	 * @param      $receiveId
	 * @param      $productId
	 * @param      $qtyorder
	 *
	 * @param      $trxnumber
	 * @param      $sj_id
	 * @param bool $created
	 *
	 * @return \Illuminate\Database\Eloquent\Model|static
	 */
	public function createRecord($receiveId,
	                             $productId,
	                             $qtyorder,
	                             $trxnumber,
	                             $sj_id, // Surat Jalan
	                             $created = true)
	{
		$record = [
			"receiveid"    => $receiveId,
			"product_id"   => $productId,
//			"sj_id"      => $sj_id,
			/*Qty Yang diterima*/
			/**
			 * Akan selalu direset 0
			 */
			"qty"          => 0,
			"qtyroll"      => 0,
			"qtyreceived"  => 0,
			"rollreceived" => 0,
			'qtyorder'     => $qtyorder,
			"desc"         => '',
			"status"       => 1, //belum diproses
			"trxnumber"    => $trxnumber
//			"created_at",
//			"updated_at",
		];
		return ( $created ) ? $this->create($record) : $record;
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function product()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Factory\Product\Eloquent',
			'product_id');
	}

	/**
	 * @return mixed
	 */
	public function getQtyelapseAttribute()
	{
		$qty           = $this->qtyreceived; // Jumlah yang sudah diterima
		$qtyPo         = $this->qtyorder;
		$calculasiSisa = ( $qtyPo - $qty );

		return $this->attributes[ 'qtyelapse' ] = $calculasiSisa;
	}


	/**
	 * Mendapatkan History
	 *
	 * @return History
	 */
	public function getHistory()
	{
		return new History();
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function receive()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Transaction\Receive\Product\Model', 'receiveid');
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function getStatus()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Factory\Transaction\Status\Eloquent', 'status');
	}

//	public function suratjalan()
//	{
//		return $this->belongsTo('\Emayk\Ics\Repo\Factory\Transaction\Status\Eloquent', 'status');
//	}

	public function oSuratJalan()
	{
		return new \Emayk\Ics\Repo\Transaction\Receive\Product\Suratjalan();
	}


	public function history(){
		return $this->hasMany('\Emayk\Ics\Repo\Transaction\Receive\Product\History','item_id');
	}
}

 
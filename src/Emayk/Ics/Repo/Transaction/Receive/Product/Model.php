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

use Emayk\Ics\Models\BaseModel;

class Model extends BaseModel
{
	protected $guarded = array();
	/**
	 * @var string
	 */
	protected $table = 'trans_receive_product';

	/**
	 * Kolom Transaksi
	 *
	 * @var string
	 */
	protected $columnTrx = 'trxnumber';
	/**
	 * @var array
	 */
	public static $rules = array();
	public $dates = [
		'podate',
		'receivedate'
	];
	public $appends = ['podate', 'contact', 'supplier', 'warehouse', "ponumber"];

	/**
	 * No PO
	 *
	 * @return mixed
	 */
	public function getPonumberAttribute()
	{
		return $this->order->trxnumber;
	}

	/**
	 * Nama Gudang
	 *
	 * @return string
	 */
	public function getWarehouseAttribute()
	{
		return $this->order->warehouse->name;
	}

	/**
	 * Nama Kontak
	 *
	 * @return string
	 */
	public function getContactAttribute()
	{
		return $this->order->contact->name;
	}

	/**
	 * Nama Supplier
	 *
	 * @return string
	 */
	public function getSupplierAttribute()
	{
		return $this->order->supplier->name;
	}

	public function getPodateAttribute()
	{
		return $this->order->created_at;
	}

	/**
	 * Relasi Order
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function order()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Transaction\Purchase\Order\Eloquent', 'order_id');
	}

	/**
	 * Relasi Item
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function item()
	{
		return $this->hasMany('\Emayk\Ics\Repo\Transaction\Receive\Product\Item\Model', 'receiveid');
	}

	/**
	 * Membuat Record Receive Good
	 *
	 * @param      $orderId
	 * @param      $totalorderitem
	 * @param      $trxnumber
	 * @param bool $created true untuk membuat record ke db
	 *
	 * @internal param $totalitem
	 * @return array|\Illuminate\Database\Eloquent\Model|static
	 */
	public function createRecord($orderId,
	                             $totalorderitem,
	                             $trxnumber, $created = true
	)
	{
		$record = [
			"totalorderitem"    => $totalorderitem,
			"totalreceiveditem" => 0,
			"totalrollreceived" => 0,
			"trxnumber"         => $trxnumber,
			"order_id"          => $orderId
		];
		return ( $created ) ? $this->create($record) : $record;

	}

	/**
	 * Object Item
	 *
	 * @return Item\Model
	 */
	public function oItem()
	{
		return new Item\Model();
	}

	public function oHistory()
	{
		return new History();
	}


	public function getColumnTrx()
	{
		return $this->columnTrx;
	}
}

 
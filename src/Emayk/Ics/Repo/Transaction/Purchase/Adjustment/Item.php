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


namespace Emayk\Ics\Repo\Transaction\Purchase\Adjustment;


use Carbon\Carbon;
use Emayk\Ics\Models\BaseModel;

/**
 * Class Item
 *
 * @package Emayk\Ics\Repo\Transaction\Purchase\Adjustment
 */
class Item extends BaseModel
{
	/**
	 * @var string
	 */
	protected $table = 'trans_pr_adjustment_item';
	/**
	 * @var array
	 */
	protected $guarded = array();
	protected $appends = [];
	protected $with = [
		'contact',
		'supplier',
		'product',
		'warehouse',
		'currency',
		'paymenttype',
		'taxtype'
	];

	public function getSupnameAttribute()
	{
		return ( $this->supplier()->count() == 0 ) ? null : $this->supplier->pluck('name');
	}

	public function getProdAttribute()
	{
		return ( $this->product()->count() == 0 ) ? null : $this->product->toArray();
	}

	public function hasSupplier()
	{

		return ( $this->supplier()->count() > 0 ) ? true : false;
	}


	/**
	 * Membuat Record Item Adjustment Pembelian
	 *
	 * @param                                                            $productId int Product Id
	 * @param                                                            $qty       Qty PR
	 * @param                                                            $adjprId   Adjustment Id
	 * @param                                                            $trxnumber Transaksi Adjustment
	 * @param                                                            $prItemId  Id Item Pr
	 *
	 * @param int                                                        $userId    UserId
	 *
	 * @return \Illuminate\Database\Eloquent\Model|static
	 */
	public function createNewRecord($productId,
	                                $qty, $adjprId,
	                                $trxnumber,
	                                $prItemId, $userId = 1
	)
	{
		$now     = Carbon::create();
		$newitem = $this->create([
			"product_id"      => $productId,
			"qty"             => $qty,
			"qtypr"           => $qty,
			"adjprid"         => $adjprId,
			"updated_at"      => $now,
			"created_at"      => $now,
			"supplier_id"     => 0,
			"cp_id"           => 0,
			"warehouse_id"    => 0,
			"paymenttype_id"  => 0,
			"tax_id"          => 0,
			"curr_id"         => 0,
			"createby_id"     => $userId,
			"lastupdateby_id" => $userId,
			"trxnumber"       => $trxnumber,
			"delivery_at"     => $now,
			"credit"          => 0,
			"rate"            => 1, //diset 1 untuk default
			"uuid"            => uniqid(str_replace('-', '-', $trxnumber)),
			"pritem"          => $prItemId,
			"price"           => 0,
			"status"          => 1,
		]);
		return $newitem;
	}

	/**
	 * Mendapatkan Status New
	 *
	 * @param $q
	 *
	 * @return mixed
	 */
	public function scopeNew($q)
	{
		return $q->whereStatus(1);
	}

	/**
	 * Mendapatkan Item berdasarkan Adjust Id yang diberikan
	 *
	 * @param $query
	 * @param $adjustid
	 *
	 * @return mixed
	 */
	public function scopeOfAdjustid($query, $adjustid)
	{
		return $query->whereAdjprid($adjustid);
	}

	/**
	 * Mendapatkan Item Baru dari AdjId yang diberikan
	 *
	 * @param $adjustId
	 *
	 * @return mixed
	 */
	public function getNewFindByAdjId($adjustId)
	{
		return $this->New()->OfAdjustid($adjustId);
	}

	public function getFindByAdjId($adjustId)
	{
		return $this->OfAdjustid($adjustId);
	}


	/**
	 * Menentukan Item dengan Adjust Id memiliki item Baru
	 *
	 * @param $adjustId
	 *
	 * @return bool
	 */
	public function hasNewFromAdjustId($adjustId)
	{
		return ( $this->getNewFindByAdjId($adjustId)->count() > 0 );
	}


	public function hasNew()
	{
		return ( $this->countNew() > 0 );
	}

	public function countNew()
	{
		return $this->New()->count();
	}


	public function scopeOfadjust($query, $adjustmentId)
	{
		return $query->whereAdjprid($adjustmentId);
	}

	public function product()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Item\Product', 'product_id');
	}

	public function supplier()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Item\Supplier', 'supplier_id');
	}

	public function contact()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Item\Contact', 'cp_id');
	}

	public function warehouse()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Item\Warehouse', 'warehouse_id');
	}

	public function currency()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Item\Currency', 'curr_id');
	}

	public function paymenttype()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Item\PaymentType', 'paymenttype_id');
	}

	public function adjustment()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Eloquent', 'adjprid');
	}

	public function requestitems()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Eloquent', 'paymenttype_id');
	}

	public function taxtype()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Factory\Tax\Type\Eloquent', 'tax_id');
	}

	public function getContact()
	{
		$supplierId = $this->supplier_id;
		if (!$supplierId > 0) return null;

		$contact = $this->oContact();
		return $contact->getContactFromFactorySupplier($supplierId);
	}

	public function oContact()
	{
		return new Item\Contact();
	}

	public function oSupplier()
	{
		return new Item\Supplier();
	}

	public function oWarehouse()
	{
		return new Item\Warehouse();
	}

	public function oCurrency()
	{
		return new Item\Currency();
	}

	public function oPaymentType()
	{
		return new Item\PaymentType();
	}

	public function oTaxType(){
		return new \Emayk\Ics\Repo\Factory\Tax\Type\Eloquent();
	}
}

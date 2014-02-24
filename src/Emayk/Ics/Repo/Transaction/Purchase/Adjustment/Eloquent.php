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
use Illuminate\Support\Facades\Auth;
use \Log;

/**
 * Class Eloquent
 *
 * @package Emayk\Ics\Repo\Transaction\Purchase\Adjustment
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
	protected $table = 'trans_pr_adjustment';
	/**
	 * @var array
	 */
	public static $rules = array();
	/**
	 * @var array
	 */
	public $hidden = ['price'];
	/**
	 * @var array
	 */
	public $appends = [
		'totalitems',
	];

	/**
	 * @var array
	 */
	protected $with = [
		'request',
//		'items'
	];

	/**
	 * @return mixed
	 */
	public function getTotalitemsAttribute()
	{
		return $this->items()->count();
	}

	/**
	 * @var array
	 */
	protected $prefix = 'Adj-';

	/**
	 * Mendapatkan Transaksi Number
	 *
	 * @return mixed
	 */
	protected function getNumber()
	{
		return $this->trxnumber;
	}

	/**
	 * @return Item\Supplier
	 */
	public function getSupplier()
	{
		return new Item\Supplier();
	}

	/**
	 * @return Item\Contact
	 */
	public function getContact()
	{
		return new Item\Contact();
	}

	/**
	 * @return Item\Product
	 */
	public function getProduct()
	{
		return new Item\Product();
	}

	/**
	 * @return Item\Warehouse
	 */
	public function getWarehouse()
	{
		return new Item\Warehouse();
	}

	/**
	 * Mendapatkan Semua Adj Pengajuan Pembelian yang berstatus 1
	 */
	public function getAllnew()
	{
		$this->getAllnewPrAndAdded();
		return $this->New();
	}


	/**
	 * Mendapatkan Semua PR baru dan Menambahkan pada Adjustment
	 */
	public function  getAllnewPrAndAdded()
	{
		$pr       = $this->getPr();
		$getnewPr = $pr->getNew();
		$itemPr   = $pr->getItem();
		foreach ($getnewPr->get() as $pr) {
			$newadj   = $this->createRecord($pr->id, $pr->trxnumber);
			$itemsX   = $itemPr->getNewFindByPrId($pr->id);
			$adjItem  = $this->getItem();
			$newadjId = $newadj->id;
			foreach ($itemsX->get() as $item) {
				$adjItem->createNewRecord(
					$item->product_id, $item->qty,
					$newadjId,
					$newadj->trxnumber,
					$item->id,
					$this->getUid()
				);
				$item->status = 5;
				$item->save();
			}
			$pr->status = 5;
			$pr->save();
		}

	}

	/**
	 * @param $query
	 *
	 * @return mixed
	 */
	public function scopeNew($query)
	{
		return $query->whereStatus(1);
	}


	/**
	 * @param $prid
	 * @param $trxnumber
	 *
	 * @return \Illuminate\Database\Eloquent\Model|static
	 */
	public function createRecord($prid, $trxnumber)
	{
		$uid  = $this->getUid();
		$now  = Carbon::create();
		$uuid = uniqid(str_replace('-', '_', $this->getPrefix() . $trxnumber));

		return $this->create([
			'trxnumber'       => $this->getPrefix() . $trxnumber,
			'prid'            => $prid,
//			'supplier_id'     => 0,
//			'tax_id'          => 0,
//			'warehouse_id'    => 0,
//			'paymenttype_id'  => 0,
//			'cp_id'           => 0,
//			'delivery_at'     => $now,
//			'credit'          => 0,
//			'rate'            => 1, //set ke rupiah dengan kurs 1.0
			'uuid'            => $uuid,
			'status'          => 1,
			'createby_id'     => $uid,
			'lastupdateby_id' => $uid
		]);

	}

	/**
	 * Mendapatkan Prefix yang digunakan untuk set ke trxnumber
	 *
	 * @return array
	 */
	public function getPrefix()
	{
		return $this->prefix;
	}

	/**
	 * Menentukana Apakah memiliki Pembelian baru
	 *
	 * @return bool
	 */
	public function hasNewPr()
	{
		return ( $this->getPr()->New()->count() > 0 );
	}

	/**
	 * @return \Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Request
	 */
	public function getPr()
	{
		return new Request();
	}

	/**
	 * Mendapatkan Item Adj
	 *
	 * @return \Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Item
	 */
	public function getItem()
	{
		return new Item();
	}

	/**
	 * Mendapatkan Item Adjustment
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function items()
	{
		return $this->hasMany('\Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Item', 'adjprid');
	}

	/**
	 * Mendapatkan Request Purchase
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function request()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Transaction\Purchase\Request\Model', 'prid');
	}


	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function approval(){
		return $this->hasMany('\Emayk\Ics\Repo\Transaction\Purchase\Approval\Model', 'adj_id');
	}

	/**
	 * @return bool
	 */
	public function hasNewItems()
	{
		return ( $this->getItem()->hasNew() );
	}

	/**
	 *
	 */
	public function getNewItemWithId()
	{
//		return $this->getItem()->
	}


	/**
	 * @return Item\Approval
	 */
	public function oApproval()
	{
		return new Item\Approval();
	}

	/**
	 * @return Item\ApprovalItem
	 */
	public function oApprovalItem()
	{
		return new Item\ApprovalItem();
	}
}

 
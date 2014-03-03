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


/**
 * Order ==> Receive Product
 */
namespace Emayk\Ics\Repo\Transaction\Purchase\Order;

use Emayk\Ics\Models\BaseModel;

/**
 * Class Eloquent
 *
 * @package Emayk\Ics\Repo\Transaction\Purchase\Order
 */
class Eloquent extends BaseModel
{
	/**
	 * @var string
	 */
	protected $prefix = ['ppn' => 'PpnPO-', 'nonppn' => 'NonPPN-PO-'];
	/**
	 * @var array
	 */
	protected $guarded = array();
	/**
	 * @var string
	 */
	protected $table = 'trans_orders';
	/**
	 * @var array
	 */
	public static $rules = array();

	public $appends = ['totalitem'];

	public function getTotalitemAttribute()
	{
		return $this->attributes[ 'totalitem' ] = $this->item()->count();
	}


	/**
	 * Set Trx Number
	 */
	public function setTrxnumberAttribute($value)
	{
		/*@todo : Contoh Logging*/
//		\DB::table('sys_log')->insert(['message' => 'Ada Yang Rubah TrxNumber Order dengan value '.$value]);
		return $this->attributes[ 'trxnumber' ] = str_replace('_', '', $value);
	}

	/**
	 * Item Order
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function item()
	{
		return $this->hasMany('\Emayk\Ics\Repo\Transaction\Purchase\Order\Item\Eloquent', 'order_id');
	}

	public function warehouse()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Factory\Warehouse\Eloquent', 'warehouse_id');
	}

	public function payment()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Factory\Payment\Type\Eloquent', 'paymenttype_id');
	}

	public function contact()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Factory\Contact\Eloquent', 'cp_id');
	}


	public function currency()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Factory\Currency\Eloquent', 'curr_id');
	}

	public function supplier()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Factory\Supplier\Eloquent', 'supplier_id');
	}

	public function tax()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Factory\Tax\Type\Eloquent', 'tax_id');
	}


	/**
	 * Mendapatkan relasi ke History
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function history()
	{
		return $this->hasMany('\Emayk\Ics\Repo\Transaction\Purchase\Order\Item\Eloquent', 'order_id');
	}

	/**
	 * Mendapatkan Object Approval
	 *
	 * @return \Emayk\Ics\Repo\Transaction\Purchase\Approval\Model
	 */
	public function oApproval()
	{
		return new \Emayk\Ics\Repo\Transaction\Purchase\Approval\Model();
	}

	/**
	 * Mendapatkan Object Approval item
	 *
	 * @return \Emayk\Ics\Repo\Transaction\Purchase\Approval\Items
	 */
	public function oApprovalItem()
	{
		return new \Emayk\Ics\Repo\Transaction\Purchase\Approval\Items();
	}

	/**
	 * Mendapatkan Object Adjustment Item
	 *
	 * @return \Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Item
	 */
	public function oAdjustmentItem()
	{
		return new \Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Item();
	}

	/**
	 * Mendapatkan Object Queue
	 *
	 * @return Queue
	 */
	public function oQueue()
	{
		return new Queue();
	}

	/**
	 * Memindahkan Approval ke Order
	 *
	 * @param $approvalId
	 *
	 * @return string
	 * @deprecated
	 * @since dev-23
	 */
	public function moveApprovalToOrder($approvalId)
	{
		/*Check record Approval status == 5 atau sudah diproses */
		$approval = $this->oApproval()->findOrFail($approvalId);
		/*Check apakah memiliki Item*/
		/**
		 * Check apakah tiap item memiliki Route yang sama ?
		 * - Ya, satukan No Document
		 * - Tidak , no po dibedakan
		 *
		 * Jika PPN , maka gunakan prefix ppn
		 * Jika NonPPn, gunakan prefix nonPpn
		 */
		if ($approval->hasItemProcessed()) {
			return 'Memilik Item - item yang sudah diproses';
		}
		$approval_item = $approval->item;
		$tmplistPO     = [];
		foreach ($approval_item as $item) {
			$tmplistPO[ ] = array(
				'route'            => $item->route,
				'approval_item_id' => $item->id,
			);
			/*Setup Status ApprovalItem(5) jika sudah dipindahkan ke OrderItem */
		};
		/*Setup Status Approval(5) jika sudah dipindahkan ke Order */

		/*Buat record Order item dari record approval */
		/* Pindahkan Item Approval ke Order Item*/
	}

	/**
	 * Apakah ada Queue baru
	 *
	 * @return bool
	 */
	public function hasNewQueue()
	{
		return ( $this->oQueue()->New()->count() > 0 );
	}

	/**
	 * Pemindahan data dari Order ke
	 * daftar Terima barang
	 */
	public function  moveOrderToReceiveGood()
	{
		/**
		 * Menentukan Record, Apakah akan dibuat Record atau Tidak
		 */
		$isCreateRecord = true;
		/**
		 * Cari PO yang sudah diprint dan Jumlah Cetak minimal 1x
		 * dan Masih berstatus Baru
		 */
		$orders         = $this->PrintedOrder()
			->CntPrintedOrder()
			->New();
		$newReceive     = $this->oReceiveProduct();
		$newReceiveItem = $newReceive->oItem();
		foreach ($orders->get() as $order) {
			$moveOrder        = $this->findOrFail($order->id);
			$Receivetrxnumber = $this->getPrefix()->receivegood() .
				$order->trxnumber;
			$receive          = $newReceive->createRecord(
				$order->id,
				$order->item()->count(),
				$Receivetrxnumber,
				$isCreateRecord
			);
			$items            = $order->item;
			foreach ($items as $item) {
				$receiveItem = $newReceiveItem->createRecord(
					$receive->id,
					$item->product_id,
					$item->qty,
					$Receivetrxnumber,
					$isCreateRecord
				);
				/**
				 * Set Status ItemOrder Yang diproses menjadi
				 * dari Baru menjadi Sudah Diproses
				 */
				$item->status = 5;
				$item->save();
			}
			/**
			 * Setup Status Order Menjadi Sudah Diproses
			 */
			$moveOrder->status = 5;
			$moveOrder->save();

		}
	}

	/**
	 * Mendapatkan Model Receive Product
	 *
	 * @return \Emayk\Ics\Repo\Transaction\Receive\Product\Model
	 */
	public function oReceiveProduct()
	{
		return new \Emayk\Ics\Repo\Transaction\Receive\Product\Model();
	}

	public function scopePrintedOrder($q)
	{
		return $q->where('printed', '>', 0);
	}

	/**
	 * Mendapatkan Records Baru
	 *
	 * @param $q
	 *
	 * @return mixed
	 */
	public function scopeNew($q)
	{
		return $q->where('status', '=', 1);
	}

	/**
	 * Mendapatkan Records Yang sudah diproses
	 *
	 * @param $q
	 *
	 * @return mixed
	 */
	public function scopeProcessed($q)
	{
		return $q->where('status', '=', 5);
	}

	/**
	 * Mendapatkan Records Order Yang sudah di Cetak
	 *
	 * @param $q
	 *
	 * @return mixed
	 */
	public function scopeCntPrintedOrder($q)
	{
		return $q->where('cntprint', '>', 0);
	}

	/**
	 * Mendapatkan Records Yang sudah dicetak lebih dari Jumlah yang ditentukan.
	 *
	 * @param $q
	 * @param $count
	 *
	 * @return mixed
	 */
	public function scopeCountGreatThanPrintOrder($q, $count)
	{
		return $q->where('cntprint', '>', $count);
	}

}

 
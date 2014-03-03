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


namespace Emayk\Ics\Repo\Transaction\Purchase\Order;


use Carbon\Carbon;
use Emayk\Ics\Models\BaseModel;

/**
 * @property mixed adjustmentitem
 * @property mixed apritem_id
 * @property mixed apr_id
 */
class Queue extends BaseModel
{
	protected $table = 'trans_order_queue';
	protected $guarded = [];


	public function approvalitem()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Transaction\Purchase\Approval\Items', 'apritem_id');
	}

	public function adjustmentitem()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Item', 'adjitem_id');
	}

	public function status()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Factory\Order\Status', 'status');
	}

	public function getAprItem()
	{
		return new \Emayk\Ics\Repo\Transaction\Purchase\Approval\Items();
	}

	/**
	 * Apakah Approval Item memiliki Queue baru
	 *
	 * @return bool
	 */
	public function hasNewApprovalItem()
	{
		return ( $this->getNewQueueFromApprovalItem()->count() > 0 );
	}

	/**
	 * Mendapatkan New Queue dari Approval Item yang sudah diapprove
	 *
	 * @return mixed
	 */
	public function getNewQueueFromApprovalItem()
	{
		return $this->getApprovedFromApprovalItem()->where('queue_id', '=', 0);
	}

	protected function getApprovedFromApprovalItem()
	{
		return $this->getAprItem()->Agree();
	}

	public function getIdsNewQueueApprovalItem()
	{
		return $this->getNewQueueFromApprovalItem()->lists('id');
	}

	public function oAdjustmentItem()
	{
		return new \Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Item();
	}

	public function createQueue($setStatus = true)
	{

		if (!$this->hasNewApprovalItem()) return array();
		/*Jika ada maka Queue dilakukan */
		$idAdjItems   = [];
		$itemApproval = $this->getAprItem();
		foreach ($this->getIdsNewQueueApprovalItem() as $iditem) {
			$itemAppr = $itemApproval->findOrFail($iditem);
			/**
			 * Adjustment Item
			 */
			$adjustmentItem      = $itemAppr->adjitem;
			$adjustmentItemRoute = $adjustmentItem->route;
			$adjustmentId        = $itemAppr->adj_id;
			$adjustmentItemId    = $adjustmentItem->id;

			$approvalId     = $itemAppr->apr_id;
			$approvalItemId = $itemAppr->id;

			$record = [
				'route'      => $adjustmentItemRoute,
				'adj_id'     => $adjustmentId,
				'adjitem_id' => $adjustmentItemId,
				'apr_id'     => $approvalId,
				'apritem_id' => $approvalItemId,
				'status'     => 1
			];
			$queue  = $this->create($record);
			/*setup status queue_id ke id $queue->id */
			if ($setStatus) {
				$itemAppr->queue_id = $queue->id;
				$itemAppr->save();
			}
			$idAdjItems[ ] = $queue;
		}
		return $idAdjItems;
	}

	public function scopeNew($q)
	{
		return $q->whereStatus(1);
	}

	public function getNew()
	{
		return $this->New();
	}

	/**
	 * Jumlah Queue Baru
	 *
	 * @return mixed
	 */
	public function countNew()
	{
		return ( $this->getNew()->count() );
	}

	/**
	 * Apakah ada Queue Baru ?
	 *
	 * @return bool
	 */
	public function hasNew()
	{
		return ( $this->countNew() > 0 );
	}

	/**
	 * Semua Yang sudah diproses
	 *
	 * @param $q
	 *
	 * @return mixed
	 */
	public function scopeProcessed($q)
	{
		return $q->whereStatus(5);
	}

	/**
	 * Object Eloquent Order
	 *
	 * @return Eloquent
	 */
	public function oOrder()
	{
		return new Eloquent();
	}

	/**
	 * Object Order Item
	 *
	 * @return Item\Eloquent
	 */
	public function oOrderItem()
	{
		return new Item\Eloquent();
	}

	public function deleteAllOrderAndItem()
	{
		$detailtable = \DB::table('trans_order_details');
		$detailId    = $detailtable->lists('id');
		foreach ($detailId as $id) {
			$detailtable->delete($id);
		}

		$order    = \DB::table('trans_orders');
		$orderIds = $order->lists('id');
//		$orderDelete = $order->delete($id)
//		return $orderIds;
		foreach ($orderIds as $idOrder) {
			$order->delete($idOrder);
		}
	}

	public function oApproval()
	{
		return new \Emayk\Ics\Repo\Transaction\Purchase\Approval\Model();
	}

	/**
	 * Pindahkan Queue ke Order
	 *
	 * @return array
	 */
	public function moveToOrder()
	{
		$unprocessedQueue = $this->whereStatus(1);
		/*Hanya akan dijalankan jika ada Queue Baru*/
		$countNewQueue = $unprocessedQueue->count();
		if ($countNewQueue > 0) {

			$newOrder     = $this->oOrder();
			$newOrderItem = $this->oOrderItem();
			$orders       = [];
			$newQueue     = $this->getNew();
			$routeUnique  = array_unique($unprocessedQueue->lists('route'));
			$queueIds     = [];
			foreach ($routeUnique as $route) {
				$totaldp      = 0;
				$totalpayment = 0;
				$countOrder   = 0;
				foreach ($newQueue->get() as $q) {
					/*Jadikan Satu Yang Routenya Sama*/
					if ($q->route == $route) {
						$queueIds [ ] = $q->id;
						$item         = $q->adjustmentitem;
						$ppnId        = $this->getPpnId();
						$taxid        = $item->tax_id;
						$prefixOrder  = ( $ppnId == $taxid )
							? $this->getPrefix()->getPpn()
							: $this->getPrefix()->getNonppn();
						$prefixOrder  = $prefixOrder . $item->route;
						$totaldp      = $totaldp + $item->dp;
						$totalpayment = $totalpayment + $item->subtotal;

						$order = [
							'type_id'         => 1,
							'trxnumber'       => $prefixOrder,
							'supplier_id'     => $item->supplier_id,
							'cp_id'           => $item->cp_id,
							'tax_id'          => $taxid,
							'curr_id'         => $item->curr_id,
							'paymenttype_id'  => $item->paymenttype_id,
							'warehouse_id'    => $item->warehouse_id,
							'delivery_at'     => $item->delivery_at,
							'approve_id'      => $q->apr_id,
							'credit'          => $item->credit,
							'rate'            => $item->rate,
							'uuid'            => $this->createUuid($item->trxnumber),
							'status'          => 1,
							'printed'         => 0,
							'cntprint'        => 0,
							'totaldp'         => $totaldp,
							'createby_id'     => $this->getUid(),
							'lastupdateby_id' => $this->getUid(),
							'marktext'        => $item->route,
							'totalpayment' => $totalpayment
						];

						$orderitem[ ] = [
							'product_id'      => $item->product_id,
							'qty'             => $item->qty,
							'price'           => $item->price,
							'apritem_id'      => $q->apritem_id,
							'uuid'            => $this->createUuid($item->trxnumber),
							'createby_id'     => $this->getUid(),
							'lastupdateby_id' => $this->getUid(),
							'dp'              => $item->dp,
							'subtotal'        => $item->subtotal,
						];

						$countOrder++;
					}

				}
				$orders[ ] = [
					'order' => $order,
					'items' => $orderitem
				];
			}

			$createRecord = true;
			if ($createRecord) {

				foreach ($orders as $k => $o) {
					$new_order = $newOrder->create($o[ 'order' ]);
					foreach ($o[ 'items' ] as $item) {
						$item           = array_merge($item, ['order_id' => $new_order->id]);
						$new_order_item = $newOrderItem->create($item);

					}
				}

				/*Jika Sudah Created Item Set Status untuk Approval dan Queue menjadi 5*/
				if (count($queueIds) > 0) {
					foreach ($queueIds as $id) {
						$queue        = $this->find($id);
						$approvalitem = $queue->approvalitem;
						\Log::info($approvalitem->queue_id);
						if ($approvalitem->queue_status == 1) {
							$approvalitem->queue_status = 5;
							$approvalitem->save();
						};
						$queue->status = 5; // queue diset status sudah diproses supaya tidak diproses lagi.
						$queue->save();
					}
				}

			}

		}
	}


	/**
	 * Pindahkan Queue ke Order
	 *
	 * @return array
	 */
	public function moveToOrderOld()
	{
		$unprocessedQueue = $this->getNew();
		/*Hanya akan dijalankan jika ada Queue Baru*/
		if ($unprocessedQueue->count() > 0) {
			$newOrder     = $this->oOrder();
			$newOrderItem = $this->oOrderItem();
			$cnt          = 0;
			$orders       = [];

			foreach ($unprocessedQueue->get() as $queue) {
				$cnt++;
				/*check route adjustment*/
				$route = $queue->route; //$queue->adjustmentitem->route;
				/*cari adjustment Item */
				$adjustmentItemWithRoute = $queue->adjustmentitem->whereRoute($route); //->count();

				$totaldp = 0;
				/*total adjustment item*/
				$countItem = $adjustmentItemWithRoute->count();
				$cntItem   = 0;

				$orderitem = [];
				$order     = [];

				foreach ($adjustmentItemWithRoute->get() as $item) {
					$cntItem++;
					$totaldp       = $totaldp + $item->dp;
					$orderitem [ ] = [
						'product_id'      => $item->product_id, 'qty' => $item->qty,
						'price'           => $item->price, 'apritem_id' => $queue->apritem_id,
						/*'order_id' => 0, //diset setelah object create*/
						'uuid'            => $this->createUuid($item->trxnumber),
						'createby_id'     => $this->getUid(),
						'lastupdateby_id' => $this->getUid(), 'dp' => $item->dp,
						'subtotal'        => $item->subtotal
					];

					/*Create Order*/
					$order = [
						'type_id'         => 1, 'supplier_id' => $item->supplier_id,
						'cp_id'           => $item->cp_id, 'tax_id' => $item->tax_id,
						'curr_id'         => $item->curr_id, 'paymenttype_id' => $item->paymenttype_id,
						'warehouse_id'    => $item->warehouse_id, 'delivery_at' => $item->delivery_at,
						'approve_id'      => $queue->apr_id, 'credit' => $item->credit,
						'rate'            => $item->rate, 'uuid' => $this->createUuid($item->trxnumber),
						'status'          => 1, 'printed' => 0, 'cntprint' => 1,
						'totaldp'         => $totaldp, 'createby_id' => $this->getUid(),
						'lastupdateby_id' => $this->getUid(), 'marktext' => $item->route
					];
				}

//				$orders[ ] = ['items' => $orderitem, 'order' => $order];
			}
		}
	}


	public function adjustmentitemroute()
	{
		return $this->hasMany('\Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Item', 'route');
	}

	public function setProcessed()
	{
		return $this->attributes[ 'status' ] = 5;
	}

	/**
	 * Mendapatkan Unique Array
	 *
	 * @param array $routes
	 *
	 * @return array
	 */
	public function getUniqueRoute(array $routes)
	{
		return array_unique($routes);
	}

	/**
	 * Membuat Record Queue
	 *
	 * @param     $aprid
	 * @param     $apritem
	 * @param     $adjid
	 * @param     $adjitemId
	 * @param     $route
	 * @param int $status
	 *
	 * @return \Illuminate\Database\Eloquent\Model|static
	 */
	public function createRecord($aprid, $apritem, $adjid, $adjitemId, $route, $status = 1)
	{
		$now = Carbon::create();
		return $this->create([
			"apr_id"     => $aprid,
			"apritem_id" => $apritem,
			"adj_id"     => $adjid,
			"adjitem_id" => $adjitemId,
			"status"     => $status,
			"route"      => $route,
			"created_at" => $now,
			"updated_at" => $now
		]);
	}

}

 
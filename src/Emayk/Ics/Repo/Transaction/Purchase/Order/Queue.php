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


use Emayk\Ics\Models\BaseModel;

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

	public function scopeProcessed($q)
	{
		return $q->whereStatus(5);
	}

	public function oOrder()
	{
		return new Eloquent();
	}

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

	public function moveToOrder()
	{
		$unprocessedQueue = $this->New();
		if ($unprocessedQueue->count() > 0) {
			$newOrder     = $this->oOrder();
			$newOrderItem = $this->oOrderItem();
			$cnt          = 0;
			$orders       = [];

			return $unprocessedQueue->get();//->toArray();
			foreach ($unprocessedQueue->get() as $queue) {
				$cnt++;
				/**
				 * Ambil Object Approval Item  Id
				 */

				/*check route adjustment*/
				$route                   = $queue->route; //$queue->adjustmentitem->route;
				$adjustmentItemWithRoute = $queue->adjustmentitem->whereRoute($route); //->count();

				$totaldp   = 0;
				$countItem = $adjustmentItemWithRoute->count();
				$cntItem   = 0;

				$orderitem = [];
				$order     = [];

				foreach ($adjustmentItemWithRoute->get() as $item) {
					$cntItem++;
					$totaldp       = $totaldp + $item->dp;
					$orderitem [ ] = [
						'product_id'      => $item->product_id,
						'qty'             => $item->qty,
						'price'           => $item->price,
						'apritem_id'      => $queue->apritem_id,
//						'order_id' => 0, //diset setelah object create
						'uuid'            => $this->createUuid($item->trxnumber),
						'createby_id'     => $this->getUid(),
						'lastupdateby_id' => $this->getUid(),
						'dp'              => $item->dp,
						'subtotal'        => $item->subtotal,

					];

					/*Create Order*/
					$order = [
						'type_id'         => 1,
						'supplier_id'     => $item->supplier_id,
						'cp_id'           => $item->cp_id,
						'tax_id'          => $item->tax_id,
						'curr_id'         => $item->curr_id,
						'paymenttype_id'  => $item->paymenttype_id,
						'warehouse_id'    => $item->warehouse_id,
						'delivery_at'     => $item->delivery_at,
						'approve_id'      => $queue->apr_id,
						'credit'          => $item->credit,
						'rate'            => $item->rate,
						'uuid'            => $this->createUuid($item->trxnumber),
						'status'          => 1,
						'printed'         => 0,
						'cntprint'        => 1,
						'totaldp'         => $totaldp,
						'createby_id'     => $this->getUid(),
						'lastupdateby_id' => $this->getUid(),
						'marktext'        => $item->route
					];
				}

				$orders[ ] = ['items' => $orderitem, 'order' => $order];
//				$orders[]['order'] = $order;
				/*Apakah item Approval sudah di approve*/

//				\Log::info('order',[$order]);
//				\Log::info('orderitem',[$orderitem]);

//				$recordOrder = $newOrder->create($order);
//				$id = rand(0, 100);
//				$newOrderId = $recordOrder->id;
//
//				foreach ($orderitem as $o) {
//					$newitem = array_merge($o, array('order_id' => $id));
//				}

//				foreach ($orderitem as $o) {
//					$newitem = array_merge($o, array('order_id' => $newOrderId));
//					$newOrderItem->create($newitem);
//				}

			}


			return $orders;
//			return $newitem;
		}
	}


	public function adjustmentitemroute()
	{
		return $this->hasMany('\Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Item', 'route');
	}
}

 
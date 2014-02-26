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
	protected $table = 'trans_orders';
	public static $rules = array();

	/**
	 * Item Order
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function item()
	{
		return $this->hasMany('\Emayk\Ics\Repo\Transaction\Purchase\Order\Item\Eloquent', 'order_id');
	}

	public function history()
	{
		return $this->hasMany('\Emayk\Ics\Repo\Transaction\Purchase\Order\Item\Eloquent', 'order_id');
	}

	public function oApproval()
	{
		return new \Emayk\Ics\Repo\Transaction\Purchase\Approval\Model();
	}

	public function oApprovalItem()
	{
		return new \Emayk\Ics\Repo\Transaction\Purchase\Approval\Items();
	}

	public function oAdjustmentItem()
	{
		return new \Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Item();
	}

	public function oQueue(){
		return new Queue();
	}

	public function getNewQueueMoveToOrder(){
	$queue = $this->oQueue();
		/**
		 * Ambil Queue Yang belum diproses
		 */

	}

	public function moveApprovalToOrder($approvalId)
	{
		/*Check record Approval status == 5 atau sudah diproses */
		$approval = $this->oApproval()->findOrFail($approvalId);

//		$recordApproval = $approval->findOrFail($approvalId);

		/*Check apakah memiliki Item*/
		/**
		 * Check apakah tiap item memiliki Route yang sama ?
		 * - Ya, satukan No Document
		 * - Tidak , no po dibedakan
		 *
		 * Jika PPN , maka gunakan prefix ppn
		 * Jika NonPPn, gunakan prefix nonPpn
		 */
		if ($approval->hasItemProcessed()){
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


	public function createRecordFromApproval( \Emayk\Ics\Repo\Transaction\Purchase\Approval\Items $idApprovalItem)
	{
//		$itemapproval = $this->oApprovalItem();

	}
}

 
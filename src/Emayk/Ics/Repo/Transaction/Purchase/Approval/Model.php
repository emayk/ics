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


namespace Emayk\Ics\Repo\Transaction\Purchase\Approval;

use Emayk\Ics\Models\BaseModel;

class Model extends BaseModel
{
	protected $table = 'trans_pr_approve';
	protected $fillable = ['trxnumber', 'status'];

	public function getNewPr()
	{
		$pr = $this->getPr();
		return $pr->whereStatus(1);
	}

	protected function getPr()
	{
		return new \Emayk\Ics\Repo\Transaction\Purchase\Request\Model();
	}

	protected function getPritem()
	{
		return new \Emayk\Ics\Repo\Transaction\Purchase\Request\Item();
	}

	public function getPrItemAndSetupApprove($prid)
	{
		$item = $this->getPritem();
		/*get all pr item berdasarkan pr id*/
		$items = $item->wherePrid($prid);
	}

	public function createNewApproveRecordFromPr($prid, $prnumber)
	{
		/*checking dl*/
		$pr = $this->getPr()->findOrFail($prid);
		if ($pr->trxnumber != $prnumber) {
			throw new \Exception( 'Purchase Request Number not Matchs' );
		}
		$pritem    = $this->getPritem()->wherePrid($prid);
		$haveitems = ( $pritem->count() > 0 );
		if ($haveitems) {
			$newapprove = $this->create(
				[
					'trxnumber' => 'APR-' . $prnumber,
					'status'    => 1
				]
			);
			$newid      = $newapprove->id;
			foreach ($pritem->get() as $item) {
				$newitem = $this->getItems()->create(
					[
						'product_id' => $item->product_id,
						'qty'        => $item->qty,
						'status'     => $item->status,
						'supplierid' => 0,
						'contactid'  => 0,
						'price'      => 0,
						'aprid'      => $newid, // id approve
					]
				);
			}

		}
		return $newapprove;
	}

	public function getItems()
	{
		return new Items();
	}

	public function items()
	{
		return $this->hasMany('\Emayk\Ics\Repo\Transaction\Purchase\Approval\Items','aprid');
	}

}

 
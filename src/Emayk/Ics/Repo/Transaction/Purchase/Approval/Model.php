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
use Emayk\Ics\Repo\Transaction\Purchase\Request\Item as Pritem;

class Model extends BaseModel
{
	protected $table = 'trans_pr_approve';
	protected $fillable = ['trxnumber', 'status'];
	protected $prefix = 'APR-';
	protected static $idStatus = ['agree' => 2, 'denied' => 3, 'new' => [1, 4]];


	/**
	 * Mendapatkan Semua PR Baru
	 *
	 * @return mixed
	 */
	public function getNewPr()
	{
		$pr = $this->getPr();
		return $pr->whereStatus(1);
	}

	/**
	 * Mendapatkan Object PR
	 *
	 * @return \Emayk\Ics\Repo\Transaction\Purchase\Request\Model
	 */
	protected function getPr()
	{
		return new \Emayk\Ics\Repo\Transaction\Purchase\Request\Model();
	}

	/**
	 * Mendapatkan Object PR item tanpa relasi
	 *
	 * @return Pritem
	 */
	protected function getPritem()
	{
		return new Pritem();
	}

	/**
	 * Mendapatkan Pr Item dan Setup Sudah diproses
	 *
	 * @param $prid
	 *
	 * @return mixed
	 */
//	public function getPrItemAndSetupApprove($prid)
	public function getPrItemAndSetStatus($prid)
	{
		$item = $this->getPritem();
		/*get all pr item berdasarkan pr id*/
		$items = $item->wherePrid($prid);
		foreach ($items->get() as $item) {
			$item->status = 5;
			$item->save();
		}
		return $items;
	}

	/**
	 * Membuat Record Approve PR dari PR
	 *
	 * @param $prid
	 * @param $prnumber
	 *
	 * @return array
	 * @throws \Exception
	 */
	public function createNewApproveRecordFromPr($prid, $prnumber)
	{
		/*checking*/
		/*Apakah Prid sudah ada di List Approve */
		$apr = $this->find($prid);
		if ($apr) {
			/*ambil item dari apr item*/
			return [$apr->toArray()];
		} else {
			/*Jika Tidak ada lakukan ambil dari PR*/
			$pr = $this->getPr()->findOrFail($prid);
			if ($pr->trxnumber != $prnumber) {
				throw new \Exception( 'Purchase Request Number not Matchs' );
			}
			$aprnumber = $this->prefix . $prnumber;
			$record    = $this->whereTrxnumber($aprnumber);
			/*Jika trx sudah ada maka tidak buat*/
			if ($record->count() > 0) {
				return $record->get()->toArray();
			} else {
				$pritem    = $this->getPritem()->wherePrid($prid);
				$haveitems = ( $pritem->count() > 0 );
				if ($haveitems) {
					$newapprove = $this->create(
						[
							'trxnumber' => $aprnumber,
							'status'    => 1
						]
					);
					$newid      = $newapprove->id;
					$newitemids = [];
					foreach ($pritem->get() as $item) {
						$newitem       = $this->getItems()->create(
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
						$newitemids[ ] = $newitem->id;
					}

				}
				return [$newapprove->toArray()];
			}
		}


	}

	/**
	 * Membuat Record dari PR
	 *
	 * @param $prnumber
	 *
	 * @return \Illuminate\Database\Eloquent\Model|static
	 */
	public function createRecordFromPr($prnumber)
	{
		return $this->create(['trxnumber' => $this->prefix . $prnumber, 'status' => 1]);
	}

	/**
	 * Membuat Record Apr
	 *
	 * @param     $aprid aprid
	 * @param     $productId
	 * @param int $qty
	 *
	 * @return \Illuminate\Database\Eloquent\Model|static
	 */
	public function createRecordAprItem($aprid, $productId, $qty = 0)
	{
		$item    = $this->getItems();
		$newitem = $item->create([
			'product_id' => $productId,
			'qty'        => $qty,
			'qtypr'        => $qty,
			'supplierid' => 0,
			'price'      => 0,
			'contactid'  => 0,
			'aprid'      => $aprid,
			'status'     => 1
		]);
		return $newitem;
	}


	/**
	 * Membuat Record baru dari PR ke Apr
	 * @param \Emayk\Ics\Repo\Transaction\Purchase\Request\Model $objpr
	 */
	public function createNewRecordFromPrToApr(\Emayk\Ics\Repo\Transaction\Purchase\Request\Model $objpr)
	{
//		$newprs = $objpr->whereStatus(1);
		$newprs = $objpr->New();
		/*Jika ada Status (new/1)  dari PR */
		if ($newprs->count() > 0) {
			foreach ($newprs->get() as $pr) {
				/*Buat Record APR */
				$newapr = $this->createRecordFromPr($pr->trxnumber);
				/*Ambil Item PR dari PR id */
				$newprsitems = $this->getPritem()->wherePrid($pr->id);
				foreach ($newprsitems->get() as $item) {
					$newaprid = $newapr->id;
					$newitem  = $this->createRecordAprItem($newaprid, $item->product_id, $item->qty);
					$item->status = 5;
					$item->save();
				}
				/*set Status jadi 5== sudah diproses */
				$pr->status = 5; // di setup sudah diproses
				$pr->save();
			}
		}
	}

	/**
	 * Mendapatkan items Apr tanpa Relasi ORM Eloquent
	 *
	 * @return Items
	 */
	public function getItems()
	{
		return new Items();
	}

	/**
	 * Mendapatkan Items Apr dengan Relasi
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function items()
	{
		return $this->hasMany('\Emayk\Ics\Repo\Transaction\Purchase\Approval\Items', 'aprid');
	}

	/**
	 * Mendapatkan Status New atau ditunda
	 *
	 * @param $query
	 *
	 * @return mixed
	 */
	public function scopeNew($query)
	{
		return $query->whereStatus(1)->orWhere(function ($q) {
			$q->where('status', 4);
		});
	}

	/**
	 * Mendapatkan Status di setujui
	 *
	 * @param $query
	 *
	 * @return mixed
	 */
	public function scopeAgree($query)
	{
		return $query->whereStatus(static::$idStatus[ 'agree' ]);
//		return $query->whereStatus(2);
	}

	/**
	 * Mendapatkan Status ditolak
	 *
	 * @param $query
	 *
	 * @return mixed
	 */
	public function scopeDenied($query)
	{
		return $query->whereStatus(static::$idStatus[ 'denied' ]);
//		return $query->whereStatus(3);
	}

	/**
	 * Mendapatkan Status dari status yang diberikan
	 *
	 * @param $query
	 * @param $status
	 *
	 * @return mixed
	 */
	public function scopeStatus($query, $status)
	{
		$oldstatus   = strtolower($status);
		$allowstatus = ['agree', 'new', 'denied'];
		$s           = ( in_array($oldstatus, $allowstatus) ) ? $oldstatus : '1';
		if ($oldstatus)
			return $query->whereStatus($s);
	}

	/**
	 * Mendapatkan Semua PR
	 *
	 * Jika Belum ada akan dibuatkan.
	 *
	 */
	public function getAllnewPR()
	{
		$pr = $this->getPr();
		$listnewpr = $pr->whereStatus(1);
		/*Jika ada PR yang masih belum diproses , lakukan import ke Apr beserta Itemnya*/
		if ($listnewpr->count() > 0) {
			$this->createNewRecordFromPrToApr($pr);
		};

		return $this->New();

//		$listnewpr = [];
//		/*Ambil dari PR dengan status 1*/
//		$prs = $this->getPr()->whereStatus(1);
//		foreach ($prs->get() as $pr) {
//			$listnewpr[ ] = $pr->toArray();
//		}
//
//		return $listnewpr;
		/*Ambil dari PR dengan status 1 atau 4*/
	}
}

 
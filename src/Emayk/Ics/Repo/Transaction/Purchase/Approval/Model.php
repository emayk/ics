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

/**
 * Class Model
 *
 * @package Emayk\Ics\Repo\Transaction\Purchase\Approval
 */
class Model extends BaseModel
{
	/**
	 * @var string
	 */
	protected $table = 'trans_pr_approve';
//	protected $fillable = ['trxnumber', 'status','adj_id'];
	/**
	 * @var string
	 */
	protected $prefix = 'APR-';
	/**
	 * @var array
	 */
	protected $guarded = array();
	/**
	 * @var array
	 */
	protected $with = [
		'adj'
	];

	protected $hidden = ['item'];

	public $appends = ['totalitems', 'totalagree', 'totaldenied', 'totalunprocess', 'totalpending', 'totalprocessed'];

	/**
	 * @return mixed
	 */
	public function getTotalagreeAttribute()
	{
		/*Mendapatkan Jumlah Status Yang di approve */
		return $this->item()->Agree()->count();
	}

	public function getTotalitemsAttribute()
	{
		$total        = $this->item->count();
		return $total;
	}

	public function getTotaldeniedAttribute()
	{
		return $this->item()->Denied()->count();
	}

	public function getTotalunprocessAttribute()
	{
		return $this->item()->Unprocessed()->count();
	}

	public function getTotalpendingAttribute()
	{
		return $this->item()->Pending()->count();
	}

	public function getTotalProcessedAttribute()
	{
		return $this->item()->Processed()->count();
	}


	/**
	 * @return string
	 */
	public function getPrefix()
	{
		return $this->prefix;
	}

	/**
	 * @var array
	 */
	protected static $idStatus = ['agree' => 2, 'denied' => 3, 'new' => [1, 4], 'processed' => 5];


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
	/**
	 * @param $prid
	 *
	 * @return mixed
	 */
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
	 * @param $adjprid
	 * @param $prnumber
	 */
	public function createNewApproveRecordFromAdjustmentPr($adjprid, $prnumber)
	{

	}

	/**
	 * Membuat Record Approve PR dari PR
	 *
	 * @param $prid
	 * @param $prnumber
	 *
	 * @return array
	 * @throws \Exception
	 *
	 * @deprecate
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
			'qtypr'      => $qty,
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
	 *
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
					$newaprid     = $newapr->id;
					$newitem      = $this->createRecordAprItem($newaprid, $item->product_id, $item->qty);
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


//	public function items()
//	{
//		return $this->hasMany('\Emayk\Ics\Repo\Transaction\Purchase\Approval\Items', 'apr_id');
//	}

	/**
	 * Mendapatkan Items Apr dengan Relasi
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function item()
	{
		return $this->hasMany('\Emayk\Ics\Repo\Transaction\Purchase\Approval\Items', 'apr_id');
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function adj()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Eloquent', 'adj_id');
	}

	/**
	 * Mendapatkan Status New
	 *
	 * @param $query
	 *
	 * @return mixed
	 */
	public function scopeNew($query)
	{
		return $query->whereStatus(1);
	}

	/**
	 * @param $query
	 *
	 * @return mixed
	 */
	public function scopePending($query)
	{
		return $query->whereStatus(4);
	}

	/**
	 * Mendapatkan Status New atau ditunda
	 *
	 * @param $q
	 *
	 * @return mixed
	 */
	public function scopeNewAndPending($q)
	{
		return $q->New()->orWhere(function ($q) {
			$q->whereStatus(4);
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

	public function scopeProcessed($query)
	{
		return $query->whereStatus(static::$idStatus[ 'processed' ]);
	}

	/**
	 * Mendapatkan Semua PR
	 *
	 * Jika Belum ada akan dibuatkan.
	 *
	 */
	public function getAllnewPR()
	{
		$pr        = $this->getPr();
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


	/**
	 * Mendapatkan Adjustment Object
	 *
	 * @return Adjustment
	 */
	public function oAdjustment()
	{
		return new Adjustment();
	}

	/**
	 * Pindah Adjustment ke Approval List
	 *
	 * @param       $adjid
	 * @param       $adjnumber
	 * @param array $itemAdj
	 *
	 * @throws \Exception
	 * @return \Illuminate\Database\Eloquent\Model|static
	 */
	public function moveAdjustmentToApproval($adjid, $adjnumber, array $itemAdj)
	{
		$adjustment = $this->oAdjustment()->findOrFail($adjid);
		if (!$adjustment) {
			$msg = 'Adjustment Id tidak diketemukan ';
			Log::alert($msg, ['time' => time(), 'class' => __CLASS__]);
			throw new \Exception( $msg );
		}

		$trxnumber_adjustment = $adjustment->trxnumber;
		$id_adjustment        = $adjustment->id;
		if ($trxnumber_adjustment !== $adjnumber) {
			$msg = 'Adjustment Number tidak cocok';
			Log::alert($msg, ['time' => time(), 'class' => __CLASS__ . '::' . __FUNCTION__]);
			throw new \Exception( $msg );
		}

		$Adjitems = $this->oAdjustment()->getItem();

		/*Transaksi Number Adjustment */

		/*Prefix Approval*/
		$prefix_approval = $this->getPrefix();
		/*Transaksi Number Approval*/
		$trxnumber_approval = $prefix_approval . $trxnumber_adjustment;

		$uuid         = $this->createUuid($trxnumber_approval);
		$newApproval  = $this->create([
			'trxnumber'       => $trxnumber_approval,
			'adj_id'          => $id_adjustment,
			'uuid'            => $uuid,
			'status'          => 1,
			'createby_id'     => $this->getUid(),
			'lastupdateby_id' => $this->getUid(),
		]);
		$approvalItem = $this->getItems();

		foreach ($itemAdj as $itemtoapprove) {
			/*Item Record Adjustment*/
			$item = $Adjitems->find($itemtoapprove);
			if (!$item) {
				/*Jika Item Id tidak ada Laporkan ke Log*/
				Log::critical('Adjustment dengan ID ' . $itemtoapprove . ' gagal dimasukan karena Id tidak diketemukan');
			} else {
				/*Jika Adjustment Item ada */
				$approvalItem->create(
					[
						'product_id'      => $item->product_id,
						'qtyadj'          => $item->qty,
						'adj_id'          => $adjustment->id,
						'adj_item'        => $item->id,
						'apr_id'          => $newApproval->id,
						'status'          => 1, // belum diproses
						'trxnumber'       => $trxnumber_approval,
						'uuid'            => $uuid,
						'createby_id'     => $this->getUid(),
						'lastupdateby_id' => $this->getUid()
					]
				);
				$item->status = 5;
				$item->save();
			}
		}

		/*Setup Status Adjustment menjadi sudah diajukan */
		$adjustment->status = 5;
		$adjustment->save();

		return $newApproval;
	}

 public function checkCountAndSetupStatus(){
//	 $items = $this->item();
//	 $total = $items->count();
//	 $totalcount =
//	 if ($total == $totalProcess) {
//		 $this->status = 5;
//		 $this->save();
//	 }
 }
}

 
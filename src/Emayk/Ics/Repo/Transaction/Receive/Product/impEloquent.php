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

use Emayk\Ics\Controllers\BaseLogic;
use Response;
use Input;

/**
 * Class impEloquent
 *
 * @package Emayk\Ics\Repo\Transaction\Receive\Product
 */
class impEloquent extends BaseLogic implements iProduct
{
	/**
	 * @startuml
	 * title Terima Barang Implementasi Eloquent
	 *
	 * 'object Emayk.Ics.Repo.Transaction.Receive.Product.impEloquent
	 *
	 * Emayk.Ics.Controllers.BaseLogic
	 * namespace Emayk.Ics.Repo.Transaction.Receive.Product
	 * .BaseLogic o--impEloquent
	 * impEloquent: #receive
	 * impEloquent: +index()
	 * impEloquent: +show()
	 * end namespace
	 * @enduml
	 */
	/**
	 * @var Model
	 */
	protected $receive;

	/**
	 * @param Model $Receive
	 */
	function __construct(Model $Receive)
	{
		$this->receive = $Receive;
	}

	/**
	 *
	 * Mendapatkan Record Transorderapproval berdasarkan ID yang diberikan
	 *
	 * @param  int $id ID Record
	 *
	 * @return Model Record Transorderapproval
	 **/

	public function find($id)
	{
		return $this->receive->find($id);
	}

	/**
	 * Mendapatkan Semua Transorderapproval
	 *
	 * @return mixed
	 */
	public function all()
	{
		$page  = \Input::get('page');
		$limit = \Input::get('limit', 1);
		$start = \Input::get('start', 0);


		/**
		 * Jika Request Minta Items,
		 */


		if (Input::has('cmd')) {
			$cmd = Input::get('cmd');

			if ($cmd == 'getitems') {
				return $this->getListItems($start, $limit, $page = 0);
			};
			if ($cmd == 'listprintreceiveitemtoday') {
				return $this->getListPrintReceiveItemtoday($start, $limit, $page);
			}
			return $this->setException('Need Cmd Parameter');
		} else {
			/**
			 * Tanpa Items
			 */
			$receivegood = $this->receive
				->orderBy('id', 'DESC');
			$receivegood = $receivegood->skip($start)
				->take($limit)
				->get()->toArray();
			$total       = $this->receive
				->all()->count();

			$transorderapprovals = array(
				'success' => true,
				'results' => $receivegood,
				'total'   => $total
			);

			return Response::json($transorderapprovals);
		}
	}

	/**
	 *
	 */
	protected function getReceiveProductItems()
	{


	}

	/**
	 *
	 * Proses Simpan
	 *
	 * @return mixed
	 */
	public function store()
	{
		if (!$this->hasAccess()) {
			return Response::json(
				array(
					'success' => false,
					'reason'  => 'Action Need Login First',
					'results' => null
				))->setCallback();
		}

		/**
		 * Tidak ada Proses Simpan
		 */

	}

	/**
	 * Menghapus
	 *
	 * @param $id
	 *
	 * @return mixed
	 *
	 */
	public function delete($id)
	{

		if ($this->hasAccess()) {
			$deleted = $this->receive
				->find($id)
				->delete();

			return \Icsoutput::toJson(array(
				'results' => $deleted
			), $deleted);

		} else {
			return \Icsoutput::toJson(array(
				'results' => false,
				'reason'  => 'Dont Have Access to Delete '
			), false);
		}
	}

	/**
	 * Update Informasi [[cName]]
	 *
	 * @param int $id
	 *
	 * @throws \Exception
	 * @return mixed
	 */
	public function update($id)
	{

		if (Input::has('cmd')) {
			$cmd = Input::get("cmd");
			/**
			 * Apakah Cmd = getitems
			 */

			if ($cmd == 'getitems') {
				if (Input::has('receiveid')) {
					/**
					 * Proses Update/Tambah Record Item
					 */

					/**
					 *Check Id Receive
					 */
					$receiveId     = Input::get("receiveid");
					$receiveNumber = Input::get("receivenumber");
					$receive       = $this->receive->findOrFail($receiveId);
					if ($receive->trxnumber !== $receiveNumber) $this->setException('Nomor Transaksi tidak cocok');


					$oitem = $this->receive->oItem();
					$item  = $oitem->findOrFail($id);
					/**
					 * Jika Qty Yang sudah diterima lebih besar dari Qty Order
					 */
					$qtyOrder   = $item->qtyorder;
					$qtyReceive = $item->qtyreceived;
					if ($qtyReceive > $qtyOrder) $this->setException('Qty Terima Tidak boleh lebih besar dari Qty Order');

					$inpQty                  = $this->getParams('qty', 'Parameter Qty Tidak ada');
					$inpSuratJalan           = $this->getParams('sjno', 'Nomor Surat Jalan Tidak ada');
					$inpSuratJalanTgl        = $this->getParams('sjdate', 'Tanggal Surat Jalan Tidak ada');
					$inpQtyRoll              = $this->getParams('qtyroll', 'Tanggal Surat Jalan Tidak ada');
					$inpTglTerima            = $this->inputGet('receivedate');
					$inpSuratJalanDrivername = $this->inputGet('drivername');
					$inpSuratJalanPlatnomor  = $this->inputGet('platnomor');
					if ($inpQty == 0) $this->setException('Qty Terima Tidak boleh 0 ');
					if ($inpQtyRoll == 0) $this->setException('Roll Terima Tidak boleh 0');


					$inpDesc    = $this->inputGet('desc');
					$item->desc = $inpDesc;
					/**
					 * Buat Record History Terima Barang
					 */
					/*Tambahkan barang terima */
					$inpQty  = intval($inpQty);
					$message = '';
					if (!empty( $inpDesc )) {
						$message    = $inpDesc;
						$item->desc = $message;
					}
					$itemId = $item->id;
					/*Tambah Qty Yang sudah diterima*/
					$item->increment('qtyreceived', $inpQty);
					/*Tambah Receive Roll*/
					$item->increment('rollreceived', $inpQtyRoll);
					$item->qty     = 0;
					$item->qtyroll = 0;
					$item->save();

					/**
					 * Update Total Received Item dan Roll
					 * Pada Receive Table;
					 */
					$rcv = $item->receive;
					$rcv->increment('totalreceiveditem', $inpQty);
					$rcv->increment('totalrollreceived', $inpQtyRoll);
					$rcv->save();

					$product    = Input::get('product');
					$product_id = Input::get('product_id');
					$message    = ( empty( $message ) )
						? null
						: 'Terima barang dengan mengupdate Qty Product ' .
						$product . ' dengan keterangan ' .
						$message;

					$updateBy   = $oitem->getUid();
					$suratJalan = $oitem->oSuratJalan()->createRecord(
						$inpSuratJalan, $inpSuratJalanTgl,
						$inpSuratJalanDrivername, $inpSuratJalanPlatnomor
					);

					$history                  = $oitem->getHistory();
					$cntReceiveItem           = $history->getCountReceiveItemHistory($itemId);
					$historytotalreceiveditem = $rcv->totalreceiveditem;
					$historytotalrollreceived = $rcv->totalrollreceived;


					$history->createRecord(
						$inpQty, $updateBy,
						$itemId, $product_id,
						$inpQtyRoll, $suratJalan->id,
						$inpTglTerima, $cntReceiveItem,
						$historytotalreceiveditem, $historytotalrollreceived,
						$message

					);

					$ofitem = $oitem->findOrFail($id);

					return Response::json([
							'success' => true,
							'results' => $ofitem->toArray(),
							'total'   => 1
						]
					);

					if (Input::has('option')) {
						$option = Input::get('option');
						/*Jika Option tanpa harga*/
						if ($option == 'wosale') {
							/*@todo : kasih data tanpa harga*/
						} else {
							/*@todo : kasih data dengan harga*/
						}

					}
				}
			};
			if ($cmd == 'updatereceive') {
				/**/
				$receiveId = Input::get('receiveid');
				$receive   = $this->receive->findOrFail($receiveId);
				$array     = array_merge($receive->toArray(), [
					'sjno'     => 'SJ-NO' . rand(10, 200),
					'success'  => true,
					/**
					 * Jika Semua Qty Sudah Diterima Semuanya
					 * Qtyorder == qtyreceived
					 */
					'canprint' => true
				]);
				return $array;
			}
		}
	}

	/**
	 *
	 * Apakah Sudah Login
	 *
	 * @return boolean
	 *
	 **/
	protected function  hasAccess()
	{
		return ( !Auth::guest() );
	}

	/**
	 *
	 * Menampilkan Page Create data Transorderapproval
	 *
	 **/

	public function create()
	{
		// TODO: Implement create() method.
	}

	/**
	 * Menampilkan Resource
	 *
	 * @param  int $id
	 *
	 * @return Response
	 */
	public function show($id)
	{
		$receivegood = $this->receive->findOrFail($id);

		if (Input::has('cmd')) {
			$cmd = Input::get('cmd');

			if ($cmd == 'getitems') {

				$receiveId     = Input::get('receiveid');
				$receiveNumber = Input::get('receivenumber');
				$items         = $this->receive->item()->whereReceiveId($receiveId);

				return $items->get()->toArray();
			}
			/**/
			if (Input::has('option')) {
				$option = Input::get('option');
				/*Jika Option tanpa harga*/
				if ($option == 'wosale') {
					/*@todo : kasih data tanpa harga*/
				} else {
					/*@todo : kasih data dengan harga*/
				}

			}
			$receivegood = $receivegood->item;
		};

		$receivegood = $receivegood
			->toArray();
		$total       = $this->receive
			->all()->count();

		$transorderapprovals = array(
			'success' => true,
			'results' => $receivegood,
			'total'   => $total
		);

		return Response::json($transorderapprovals)
			->setCallback(\Input::get('callback'));
	}

	/**
	 *
	 */
	protected function getCmd()
	{

	}

	/**
	 * Menampilkan Data Untuk di edit
	 *
	 * @param  int $id
	 *
	 * @return Response
	 */
	public function edit($id)
	{
		// TODO: Implement edit() method.
	}

	/**
	 * Remove Storage
	 *
	 * @param  int $id
	 *
	 * @return Response
	 */
	public function destroy($id)
	{
		return $this->delete($id);
	}

	/**
	 * Mendapatkan Listing Item Untuk Ditampilkan
	 * dan diedit
	 *
	 * @param     $start
	 * @param     $limit
	 * @param int $page
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	protected function getListItems($start, $limit, $page = 0)
	{
		$receiveId     = Input::get('receiveid');
		$receiveNumber = Input::get('receivenumber');
		$items         = $this->receive->oItem()
			->whereReceiveid($receiveId);


		$totalitems = $items->count();
		$items      = $items
			->skip($start)
			->take($limit)
			->with('product');

		return Response::json([
			'success' => true, 'total' => $totalitems,
			'results' => $items->get()->toArray()
		]);
		return $items->get()->toArray();
		/**/
		if (Input::has('option')) {
			$option = Input::get('option');
			/*Jika Option tanpa harga*/
			if ($option == 'wosale') {
				/*@todo : kasih data tanpa harga*/
			} else {
				/*@todo : kasih data dengan harga*/
			}
		}
	}

	/**
	 * Mendapatkan Daftar Product - Product
	 * yang sudah diinputkan pada hari yang sama
	 *
	 * @param     $start
	 * @param     $limit
	 * @param int $page
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	protected function getListPrintReceiveItemtoday($start, $limit, $page = 0)
	{
		/**
		 * Menampilkan data - data yang baru saja diinput
		 * - hanya menampilkan record yang diinput di hari yang sama,
		 * status (belum pernah diprint).
		 *
		 * - record yang sudah diprint akan diset menjadi sudah diprint
		 * dan menambahkan count print,
		 * record yang sudah diprint juga tidak akan bisa diprint ulang,
		 * jika terjadi maka document akan ditampilkan sebagai copy .(ada penanda khusus).
		 *
		 */
		$receiveId     = $this->getParams('receiveid', 'Butuh ID terima');
		$receiveNumber = $this->getParams('receivenumber', 'Parameter Receive Number diperlukan');
		/*Check data hari ini*/

		$receive   = $this->receive->findOrFail($receiveId);
		$trxnumber = $receive->getColumnTrx();

		if ($receive->$trxnumber !== $receiveNumber) $this->setException('Transaksi Number tidak sama');

		$histories = [];
		$total         = 0;
		$receiveToday  = date('Y-m-d');
		foreach ($receive->item as $item) {
			/*Item History*/
			$itemHistory = $item->history;
			$total       = $item->history->count();
			foreach ($itemHistory as $history) {
				if ($history->receivedate == $receiveToday)
					$history->load('suratjalan', 'item');
				$histories[ ] = $history->toArray();
			}
		}

		$total = count($histories);
		return Response::json([
			'success' => true,
			'total'   => $total,
			'results' => $histories
		]);

	}


}

 
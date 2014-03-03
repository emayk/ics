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
use \Input;
use \Response;
use \Auth;

class impItemEloquent implements iItem
{
	protected $item;

//	protected $adj;

	function __construct()
	{
		$this->item = new Item(); // model item
//		$this->adj  = new Eloquent(); // model Adjustment
	}

	/**
	 *
	 * Mendapatkan Record  berdasarkan ID yang diberikan
	 *
	 * @param  int $id ID Record
	 *
	 * @return Model Record
	 **/

	public function find($id)
	{
		return $this->item->find($id);
	}

	/**
	 * Mendapatkan Semua
	 *
	 * @throws \Exception
	 * @return mixed
	 */
	public function all()
	{
		$page  = \Input::get('page');
		$limit = \Input::get('limit', 1);
		$start = \Input::get('start', 0);
//		return Input::all();
		if (!Input::has('adjid')) {
			throw new \Exception( 'Adjustment ID diperlukan' );
		}

		if (!Input::has('adjid')) throw new \Exception( 'Need Adj Id' );
		$adjid = Input::get('adjid');
		if (!is_numeric($adjid)) throw new \Exception( 'Adj Id bukan angka' );


		$items   = $this->item->getFindByAdjId($adjid)->with('contact',
			'supplier',
			'product',
			'warehouse',
			'currency',
			'paymenttype',
			'taxtype');
		$count   = $items->count();
		$results = $items->get()->toArray();
		return Response::json([
			'success' => true,
			'total'   => $count,
			'results' => $results
		]);

		return Response::json($approves);

	}

	/**
	 *
	 * Proses Simpan
	 *
	 * @throws \Exception
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

		return Input::all();
//		if (Input::get('cmd')) {
//			/*Proses Pindah dari trans_tr ke trans_app_item*/
//			/*Jika cmd == getitems*/
//
//			$cmd = Input::get('cmd');
//			if ($cmd == 'getitems') {
//				if (!Input::has('prid')) throw new \Exception( 'Butuh PR id' );
//				if (!Input::has('prnumber')) throw new \Exception( 'Butuh PR Number' );
//				$prid     = Input::get('prid');
//				$prnumber = Input::get('prnumber');
//				/*Check PR apakah sudah ada ? */
//				$record = $this->item->createNewApproveRecordFromPr($prid, $prnumber);
//				if (is_array($record)) $record = $record[ 0 ];
//				return Response::json(['success' => true, 'results' => $record]);
//			}
//		}
	}

	/**
	 * Menghapus Taxtype
	 *
	 * @param $id
	 *
	 * @return mixed
	 *
	 */
	public function delete($id)
	{

		if ($this->hasAccess()) {
			$deleted = $this->item
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


		If (!Input::has('adjid')) {
			throw new \Exception( 'Butuh Parameter Adjustment ' );
		}

		$item  = $this->item->find($id);
		$adjid = Input::get('adjid');
		/*Checking*/
		if ($item->adjprid != $adjid) {
			throw new \Exception( 'Parameter Adjustment tidak sesuai' );
		}

		/*Supplier*/
		$supname  = Input::get('supname');
		$supplier = $this->item->oSupplier()->Name($supname);
		if (!$supplier->count() > 0) throw new \Exception( 'Nama Pemasok tidak sesuai' );
		$supplierId        = $supplier->first()->id;
		$item->supplier_id = $supplierId;

		$cpname  = Input::get('cpname');
		$contact = $this->item->oContact()->Name($cpname);
		if (!$contact->count() > 0) throw new \Exception( 'Nama Kontak tidak sesuai' );
		$contactId   = $contact->first()->id;
		$item->cp_id = $contactId;

		/*Qty*/
		$price          = strval(Input::get('price'));
		$qty            = strval(Input::get('qty'));
		$item->qty      = $qty;
		$item->dp       = Input::get('dp');
		$item->price    = $price;
		$item->subtotal = ( $qty * $price );

		/*Pengiriman*/
		$deliverydate      = Input::get('delivery_at');
		$item->delivery_at = $deliverydate;

		/*Gudang*/
		$whname = Input::get('warehousename');
		$wh     = $this->item->oWarehouse()->whereName($whname);
		if (!$wh->count() > 0) throw new \Exception( 'Nama Gudang tidak sesuai' );
		$whid               = $wh->first()->id;
		$item->warehouse_id = $whid;

		/*Mata Uang*/
		$inpcurrname = Input::get('currname');
		$curr        = $this->item->oCurrency()->whereName($inpcurrname);
		if (!$curr->count() > 0) throw new \Exception( 'Nama Mata Uang tidak sesuai' );
		$currid        = $curr->first()->id;
		$item->curr_id = $currid;

		/*Jenis Pajak*/
		$inptaxname = Input::get('taxname');
		$taxname    = $this->item->oTaxType()->whereName($inptaxname);
		if (!$curr->count() > 0) throw new \Exception( 'Jenis Pajak tidak sesuai' );
		$taxid        = $taxname->first()->id;
		$item->tax_id = $taxid;

		/*Jenis Pembayaran*/
		$inppaymenttype = Input::get('paymenttypename');
		$paymenttype    = $this->item->oPaymentType()->whereName($inppaymenttype);
		if (!$paymenttype->count() > 0) throw new \Exception( 'Jenis Pembayaran tidak sesuai' );
		$paymenttypeid        = $paymenttype->first()->id;
		$item->paymenttype_id = $paymenttypeid;

		$item->credit = Input::get('credit', 1);
		$item->rate   = Input::get('rate', 1);
		$item->status = Input::get('status', 1);


//		$ddate = str_replace('-', '_', $deliverydate);

		$sep   = '_';
		$route = $supplierId . $sep .
			$contactId . $sep .
			$whid . $sep .
//			$currid . $sep .
			$taxid . $sep .
			$paymenttypeid;
//			$ddate;

		$item->route = $route;


		if ($item->save()) {
			return Response::json(
				$this->item->find($id)->toArray()
			);
		} else {
			return Response::json(['success' => false, 'results' => Input::all(), 'total' => 1]);
		}
	}

	protected function savedAndResponseJson($record)
	{
		if ($record->save()) {
			return Response::json($record->toArray());
		} else {
			return Response::json(['success' => false, 'results' => Input::all(), 'total' => 1]);
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
	 * Menampilkan Page Create data Taxtype
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
		// TODO: Implement show() method.
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
		/*ambil item delete , baru delete record */
		return $this->delete($id);
	}
}

 
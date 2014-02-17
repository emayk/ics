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
 * Bussiness Logic Transorderdetails
 *
 **/

namespace Emayk\Ics\Repo\Transorderdetails;

use Carbon\Carbon;
use Emayk\Ics\Repo\Transorders\TransOrderTmp;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class TransorderdetailsEloquent implements TransorderdetailsInterface
{
	protected $transorderdetails;

	function __construct(Transorderdetails $transorderdetails)
	{
		$this->transorderdetails = $transorderdetails;

	}

	/**
	 *
	 * Mendapatkan Record Transorderdetails berdasarkan ID yang diberikan
	 *
	 * @param  int $id ID Record
	 *
	 * @return Model Record Transorderdetails
	 **/

	public function find($id)
	{
		return $this->transorderdetails->find($id);
	}

	/**
	 * Mendapatkan Semua Transorderdetails
	 *
	 * @throws \Exception
	 * @return mixed
	 */
	public function all()
	{


		if (Input::has('tmp')) {
			return $this->listTmpItems();
		}

		$page  = \Input::get('page');
		$limit = \Input::get('limit', 1);
		$start = \Input::get('start', 0);
		if (!Input::has('order_id')) {
			throw new \Exception( 'Need Order ID' );
		}

		$orderId           = Input::get('order_id');
		$transorderdetails = $this->transorderdetails
			->whereOrderId($orderId);
		$total             = $transorderdetails->count();
		$transorderdetails = $transorderdetails
			->skip($start)
			->take($limit)
			->get()->toArray();


		$transorderdetailss = array(
			'success' => true,
			'results' => $transorderdetails,
			'total'   => $total
		);

		return Response::json($transorderdetailss)
			->setCallback(\Input::get('callback'));

	}

	protected function listTmpItems()
	{
		$page  = \Input::get('page');
		$limit = \Input::get('limit', 1);
		$start = \Input::get('start', 0);

		if (!Input::has('tmptrxid')) {
			throw new \Exception( 'Butuh Transaksi ID' );
		}

		$trxid = Input::get('tmptrxid');
		$tmp   = $this->transorderdetails->getTmp()->whereTrxid($trxid);

		$total = $tmp->count();

		$tmp = $tmp
			->skip($start)
			->take($limit)
			->get()->toArray();


		$tmps = array(
			'success' => true,
			'results' => $tmp,
			'total'   => $total
		);

		return Response::json($tmps);

	}

	public function createTemporaryOrderItems()
	{
		if (!Input::has('tmptrxid')) {
			throw new \Exception( 'Need Transaction Number' );
		}
		$trxid = Input::get('tmptrxid');
		/*Check Apakah memang ada ?*/
		$existtrx = $this->transorderdetails->getTmpTransaction()->findOrFail($trxid);
		if ($existtrx->count() == 0) {
			throw new \Exception( 'Nomor Transaksi Tidak ada' );
		}

		$trxid = $existtrx->id;
		/*Create Data*/
		$qty        = Input::get('qty');
		$producId   = Input::get('prodname');
		$producName = Input::get('prodid');
		$trxtemp    = $this->transorderdetails->getTmp()->create(
			[
				'qty'         => $qty,
				'productname' => $producId,
				'product_id'  => $producName,
				'trxid'       => $trxid
			]
		);

		return $trxtemp;
	}

	/**
	 *
	 * Proses Simpan Transorderdetails
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

		if (Input::has('tmp')) {
			return $this->createTemporaryOrderItems();
		}


		/*==========  Sesuaikan dengan Field di table  ==========*/
		$this->transorderdetails->id         = Input::get("id");
		$this->transorderdetails->qty        = Input::get("qty");
		$this->transorderdetails->price      = Input::get("price");
		$this->transorderdetails->info       = Input::get("info", "-");
		$this->transorderdetails->product_id = Input::get("product_id");
		$this->transorderdetails->order_id   = Input::get("order_id");
		$this->transorderdetails->price      = 0;
//		$this->transorderdetails->uuid = Input::get("uuid");
//		$this->transorderdetails->createby_id = Input::get("createby_id");
//		$this->transorderdetails->lastupdateby_id = Input::get("lastupdateby_id");
//		$this->transorderdetails->created_at = Input::get("created_at");
//		$this->transorderdetails->updated_at = Input::get("updated_at");
		$this->transorderdetails->uuid            = uniqid('New_');
		$this->transorderdetails->createby_id     = \Auth::user()->id;
		$this->transorderdetails->lastupdateby_id = \Auth::user()->id;
		$this->transorderdetails->created_at      = new Carbon();
		$this->transorderdetails->updated_at      = new Carbon();
		$saved                                    = $this->transorderdetails->save() ? true : false;
		return Response::json(array(
			'success' => $saved,
			'results' => $this->transorderdetails->toArray()
		))->setCallback();
	}

	/**
	 * Menghapus Transorderdetails
	 *
	 * @param $id
	 *
	 * @return mixed
	 *
	 */
	public function delete($id)
	{
		if (!$this->hasAccess()) {
			throw new \Exception( 'Tidak ada akses untuk delete' );
		}

		if (Input::has('tmp')) {
			if (!Input::has('tmptrxid')) {
				throw new \Exception( 'Butuh Transaction ID untuk hapus' );
			}
			$trxid  = Input::get('tmptrxid');
			$prodId = Input::get('prodid');
			$record = $this->transorderdetails->getTmp()->whereTrxid($trxid)->whereProductId($prodId);

			if (!$record) {
				return Response::json([
					'success' => false,
					'error'   => true,
					'reason'  => 'Cannot Deleted'
				], 200);
			}

			return ( $record->delete() )
				? Response::json([
					/*Extjs untuk delete dan fire callback model.destroy() method di setup false */
					'success' => false,
					'error'   => false
				])
				: Response::json([
					'success' => false,
					'error'   => true,
					'reason'  => 'Cannot Deleted'
				], 200);


		}
//
//		if ($this->hasAccess()) {
//			$deleted = $this->transorderdetails
//				->find($id)
//				->delete();
//
//			return \Icsoutput::toJson(array(
//				'results' => $deleted
//			), $deleted);
//
//		} else {
//			return \Icsoutput::toJson(array(
//				'results' => false,
//				'reason'  => 'Dont Have Access to Delete '
//			), false);
//		}
	}

	/**
	 * Update Informasi [[cName]]
	 *
	 * @param $id
	 *
	 * @return mixed
	 */
	public function update($id)
	{

		if ( Input::has('tmp') ) {
			if (!Input::has('tmptrxid')){
				throw new \Exception('Butuh Transaction ID');
			};

			$id          = Input::get('id');
			$record      = $this->transorderdetails->getTmp()->findOrFail($id);
			$record->qty = Input::get('qty');
			return ($record->save() ) ? \Response::json(['success' => true, 'results' => $record->toArray()])
				: \Response::json(['success' => false,'error'=> true, 'results' => $record->toArray()]) ;

		}
		$db = $this->transorderdetails->find($id);
		/*==========  Sesuaikan  ==========*/
		// $db->name = Input::get('name');
		$db->qty  = Input::get('qty');
		$db->uuid = uniqid('Update_');
		return ( $db->save() )
			? \Icsoutput::msgSuccess($db->toArray())
			: \Icsoutput::msgError(array('reason' => 'Cannot Update'));
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
	 * Menampilkan Page Create data Transorderdetails
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
		return $this->delete($id);
	}


}

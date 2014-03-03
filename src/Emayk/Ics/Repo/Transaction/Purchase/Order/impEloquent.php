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

use Input;
use Response;

/**
 * Class impEloquent
 *
 * @package Emayk\Ics\Repo\Transaction\Purchase\Order
 */
class impEloquent implements iOrder
{
	/**
	 * @var
	 */
	protected $order;
	/**
	 * @var array
	 */
	protected $params = ['id' => 'orderid', 'number' => 'ordernumber'];

	/**
	 * @param Eloquent $Order
	 */
	function __construct(Eloquent $Order)
	{
		$this->order = $Order;
	}

	/**
	 * @return string
	 */
	public function getParamsId()
	{
		return $this->params[ 'id' ];
	}

	/**
	 * @return mixed
	 */
	public function getParamsNumber()
	{
		return $this->params[ 'number' ];
	}

	/**
	 * @return mixed
	 * @throws \Exception
	 */
	protected function getOrderId()
	{
		if (!Input::has($this->getParamsId())) throw new \Exception( 'Need Order Id' );
		return Input::get($this->getParamsId());
	}

	/**
	 * @return mixed
	 * @throws \Exception
	 */
	protected function getOrderNumber()
	{
		if (!Input::has($this->getParamsNumber())) throw new \Exception( 'Need Order Number' );
		return Input::get($this->getParamsNumber());
	}

	protected function isCorrectTrxNumber($order)
	{
		$correct = ( $order->trxnumber == $this->getOrderNumber() );
		if (!$correct) throw new \Exception( 'Need Order Tidak Cocok' );
		return true;
	}

	/**
	 * Menampilkan Daftar Resource
	 *
	 * @throws \Exception
	 * @return Response
	 */
	public function all()
	{
		$page  = \Input::get('page');
		$limit = \Input::get('limit', 1);
		$start = \Input::get('start', 0);
		/*Check New Queue*/
		/*Check Apakah ada di Queue Order*/
		$hasNew = $this->order->hasNewQueue();

		if ($hasNew) {
			/*Lakukan Pemindahan dari Queue Ke Order*/
			$this->order->oQueue()->moveToOrder();;
		};

		/**
		 * Jika akan mengambil Order
		 */
		if (Input::has('cmd')) {
			/*Mendapatkan Semua Item berdasarkan ID Approve */
			$cmd = Input::get('cmd');
			if ($cmd == 'getitems') {
				$id    = $this->getOrderId();
				$order = $this->order->findOrFail($id);
				if ($this->isCorrectTrxNumber($order)) {
					$items = $order->item;
//					$items  = $order->item->toArray();
					$total = $order->item()->count();
//					$order  = $order->skip($start)
//						->take($limit)
//						->get()->toArray();
					$orders = array(
						'success' => true,
						'results' => $items->toArray(),
						'total'   => $total
					);
					return Response::json($orders);
				}
			}

		} else {

			$order  = $this->order->with(
				'warehouse',
				'payment',
				'contact',
				'currency',
				'supplier',
				'tax'
			);
			$order  = $order->orderBy('id', 'DESC');
			$total  = $order->count();
			$order  = $order->skip($start)
				->take($limit)
				->get()->toArray();
			$orders = array(
				'success' => true,
				'results' => $order,
				'total'   => $total
			);
			return Response::json($orders);
		}

	}

	/**
	 * Menyimpan Resource Baru
	 *
	 * @throws \Exception
	 * @return Response
	 */
	public function store()
	{
		if (Input::has('cmd')) {
			$cmd = Input::get('cmd');
			if ($cmd == 'print') {
				/*Proses Printe*/
				/*Ambil ID Order*/
				$id     = Input::get('orderid');
				$number = Input::get('ordernumber');
				$uid    = Input::get('uid');
				/*Ambil ID Number*/
				$order = $this->order->findOrFail($id);
				if ($order->trxnumber != $number) throw new \Exception( 'Nomor transaksi tidak cocok' );

				if ($order->printed != 1) $order->printed = 1;
				/*Ambil user Id*/
				$order->lastupdateby_id = $uid;
				/*Lakukan Query Db dengan Idnumber*/
				/*Cocokan dengan ID number*/
				/*Jika sesuai set status cntprint+1 dan printed=1*/
				$order->increment('cntprint'); // = $cntIncr++;
				$order->save();
				/**
				 * Jika sudah di Print maka lakukan Pemindahan data
				 * ke daftar terima barang
				 */
				$this->order->moveOrderToReceiveGood();
				/*Kirim data berupa Html dengan Template*/
				return $this->sampleHtml($id, $number);
			}
		}
		// TODO: Implement store() method.
	}

	protected function sampleHtml($id, $number)
	{
		return \View::make('ics::Print.Purchase.Order', compact('id', 'number'));

	}

	/**
	 * Menampilkan Form New
	 *
	 * @return Response
	 */
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
	 * Update Resource Tertentu dari Storage
	 *
	 * @param  int $id
	 *
	 * @return Response
	 */
	public function update($id)
	{
		// TODO: Implement update() method.
	}

	/**
	 * Menghapus Spesifikasi Resource dari Storage
	 *
	 * @param  int $id
	 *
	 * @return Response
	 */
	public function delete($id)
	{
		// TODO: Implement delete() method.
	}
}

 
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
class impEloquent implements iOrder{
	protected $order;
	function __construct(Eloquent $Order)
	{
		$this->order = $Order;
	}


	/**
	 * Menampilkan Daftar Resource
	 *
	 * @throws \Exception
	 * @return Response
	 */
	public function all()
	{
		$page    = \Input::get('page');
		$limit   = \Input::get('limit', 1);
		$start   = \Input::get('start', 0);
		/*Check New Queue*/
		$this->order->
		$order = $this->order;
		$order = $order->orderBy('id', 'DESC');

		/**/
		if (Input::has('cmd')) {
			/*Mendapatkan Semua Item berdasarkan ID Approve */
			$getitems = Input::get('cmd');
			if ($getitems == 'getitems') {
				if (!Input::has('ordid')) throw new \Exception( 'Need Order Id' );
				if (!Input::has('ordnumber')) throw new \Exception( 'Need Order Number' );
				$id     = Input::get('ordid');
				$number = Input::get('ordnumber');
				return Response::json($this->getItemApproval($id, $number));
			}

		}

		$total   = $order->count();
		$order = $order->skip($start)
			->take($limit)
			->get()->toArray();


		$orders = array(
			'success' => true,
			'results' => $order,
			'total'   => $total
		);
		return Response::json($orders);
	}

	/**
	 * Menyimpan Resource Baru
	 *
	 * @return Response
	 */
	public function store()
	{
		// TODO: Implement store() method.
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

 
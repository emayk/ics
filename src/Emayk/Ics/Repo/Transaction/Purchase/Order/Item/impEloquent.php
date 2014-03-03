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


namespace Emayk\Ics\Repo\Transaction\Purchase\Order\Item;


use Emayk\Ics\Repo\Transaction\Purchase\Order\Eloquent as OrderEloquent;
use Input;
use Response;
class impEloquent implements iItem
{
	protected $item;
	protected $paramOrderId = 'orderid';

	function __construct(Eloquent $item)
	{
		$this->item  = $item;
	}

	protected function  getOrderId()
	{
		if (!Input::has($this->paramOrderId)) throw new \Exception( 'Need Order Id' );
		return Input::get($this->paramOrderId);
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


		$orderId = $this->getOrderId();
		$items   = $this->item->OfOrder($orderId)
			->with('product','order')->orderBy('id', 'DESC');;
		$total   = $items->count();
		$items   = $items->skip($start)
			->take($limit)
			->get()->toArray();


		$orders = array(
			'success' => true,
			'results' => $items,
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
	public function destroy($id)
	{
		// TODO: Implement destroy() method.
	}
}

 
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


namespace Emayk\Ics\Repo\Factory\Product\SalesPrice;

use \Emayk\Ics\Repo\Factory\Product\SalesPrice\Eloquent as SalesEloquent;
use Response;
use Input;

class impEloquent implements iSalesPrice
{
	protected $price;
	protected $product;

	function __construct(SalesEloquent $SalesPriceModel)
	{
		$this->price   = $SalesPriceModel;
		$this->product = new \Emayk\Ics\Repo\Factory\Product\Eloquent();
	}

	/**
	 * Menampilkan Daftar Resource
	 *
	 * @return Response
	 */
	public function all()
	{

		$page  = \Input::get('page');
		$limit = \Input::get('limit', 1);
		$start = \Input::get('start', 0);

		$prices = $this->price->with('product');
		$total  = $prices->count();
		$prices = $prices->skip($start)
			->take($limit)
			->get()->toArray();

		$product = ['success' => true, 'results' => $prices, 'total' => $total];
		return Response::json($product);

	}

	/**
	 * Menyimpan Resource Baru
	 *
	 * @return Response
	 */
	public function store()
	{
		// TODO: Implement store() method.
		return Input::all();
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
	 * @throws \Exception
	 * @return Response
	 */
	public function update($id)
	{
		// TODO: Implement update() method.
//		return Input::all();
//		pricemin: 900000
//pricevalue: 90041
		if (!Input::has('pricevalue')) throw new \Exception( 'Need Price Value' );
		if (!Input::has('pricemin')) throw new \Exception( 'Need Price Minimal' );
		$price    = Input::get('pricevalue');
		$pricemin = Input::get('pricemin');
		if (intval($pricemin) > intval($price)) return Response::json(['success' => false, 'reason' => 'Nilai harga Minimal tidak boleh lebih besar dari Harga']);

		$setPrice           = $this->price->findOrFail($id);
		$setPrice->price    = $price;
		$setPrice->pricemin = $pricemin;
		$saved              = $setPrice->save();
		return ( $saved ) ? Response::json(array_merge($setPrice->toArray(), [
			'success' => true,
			'reason'  => 'Updated Price berhasil dilakukan'
		]))
			: Response::json(['success' => false, 'reason' => 'Gagal Update, Silahkan Coba lagi']);
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

	/**
	 * Mencari Record berdasarkan Primary key
	 *
	 * @param  int $id
	 *
	 * @return Response
	 */
	public function find($id)
	{
		// TODO: Implement find() method.
	}

	/**
	 * Remove from Storage
	 *
	 */
	public function destroy($id)
	{
		// TODO: Implement destroy() method.
	}
}

 
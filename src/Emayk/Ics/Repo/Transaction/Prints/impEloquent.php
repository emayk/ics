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


namespace Emayk\Ics\Repo\Transaction\Prints;

use Response;
use Input;

class impEloquent implements iPrints
{
	protected $print;


	function __construct(Eloquent $Prints)
	{
		$this->print = $Prints;
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
		return $this->print->find($id);
	}

	/**
	 * Mendapatkan Semua Transorderapproval
	 *
	 * @return mixed
	 */
	public function all()
	{
		$page   = \Input::get('page');
		$limit  = \Input::get('limit', 1);
		$start  = \Input::get('start', 0);
		$prints = $this->print
			->orderBy('id', 'DESC');
		$total  = $prints->count();
		$prints = $prints->skip($start)
			->take($limit)
			->get()->toArray();

		$printslist = array(
			'success' => true,
			'results' => $prints,
			'total'   => $total
		);

		return Response::json($printslist);

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
		if (!Input::has('trxid')) throw new \Exception( 'Need Transaksi Id' );
		$id = Input::get('trxid');
		if (!Input::has('trxnumber')) throw new \Exception( 'Need Transaksi Number' );
		$trxnumber = Input::get('trxnumber');
		if (!Input::has('trxkey')) throw new \Exception( 'Need Transaksi Key' );
		$trxkey       = Input::get('trxkey');
		if (!Input::has('preview')) throw new \Exception( 'Preview Mode' );
		$preview       = Input::get('preview');

		$html = $this->print->document($trxkey, $id, $trxnumber,$preview);

		return $html;
//		return Input::all();
	}

	/**
	 * Menghapus Transorderapproval
	 *
	 * @param $id
	 *
	 * @return mixed
	 *
	 */
	public function delete($id)
	{

//
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
//
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
//
	}

}

 
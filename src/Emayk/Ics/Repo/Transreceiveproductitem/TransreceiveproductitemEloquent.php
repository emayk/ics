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
 * Bussiness Logic Transreceiveproductitem
 *
 **/

namespace Emayk\Ics\Repo\Transreceiveproductitem;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class TransreceiveproductitemEloquent implements TransreceiveproductitemInterface
{
	protected $transreceiveproductitem;

	function __construct(Transreceiveproductitem $transreceiveproductitem)
	{
		$this->transreceiveproductitem = $transreceiveproductitem;
	}

	/**
	 *
	 * Mendapatkan Record Transreceiveproductitem berdasarkan ID yang diberikan
	 *
	 * @param  int $id ID Record
	 *
	 * @return Model Record Transreceiveproductitem
	 **/

	public function find($id)
	{
		return $this->transreceiveproductitem->find($id);
	}

	/**
	 * Mendapatkan Semua Transreceiveproductitem
	 *
	 * @return mixed
	 */
	public function all()
	{
		if (!Input::has('receiveid')) {
			return Response::json([
				'success' => true,
				'error' => true,
				'total' => 0,
				'reason' => 'Need Receive ID'
			],428);
		}

		$page                      = \Input::get('page', 1);
		$limit                     = \Input::get('limit', 1);
		$start                     = \Input::get('start', 0);
		$receiveId                 = Input::get('receiveid');
		/**
		 * Showing Semua Receive ID yang diberikan
		 */
		$a_transreceiveproductitem = $this->transreceiveproductitem;
		$transreceiveproductitem   = $a_transreceiveproductitem->skip($start)->take($limit)->get();

		$total = $this->transreceiveproductitem->count();

		$transreceiveproductitems = array(
			'success' => true,
			'results' => $transreceiveproductitem->toArray(),
			'total'   => $total
		);

		return Response::json($transreceiveproductitems)
			->setCallback(\Input::get('callback'));

	}

	/**
	 *
	 * Proses Simpan Transreceiveproductitem
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
		/*==========  Sesuaikan dengan Field di table  ==========*/
		// $this->transreceiveproductitem->name = Input::get('name');
		// $this->transreceiveproductitem->info = Input::get('info');
		// $this->transreceiveproductitem->uuid = uniqid('New_');
		// $this->transreceiveproductitem->createby_id = \Auth::user()->id;
		// $this->transreceiveproductitem->lastupdateby_id = \Auth::user()->id;
		// $this->transreceiveproductitem->created_at = new Carbon();
		// $this->transreceiveproductitem->updated_at = new Carbon();
		$saved = $this->transreceiveproductitem->save() ? true : false;
		return Response::json(array(
			'success' => $saved,
			'results' => $this->transreceiveproductitem->toArray()
		))->setCallback();
	}

	/**
	 * Menghapus Transreceiveproductitem
	 *
	 * @param $id
	 *
	 * @return mixed
	 *
	 */
	public function delete($id)
	{

		if ($this->hasAccess()) {
			$deleted = $this->transreceiveproductitem
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
	 * @param $id
	 *
	 * @return mixed
	 */
	public function update($id)
	{
		$db = $this->transreceiveproductitem->find($id);
		/*==========  Sesuaikan  ==========*/
		// $db->name = Input::get('name');
		// $db->info = Input::get('info');
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
	 * Menampilkan Page Create data Transreceiveproductitem
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

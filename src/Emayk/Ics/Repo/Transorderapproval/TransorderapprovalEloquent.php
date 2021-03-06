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
 * Bussiness Logic Transorderapproval
 *
 **/

namespace Emayk\Ics\Repo\Transorderapproval;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class TransorderapprovalEloquent implements TransorderapprovalInterface
{
	protected $transorderapproval;
	protected $prefixdoc = 'PR-';

	function __construct(Transorderapproval $transorderapproval)
	{
		$this->transorderapproval = $transorderapproval;
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
		return $this->transorderapproval->find($id);
	}

	/**
	 * Mendapatkan Semua Transorderapproval
	 *
	 * @return mixed
	 */
	public function all()
	{
		$page               = \Input::get('page');
		$limit              = \Input::get('limit', 1);
		$start              = \Input::get('start', 0);
		$transorderapproval = $this->transorderapproval
			->orderBy('id', 'DESC')
			->skip($start)
			->take($limit)
			->get()->toArray();
		$total              = $this->transorderapproval
			->all()->count();

		$transorderapprovals = array(
			'success' => true,
			'results' => $transorderapproval,
			'total'   => $total
		);

		return Response::json($transorderapprovals)
			->setCallback(\Input::get('callback'));

	}

	/**
	 *
	 * Proses Simpan Transorderapproval
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
		 *
		 */
		if (Input::has('trxid')) {
			$trxId             = Input::get('trxid');
			$tmpOrder          = new \Emayk\Ics\Repo\Transorders\TransOrderTmp();
			$recordOrder       = $tmpOrder->findOrFail($trxId);
			$tmpOrderItems     = new \Emayk\Ics\Repo\Transorderdetails\Tmp();
			$recordOrderDetail = $tmpOrderItems->whereTrxid($trxId);


			/*Lakukan Pemindahan dari */
			return Response::json([
				'results' => [
					'id'   => 1,
					/*Purchase Request ID*/
					'prid' => time()
				]
			]);
			/*Proses Pemindahan*/
			/**
			 * -
			 */
		}
		/*==========  Sesuaikan dengan Field di table  ==========*/
		// $this->transorderapproval->name = Input::get('name');
		// $this->transorderapproval->info = Input::get('info');
		// $this->transorderapproval->uuid = uniqid('New_');
		// $this->transorderapproval->createby_id = \Auth::user()->id;
		// $this->transorderapproval->lastupdateby_id = \Auth::user()->id;
		// $this->transorderapproval->created_at = new Carbon();
		// $this->transorderapproval->updated_at = new Carbon();
		$saved = $this->transorderapproval->save() ? true : false;
		return Response::json(array(
			'success' => $saved,
			'results' => $this->transorderapproval->toArray()
		))->setCallback();
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

		if ($this->hasAccess()) {
			$deleted = $this->transorderapproval
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
		$db = $this->transorderapproval->find($id);
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
		return $this->delete($id);
	}


}

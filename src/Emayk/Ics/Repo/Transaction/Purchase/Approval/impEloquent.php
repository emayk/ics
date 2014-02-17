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


namespace Emayk\Ics\Repo\Transaction\Purchase\Approval;

use \Response;
use \Input;
use Illuminate\Support\Facades\Auth;

class impEloquent implements iApproval
{
	protected $approval;

	function __construct(Model $Approve)
	{
		$this->approval = $Approve;
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
		return $this->approval->find($id);
	}

	/**
	 * Mendapatkan Semua
	 *
	 * @return mixed
	 */
	public function all()
	{
		$page    = \Input::get('page');
		$limit   = \Input::get('limit', 1);
		$start   = \Input::get('start', 0);
		$approve = $this->approval
			->orderBy('id', 'DESC');
		if (Input::has('type')) {
//			$allowType = ['active', 'denied', 'agree', 'pending'];
			$type = Input::get('type');
			if ($type == 'agree') {
				$approve = $approve->whereStatus(2);
			} else {
				if ($type == 'denied') {
					$approve = $approve->whereStatus(3);
				} else {
					if ($type == 'new') {
						//jika baru maka ambil dari model purchase request bertipe status belum diprocess,
						$newapprove = $this->approval->getNewPr();
						$total      = $newapprove->count();
						$newapprove = $newapprove->skip($start)
							->take($limit)
							->get()->toArray();


						$approves = array(
							'success' => true,
							'results' => $newapprove,
							'total'   => $total
						);
						return Response::json($approves);
					} else {
						$approve = $approve->whereStatus(1)->orWhere('status', 4);
					}
				}
			}
		};

		if (Input::has('cmd')) {
			/*Mendapatkan Semua Item berdasarkan ID Approve */
			$getitems = Input::get('cmd');
			if ($getitems == 'getitems') {
				if (!Input::has('aprid')) throw new \Exception( 'Need Approve Id' );
				if (!Input::has('aprnumber')) throw new \Exception( 'Need Approve Number' );
				$id     = Input::get('aprid');
				$number = Input::get('aprnumber');
				$items  = $this->approval->getItems()->whereAprid($id);
				$count = $items->count();
				return Response::json(['success' => true,
					'results' => $items->get()->toArray(),
					'total' => $count
				]);
			}
//			return $items;
			return 'Get Items';
		}

		$total   = $approve->count();
		$approve = $approve->skip($start)
			->take($limit)
			->get()->toArray();


		$approves = array(
			'success' => true,
			'results' => $approve,
			'total'   => $total
		);

		return Response::json($approves);

	}

	/**
	 *
	 * Proses Simpan
	 *
	 * @return mixed
	 */
	public
	function store()
	{

		if (!$this->hasAccess()) {
			return Response::json(
				array(
					'success' => false,
					'reason'  => 'Action Need Login First',
					'results' => null
				))->setCallback();
		}

		if (Input::get('cmd')) {
			/*Proses Pindah dari trans_tr ke trans_app_item*/
			/*Jika cmd == getitems*/

			$cmd = Input::get('cmd');
			if ($cmd == 'getitems') {
				if (!Input::has('prid')) throw new \Exception( 'Butuh PR id' );
				if (!Input::has('prnumber')) throw new \Exception( 'Butuh PR Number' );
				$prid     = Input::get('prid');
				$prnumber = Input::get('prnumber');
				return $this->approval->createNewApproveRecordFromPr($prid, $prnumber);
			}
		}
	}

	/**
	 * Menghapus Taxtype
	 *
	 * @param $id
	 *
	 * @return mixed
	 *
	 */
	public
	function delete($id)
	{

		if ($this->hasAccess()) {
			$deleted = $this->approval
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
	public
	function update($id)
	{
		$db = $this->approval->find($id);
		/*==========  Sesuaikan  ==========*/
		$db->name = Input::get('name');
		$db->info = Input::get('info');
//        $db->uuid = uniqid('Update_');
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
	protected
	function  hasAccess()
	{
		return ( !Auth::guest() );
	}

	/**
	 *
	 * Menampilkan Page Create data Taxtype
	 *
	 **/

	public
	function create()
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
	public
	function show($id)
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
	public
	function edit($id)
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
	public
	function destroy($id)
	{
		return $this->delete($id);
	}

}

 
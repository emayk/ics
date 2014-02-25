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
	 * @throws \Exception
	 * @return mixed
	 */
	public function all()
	{
		/*Check Semua yang sudah diproses akan disetup Status sudah diproses*/

		$page    = \Input::get('page');
		$limit   = \Input::get('limit', 1);
		$start   = \Input::get('start', 0);
		$approve = $this->approval;
		$approve = $approve->orderBy('id', 'DESC');

		/*Mendapatkan Approval List berdasarkan Type*/
		if (Input::has('type')) {
			$type    = Input::get('type');
			$approve = $this->getApprovalByType($type, $approve);
		};

		/**/
		if (Input::has('cmd')) {
			/*Mendapatkan Semua Item berdasarkan ID Approve */
			$getitems = Input::get('cmd');
			if ($getitems == 'getitems') {
				if (!Input::has('aprid')) throw new \Exception( 'Need Approve Id' );
				if (!Input::has('aprnumber')) throw new \Exception( 'Need Approve Number' );
				$id     = Input::get('aprid');
				$number = Input::get('aprnumber');
				return Response::json($this->getItemApproval($id, $number));
			}

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
	 * Mendapatkan Daftar Approval berdasarkan Type Input yang diberikan
	 *
	 * @param $type
	 * @param $approve
	 *
	 * @return mixed
	 */
	public function getApprovalByType($type, $approve)
	{

		switch ($type) {
			case 'agree' :
				$approve = $approve->Agree();
				break;
			case 'denied' :
				$approve = $approve->Denied();
				break;
			case 'new' :
				$approve = $approve->NewAndPending();
				break;
			case 'process' :
				$approve = $approve->Processed();
				break;
			case 'pending' :
				$approve = $approve->Pending();
				break;
				defaults :
				$approve = $approve->NewAndPending();
		}

		return $approve;
	}


	/**
	 * Mendapatkan Item Approval berdasarkan id dan trxnumber
	 *
	 * @param $aprId
	 * @param $aprNumber
	 *
	 * @throws \Exception
	 * @internal param $id
	 * @internal param $trxnumber
	 *
	 * @return array
	 */
	public function getItemApproval($aprId, $aprNumber)
	{

		/*Check PR apakah sudah ada ? */
		$approval = $this->approval->findOrFail($aprId);
		if ($approval->trxnumber != $aprNumber) throw new \Exception( 'Approval Number Tidak cocok' );
		$newO = true;
		if ($newO) {
			$itemApproval = $this->approval->getItems()->whereAprId($aprId)->where('status', '!=', 2);
			$results      = $itemApproval->get()->toArray();
		} else {
			$itemApproval = $approval->item;
			$results      = $itemApproval->toArray();
		}

		return [
			'success'    => true,
			'results'    => $results,
			'totalitems' => intval($itemApproval->count()),
			'trxnumber'  => $approval->trxnumber,
			'id'         => $approval->id,
			'created_at' => $approval->created_at,
			'status'     => $approval->status,
//			'debug' => ['approval'=> $approval->toArray()]
		];

	}

	/**
	 * Proses Simpan
	 *
	 * @throws \Exception
	 * @return mixed
	 */
	public function store()
	{


		/**
		 * Tidak ada Proses Penyimpanan dari request http,
		 *
		 * fungsi ini digunakan untuk mengambil item
		 */

//		if (!$this->hasAccess()) {
//			return Response::json(
//				array(
//					'success' => false,
//					'reason'  => 'Action Need Login First',
//					'results' => null
//				))->setCallback();
//		}


		if (Input::has('setstatus')) {
			$aprid = Input::get('aprid');
			if (!Input::has('aprnumber')) throw new \Exception( 'Butuh Approval Number' );
			$aprnumber = Input::get('aprnumber');
			$approval  = $this->approval->findOrFail($aprid);


			/*Debug */
//			return $approval->moveApprovalToOrder();

			if ($approval->trxnumber !== $aprnumber) throw new \Exception( 'Nomor Approval tidak sesuai' );
			$totalprocess = $approval->totalitems;
			$totalitems   = intval($approval->totalagree);

			if ($totalitems == $totalprocess) {
				/*@todo : Proses Simpan Document dari Approval ke PO */

				$approval->status = 5;
				$approval->save();
			};

			return array_merge([
					'success' => true,
//			                    'ponumber' => 'PO-' . time()
				],
				$approval->toArray());
		}


		if (Input::get('cmd')) {
//			/*Proses Pindah dari trans_tr ke trans_app_item*/
//			/*Jika cmd == getitems*/
//
			$cmd = Input::get('cmd');
			if ($cmd == 'getitems') {
				/*parameter pencarian*/
				$params_adjid = 'aprid';
				$adjnumber    = 'aprnumber';
				if (!Input::has($params_adjid)) throw new \Exception( 'Butuh Adjustment id' );
				if (!Input::has($adjnumber)) throw new \Exception( 'Butuh Adjustment Number' );
				$aprId     = Input::get($params_adjid);
				$aprNumber = Input::get($adjnumber);
				return Response::json($this->getItemApproval($aprId, $aprNumber));
			}
		}

		return Response::json([
			'success' => true,
			'results' => Input::all(),
			'msg'     => 'Tidak ada proses simpan pada approval,
			pembuatan dilakukan saat penyesuaian pengajuan pembelian'
		]);


	}


	/**
	 * Menghapus
	 *
	 * @param $id
	 *
	 * @return mixed
	 *
	 */
	public function delete($id)
	{

		if ($this->hasAccess()) {
			$deleted = $this->approval
				->findOrFail($id);
		}
		/**
		 * Tidak ada proses hapus
		 * Yang ada pemindahan status
		 */
		return Input::all();
	}

	/**
	 * Update Informasi
	 *
	 * @param int $id
	 *
	 * @throws \Exception
	 * @return mixed
	 */
	public function update($id)
	{

//		return Input::all();
		$approve         = $this->approval->getItems()->findOrFail($id);
		$approved        = ( Input::get('approved') == 'true' ) ? 2 : 3;
		$approve->status = $approved;
		$approve->save();
		return $approve;
	}

	public function updatedisabled($id)
	{
		$approve         = $this->approval->getItems()->findOrFail($id);
		$approved        = ( Input::get('approved') == 'true' ) ? 2 : 3;
		$approve->status = $approved;
		$approve->save();
		return $approve;
		/*Set Item dari ID Approval yang diberikan*/
//		if (Input::has('setitemapproved')) {
//			$setitemapproved = Input::get('setitemapproved');
//			if ($setitemapproved) {
//				$approved = Input::get('approved');
//				if (!Input::has('approved')) throw new \Exception( 'Butuh Mode Approve ' );
//				$status = ( $approved == 'true' ) ? 2 : 3;
//				if (!Input::has('setitemid')) throw new \Exception( 'Silahkan Masukan parameter Item Id untuk di approved' );
//				$itemid               = Input::get('setitemid');
//				$approvalitem         = $this->approval->getItems()->findOrFail($itemid);
//				$approvalitem->status = $status;
//				$success              = $approvalitem->save();
//
//				$results = array_merge(
//					[
//						'success' => $success,
//						'reason'  => ( $success ) ? 'Penyimpanan Berhasil' : ' gagal disimpan'
//					], $approvalitem->toArray());
//
//			} else {
//				$results = ['success' => false, 'reason' => 'Penyimpanan gagal '];
//			};
//			return Response::json($results);
//		}


		if (Input::has('setitem')) {
			$setitem = Input::get('setitem');
			if ($setitem) {
				if (!Input::has('setitems')) {
					throw new \Exception( 'Silahkan Masukan parameter setitems untuk edit items' );
				}
				$setitems = Input::get('setitems');

				if (!Input::has('setitemid')) {
					throw new \Exception( 'Silahkan Masukan parameter setitemid untuk edit item ' );
				}
				$itemId   = Input::get('setitemid');
				$item     = $this->approval->getItems()->findOrFail($itemId);
				$approved = Input::get('approved');
				$status   = ( $approved ) ? 2 : 3;

				$item->status = $status;


//				$item             = $this->approval->getItems();
//				$item             = $item->findOrFail($id);
//				$item->qty        = Input::get('qty');
//				$item->supplierid = Input::get('supplierid', 0);
//				$item->contactid  = Input::get('contactid', 0);
//				$approve          = Input::get('approved');
//				$status           = ( $approve == 'true' ) ? 2 : 3;
//				$item->status     = $status;
//				$item->price      = Input::get('price', 0);
//				$aprid            = Input::get('aprid');
//				$item->aprid      = $aprid;

				if ($item->save()) {
					return Response::json($item->toArray());
				} else {
					return Response::json(['success' => false, 'results' => Input::all(), 'total' => 1]);
				}
			}
		}

		if (Input::has('cmd')) {
			$cmd = Input::get('cmd');
			if ($cmd == 'setstatus') {
				$statusDecode = base64_decode(Input::get('status', 'pending'));

				if ($statusDecode == 'approve') {
					$status = 2; // approve / disetujui
				} else {
					if ($statusDecode == 'denied') {
						$status = 3; // ditolak
					} else {
						$status = 4; //ditunda dan sudah diproses
					}
				}

				$recordApr         = $this->approval->findOrFail($id);
				$recordApr->status = $status;
				return $this->savedAndResponseJson($recordApr);
			}
		}


		/*Setting dan Simpan*/
//		return Response::json(['success' => false, 'results' => Input::all(), 'decoded' => base64_decode(Input::get('status')), 'total' => 1]);
	}

	/**
	 * @param $record
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
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

 
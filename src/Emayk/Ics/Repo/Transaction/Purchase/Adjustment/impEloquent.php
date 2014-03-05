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


namespace Emayk\Ics\Repo\Transaction\Purchase\Adjustment;

use \Response;
use \Input;
use Illuminate\Support\Facades\Auth;

class impEloquent implements iAdjustment
{

	protected $adjustment;

	function __construct(Eloquent $Adjustment)
	{
		$this->adjustment = $Adjustment;
	}

	/**
	 * Proses Ke Approval
	 *
	 * @throws \Exception
	 * @return mixed
	 */
	public function processToAproval()
	{
		/*Security*/
		if (!Input::has('_token')) throw new \Exception( 'Butuh Parameter Token Security' );
		if (!Input::has('adjpr')) throw new \Exception( 'Butuh Parameter Adjustment ID yang akan diajukan' );
		if (!Input::has('adjnumber')) throw new \Exception( 'Butuh Parameter Adjustment Number yang akan diajukan' );
		if (!Input::has('setitemapproved')) throw new \Exception( 'Butuh Parameter item yang akan diajukan' );


		$success = true;
		/*List Item Id yang akan diajukan*/
		$setitemapproved = Input::get('setitemapproved');
		$adjustmentId    = Input::get('adjpr');
		$adjustmentTrx   = Input::get('adjnumber');
		$adjustment      = $this->adjustment->findOrFail($adjustmentId);

//		if ($setitemapproved == 'movestatus') {
//			$adjustment->status = 5;
//			$success = $adjustment->save();
//			$response      = ( $success )
//				? [
//					'success' => true,
//					'msg'     => 'Penyesuaian Pembelian sudah berhasil diajukan ke Management <br/>'
//				]
//				: ['success' => false, 'reason' => 'Cannot Approve , silahkan coba lagi'];
//			return Response::json($response);
//		}

		$items = ( strpos($setitemapproved, ',') ) ? explode(",", $setitemapproved) : [$setitemapproved];
		if ($adjustment->status != 1) {
			// nilai 1 == belum diproses;
			/**
			 * Dapatkan Approval Trx dari Trans Approval
			 */
//			return time();
			$approval = $this->adjustment->oApproval();
			$prefix   = $approval->getPrefix();
			$approval = $approval->whereTrxnumber($prefix . $adjustment->trxnumber)->first();

		} else {
			$approval = $this->adjustment
				->oApproval()
				->moveAdjustmentToApproval($adjustmentId, $adjustmentTrx, $items);
		}

//		return $newApproval;
//		$noTrxApproval   = 'Adj-PR-' . time();
		$noTrxApproval = $approval->trxnumber;
		$response      = ( $success )
			? [
				'success' => true,
				'msg'     => 'Penyesuaian Pembelian sudah berhasil diajukan ke Management <br/>untuk diproses dengan nomor ' . $noTrxApproval,
				'items'   => $items
			]
			: ['success' => false, 'reason' => 'Cannot Approve , silahkan coba lagi'];
		return Response::json($response);
	}

	/**
	 *
	 * Mendapatkan Record  berdasarkan ID yang diberikan
	 *
	 * @param  int $id ID Record
	 *
	 * @return \Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Eloquent | static
	 **/

	public function find($id)
	{
		return $this->adjustment->findOrFail($id);
	}

	/**
	 * Mendapatkan Semua
	 *
	 * @throws \Exception
	 * @return mixed
	 */
	public function all()
	{
		$page  = \Input::get('page');
		$limit = \Input::get('limit', 1);
		$start = \Input::get('start', 0);
		if (Input::has('getitems')) {
			if (!Input::has('adjid')) throw new \Exception( 'Need Adj Id' );
			$adjid = Input::get('adjid');
			if (!is_numeric($adjid)) throw new \Exception( 'Adj Id bukan angka' );
			$adj          = $this->find($adjid);
			$countAdjItem = $adj->items->count();

			return Response::json([
				'success' => true,
				'total'   => $countAdjItem,
				'results' => $adj->items->toArray()
			]);
		}
//		if ($this->adjustment->hasNewPr()) {
//			$approve = $this->adjustment->getAllnew();
//		} else {
		$approve = $this->adjustment
			->orderBy('id', 'DESC');
//		}
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

		if (Input::get('cmd')) {
			/*Proses Pindah dari trans_tr ke trans_app_item*/
			/*Jika cmd == getitems*/

			$cmd = Input::get('cmd');
			if ($cmd == 'getitems') {
				if (!Input::has('prid')) throw new \Exception( 'Butuh PR id' );
				if (!Input::has('prnumber')) throw new \Exception( 'Butuh PR Number' );

				$prid     = Input::get('prid');
				$prnumber = Input::get('prnumber');

				/*Check PR apakah sudah ada ? */
				$record = $this->adjustment->createNewApproveRecordFromPr($prid, $prnumber);
				if (is_array($record)) $record = $record[ 0 ];
				return Response::json(['success' => true, 'results' => $record]);
			}
		}
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
			$deleted = $this->adjustment
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
	 * @param int $id
	 *
	 * @throws \Exception
	 * @return mixed
	 */
	public function update($id)
	{

		/*Set Item dari ID yang diberikan*/
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


//				return Input::all();

				$item             = $this->adjustment->getItems();
				$item             = $item->findOrFail($id);
				$item->qty        = Input::get('qty');
				$item->supplierid = Input::get('supplierid', 0);
				$item->contactid  = Input::get('contactid', 0);
				$approve          = Input::get('approved');
				$status           = ( $approve == 'true' ) ? 2 : 3;
				$item->status     = $status;
				$item->dp         = Input::get('dp');
				$item->price      = Input::get('price', 0);
				$aprid            = Input::get('aprid');

				$item->aprid = $aprid;

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

				$recordApr         = $this->adjustment->findOrFail($id);
				$recordApr->status = $status;
				return $this->savedAndResponseJson($recordApr);
			}
		}


		/*Setting dan Simpan*/
		return Response::json(['success' => false, 'results' => Input::all(), 'decoded' => base64_decode(Input::get('status')), 'total' => 1]);
	}

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

	/**
	 * Mendapatkan Object dari Pr Id
	 *
	 * @param $purchaseOrderId
	 *
	 * @return mixed
	 */
	public function findByPrid($purchaseOrderId)
	{
		// TODO: Implement findByPrid() method.
	}
}


 
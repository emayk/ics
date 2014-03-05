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


namespace Emayk\Ics\Repo\Transaction\Purchase\Request;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class impEloquent implements iRequest
{
	protected $pr;
	protected $prefixpr = 'PR-';

	function __construct(Model $PurchaseRequest)
	{
		$this->pr = $PurchaseRequest;
	}

	/**
	 *
	 * Mendapatkan Record Users berdasarkan ID yang diberikan
	 *
	 * @param  int $id ID Record
	 *
	 * @return Model Record Users
	 **/

	public function find($id)
	{
		return $this->pr->find($id);
	}

	/**
	 * Mendapatkan Semua Users
	 *
	 * @return mixed
	 */
	public function all()
	{
		$page  = \Input::get('page');
		$limit = \Input::get('limit', 1);
		$start = \Input::get('start', 0);
		$pr    = $this->pr
			->orderBy('id', 'DESC')
			->skip($start)
			->take($limit)
			->get()->toArray();
		$total = $this->pr
			->all()->count();

		$listpr = array(
			'success' => true,
			'results' => $pr,
			'total'   => $total
		);

		return Response::json($listpr);
	}

	protected function generateTmpDocTrxPr()
	{
		$doc = new Tmp\Doc();
		$out = $doc->create(['trxnumber' => $this->prefixpr . '_tmp_-' . time()]);
		return Response::json([
			'success' => true,
			'results' => $out->toArray(),
			'taken'   => time()
		]);

	}

	/**
	 *
	 * Proses Simpan Users
	 *
	 * @throws \Exception
	 * @return mixed
	 */
	public function store()
	{
//		if (!$this->hasAccess()) {
//			return Response::json(
//				array(
//					'success' => false,
//					'reason'  => 'Action Need Login First',
//					'results' => null
//				))->setCallback();
//		}

		/*Generate Trx Tmp*/

		if (Input::has('gdoc')) {
			return $this->generateTmpDocTrxPr();
		}
		if (!Input::has('tmptrxid')) {
			throw new \Exception( 'Butuh Transaction Id' );
		}

		if (Input::has('cmd')) {
			$cmd = Input::get('cmd');
			if ($cmd == 'save') {
				if (Input::has('options')) {
					$options = Input::get('options');
					if ($options !== 'movetoadj') throw new \Exception('Unknown Options');

					/*Pemindahan Tmp ke Adjustment*/
					$tmptrxid = Input::get('tmptrxid');
					$tmptrx   = new Tmp\Doc();
					$docTemp  = $tmptrx->findOrFail($tmptrxid);
					/*1 = belum diproses, 2 = approve, 3 = denied, 4 = ditunda*/
					$pr = $this->pr->create(
						[
							'trxnumber' => 'PR-' . time(),
							'status'    => 1
						]
					);

					$adjustment    = new \Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Eloquent();
					$recAdjustment = $adjustment->createRecord($pr->id, $pr->trxnumber);

					$tmpitem  = new Tmp\Item();
					$newitems = [];
					foreach ($docTemp->tmpitems as $item) {
						/*Lakukan Pemindahan */
						$newitems[ ] = $pr->Items()->create(
							[
								'product_id' => $item->product_id,
								'qty'        => $item->qty,
								'prid'       => $pr->id,
								/*1 = belum diproses, 2 = approve, 3 = denied, 4 = ditunda*/
								'status'     => 1
							]
						);

						$adjustmentItem = $recAdjustment->getItem()
							->createNewRecord($item->product_id,
								$item->qty, $recAdjustment->id,
								$recAdjustment->trxnumber,
								$pr->id, $userId = 1
							);
					}
					$docTemp->tmpitems()->delete();
//		$docTemp->delete();

					return Response::json(array(
						'success' => true,
						'results' => $pr->toArray()
					));
				} else {
					/*Setup tambah biasa */
				}
			}
		}
		/*trxid = tmptrxid dari Doc*/

	}

	/**
	 * Menghapus Users
	 *
	 * @param $id
	 *
	 * @return mixed
	 *
	 */
	public function delete($id)
	{

		if ($this->hasAccess()) {
			$deleted = $this->pr
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
		$db = $this->pr->find($id);
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
	 * Menampilkan Page Create data Users
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


 
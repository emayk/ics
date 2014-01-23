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
 * Bussiness Logic Transorders
 *
 **/

namespace Emayk\Ics\Repo\Transorders;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class TransordersEloquent implements TransordersInterface
{
	protected $transorders;

	function __construct(Transorders $transorders)
	{
		$this->transorders = $transorders;
	}

	/**
	 *
	 * Mendapatkan Record Transorders berdasarkan ID yang diberikan
	 *
	 * @param  int $id ID Record
	 *
	 * @return Model Record Transorders
	 **/

	public function find($id)
	{
		return $this->transorders->find($id);
	}

	/**
	 * Mendapatkan Semua Transorders
	 *
	 * @return mixed
	 */
	public function all()
	{
		$page        = \Input::get('page');
		$limit       = \Input::get('limit', 1);
		$start       = \Input::get('start', 1);
		$transorders = $this->transorders
			->orderBy('id', 'DESC')
			->skip($start)
			->take($limit)
			->get()->toArray();
		$total       = $this->transorders
			->all()->count();

		$transorderss = array(
			'success' => true,
			'results' => $transorders,
			'total'   => $total
		);

		return Response::json($transorderss)
			->setCallback(\Input::get('callback'));

	}

	/**
	 *
	 * Proses Simpan Transorders
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
		$this->transorders->approve_id  = 2; // 1 = Yes, Selain 1 == No (default tidak )
		$this->transorders->cp_id       = Input::get("cp_id");
		$this->transorders->credit      = Input::get("credit");
		$this->transorders->curr_id     = Input::get("curr_id");
		$da                             = Input::get("delivery_at");
		$deliverycount                  = $this->transorders->where('delivery_at', $da)->get()->count();
		$nodoc                          = $deliverycount+1;
		$this->transorders->delivery_at = $da;
		$this->transorders->rate        = Input::get("kurs");
		$this->transorders->nodoc       = 'Sales-Order-' . $nodoc ;
//			Input::get("nodoc");
		$this->transorders->paymenttype_id  = Input::get("paymenttype_id");
		$this->transorders->tax_id          = Input::get("ppn_id");
		$this->transorders->status          = 1; //1 = Open , 2 = close
		$this->transorders->supplier_id     = Input::get("supplier_id");
		$this->transorders->type_id         = Input::get("type_id");
		$this->transorders->warehouse_id    = Input::get("warehouse_id");
		$this->transorders->uuid            = uniqid('New_');
		$this->transorders->createby_id     = \Auth::user()->id;
		$this->transorders->lastupdateby_id = \Auth::user()->id;
		$this->transorders->created_at      = new Carbon();
		$this->transorders->updated_at      = new Carbon();
		$saved                              = $this->transorders->save() ? true : false;
		return Response::json(array(
			'success' => $saved,
			'results' => $this->transorders->toArray()
		))->setCallback();
	}

	/**
	 * Menghapus Transorders
	 *
	 * @param $id
	 *
	 * @return mixed
	 *
	 */
	public function delete($id)
	{

		if ($this->hasAccess()) {
			$deleted = $this->transorders
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
		$db = $this->transorders->find($id);
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
	 * Menampilkan Page Create data Transorders
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

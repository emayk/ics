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
 * Bussiness Logic Units
 *
 **/

namespace Emayk\Ics\Repo\Units;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class UnitsEloquent implements UnitsInterface
{
	protected $units;

	function __construct(Units $units)
	{
		$this->units = $units;
	}

	/**
	 *
	 * Mendapatkan Record Units berdasarkan ID yang diberikan
	 *
	 * @param  int $id ID Record
	 *
	 * @return Model Record Units
	 **/

	public function find($id)
	{
		return $this->units->find($id);
	}

	/**
	 * Mendapatkan Semua Units
	 *
	 * @return mixed
	 */
	public function all()
	{
		$page  = \Input::get('page');
		$limit = \Input::get('limit', 1);
		$start = \Input::get('start', 1);

		if (Input::has('selected')) {
			$id     = Input::get('selected');
			$record = $this->units->findOrFail($id);
			return Response::json([
				'success' => true, 'error' => false,
				'results' => $record->toArray()
			]);
		}

		$units = $this->units;
		$total = $units->count();

		$units = $units->orderBy('updated_at', 'DESC')
			->skip($start)
			->take($limit)
			->get()->toArray();

		$unitss = array(
			'success' => true,
			'results' => $units,
			'total'   => $total
		);

		return Response::json($unitss)
			->setCallback(\Input::get('callback'));

	}

	/**
	 *
	 * Proses Simpan Units
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
		$this->units->name            = Input::get('name');
		$this->units->info            = Input::get('info');
		$this->units->type_id         = Input::get('type_id');
		$this->units->uuid            = uniqid('New_');
		$this->units->createby_id     = \Auth::user()->id;
		$this->units->lastupdateby_id = \Auth::user()->id;
		$this->units->created_at      = new Carbon();
		$this->units->updated_at      = new Carbon();
		$saved                        = $this->units->save() ? true : false;
		return Response::json(array(
			'success' => $saved,
			'results' => $this->units->toArray()
		))->setCallback();
	}

	/**
	 * Menghapus Units
	 *
	 * @param $id
	 *
	 * @return mixed
	 *
	 */
	public function delete($id)
	{
		if ($this->hasAccess()) {
			$unit = $this->units
				->findOrFail($id);


			return ( $unit->delete() )
				? Response::json([
					/*Extjs untuk delete dan fire callback model.destroy() method di setup false */
					'success' => false,
					'error'   => false
				])
				: Response::json([
					'success' => false,
					'error'   => true,
					'reason'  => 'Cannot Deleted'
				], 500);
		} else {
			return Response::json([
				'success' => false,
				'error'   => true,
				'reason'  => 'Not Authenticated'
			], 500);
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
		$db = $this->units->find($id);
		/*==========  Sesuaikan  ==========*/
		// $db->name = Input::get('name');
		$db->type_id = Input::get('type_id');
		$db->info    = Input::get('info');
		$db->uuid    = uniqid('Update_');
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
	 * Menampilkan Page Create data Units
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

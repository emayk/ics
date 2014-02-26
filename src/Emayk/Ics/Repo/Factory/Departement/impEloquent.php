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


namespace Emayk\Ics\Repo\Factory\Departement;


use Response;
use Input;

class impEloquent implements iDepartement
{
	/**
	 * @var Dept
	 */
	protected $departement;

	/**
	 * @param \Emayk\Ics\Repo\Factory\Departement\Eloquent $Departement
	 */
	function __construct(Eloquent $Departement)
	{
		$this->departement = $Departement;
	}

	/**
	 * Mendapatkan Semua Departement
	 */
	public function all()
	{
		return $this->getAll();
	}

	/**
	 * @param $id
	 *
	 * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|static
	 */
	public function getById($id)
	{
		return $this->departement->find($id);
	}

	/**
	 * @return mixed
	 */
	public function getAll()
	{
		if (Input::has('idselected')) {
			$id = Input::get('idselected');
			return $this->show($id);
		}
		$page  = \Input::get('page');
		$limit = \Input::get('limit', 1);
		$start = \Input::get('start', 1);
		$_data = $this->departement->orderBy('id', 'DESC')->skip($start)->take($limit)->get()->toArray();
		$total = $this->departement->all()->count();

		$data = array(
			'success' => true,
			'results' => $_data,
			'total'   => $total
		);
		return \Response::json($data)
			->setCallback(\Input::get('callback'));

	}

	/**
	 * Simpan Departement
	 * (New Departement)
	 *
	 * @return mixed
	 */
	public function save()
	{
		$this->departement->name            = Input::get('name');
		$this->departement->info            = Input::get('info');
		$this->departement->uuid            = uniqid('New_');
		$this->departement->createby_id     = Auth::user()->id;
		$this->departement->lastupdateby_id = Auth::user()->id;
		$this->departement->created_at      = new Carbon();
		$this->departement->updated_at      = new Carbon();
		$saved                              = $this->departement->save() ? true : false;
		return Response::json(array(
			'success' => $saved,
			'results' => $this->departement->toArray()
		))->setCallback();
	}

	/**
	 * Menghapus Departement
	 *
	 * @param $id
	 *
	 * @return mixed
	 *
	 */
	public function delete($id)
	{
		if ($this->hasAccess()) {
			$deleted = $this->departement->find($id)->delete();
			return Icsoutput::toJson(array(
				'results' => $deleted
			), $deleted);
		} else {
			return Icsoutput::toJson(array(
				'results' => false,
				'reason'  => 'Dont Have Access to Delete '
			), false);
		}
	}

	/**
	 * Update Informasi Departement
	 *
	 * @param $id
	 *
	 * @return mixed
	 */
	public function update($id)
	{
		$db        = $this->departement->find($id);
		$canUpdate = $db->canUpdate();
		if ($canUpdate) {
			/** @noinspection PhpUndefinedFieldInspection */
			$db->name = Input::get('name');
			/** @noinspection PhpUndefinedFieldInspection */
			$db->info = Input::get('info');
			/** @noinspection PhpUndefinedFieldInspection */
			$db->uuid = uniqid('Update_');

			$updated = ( $db->save() );
			return $this->response($db->toArray(), $updated);
		}
		return $this->response(array(), $canUpdate);
	}

	/**
	 * @return bool
	 */
	protected function  hasAccess()
	{
		return ( isset( Auth::user()->id ) );
	}

	/**
	 * @param array  $data
	 * @param bool   $success
	 * @param string $reason
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	protected function response(array $data, $success = true, $reason = 'Tidak bisa diproses')
	{
		$addition = ( !$success )
			? array('reason' => $reason, 'error' => !$success)
			: array('error' => !$success);

		$response = array_merge($data, $addition);
		return Response::json($response);

	}

	public function show($id)
	{
		$dept = $this->departement->findOrFail($id);
		return Response::json([
			'success' => true,
			'error'   => false,
			'results' => $dept->toArray()
		]);
	}

	/**
	 * Menyimpan Resource Baru
	 *
	 * @return \Emayk\Ics\Repo\Factory\Response
	 */
	public function store()
	{
		return $this->save();
	}

	/**
	 * Menampilkan Form New
	 *
	 * @return \Emayk\Ics\Repo\Factory\Response
	 */
	public function create()
	{
		// TODO: Implement create() method.
	}

	/**
	 * Menampilkan Data Untuk di edit
	 *
	 * @param  int $id
	 *
	 * @return \Emayk\Ics\Repo\Factory\Response
	 */
	public function edit($id)
	{
		// TODO: Implement edit() method.
	}

	/**
	 * Mencari Record berdasarkan Primary key
	 *
	 * @param  int $id
	 *
	 * @return \Emayk\Ics\Repo\Factory\Response
	 */
	public function find($id)
	{
		return $this->departement->findOrFail($id)->toArray();
	}

	/**
	 * Remove from Storage
	 *
	 */
	public function destroy($id)
	{
		return $this->delete($id);
	}
}

 
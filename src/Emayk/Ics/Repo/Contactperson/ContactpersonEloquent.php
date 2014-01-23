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
 * Bussiness Logic Contactperson
 *
 **/

namespace Emayk\Ics\Repo\Contactperson;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class ContactpersonEloquent implements ContactpersonInterface
{
	protected $contactperson;

	function __construct(Contactperson $contactperson)
	{
		$this->contactperson = $contactperson;
	}

	/**
	 *
	 * Mendapatkan Record Contactperson berdasarkan ID yang diberikan
	 *
	 * @param  int $id ID Record
	 *
	 * @return Model Record Contactperson
	 **/

	public function find($id)
	{
		return $this->contactperson->find($id);
	}

	/**
	 * Mendapatkan Semua Contactperson
	 *
	 * @return mixed
	 */
	public function all()
	{
		$page          = \Input::get('page');
		$limit         = \Input::get('limit', 1);
		$start         = \Input::get('start', 1);
		$contactperson = $this->contactperson;
//            ->orderBy('id','DESC')

		if (Input::has('parent_id')) {
			$parentId      = Input::get('parent_id');
			$contactperson = $contactperson->where('parent_id', $parentId);
		}

		if (Input::has('parent_type')) {
			$parentType    = ucfirst(Input::get('parent_type'));
			$parentType    = '\Emayk\Ics\Repo\\' . $parentType . '\\' . $parentType;
			$contactperson = $contactperson->where('parent_type', $parentType);
		}

		$total         = $contactperson->count();
		$contactperson = $contactperson->skip($start)
			->take($limit)
			->get()->toArray();

		$contactpersons = array(
			'success' => true,
			'results' => $contactperson,
			'total'   => $total
		);

		return Response::json($contactpersons)
			->setCallback(\Input::get('callback'));

	}


	/**
	 *
	 * Proses Simpan Contactperson
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
		 * Jika Post Id belum ada lakukan create
		 */

		/**
		 * Jika Departement Id belum ada lakukan create
		 */

		/*==========  Sesuaikan dengan Field di table  ==========*/
		// $this->contactperson->name = Input::get('name');
		// $this->contactperson->info = Input::get('info');
		// $this->contactperson->uuid = uniqid('New_');
		// $this->contactperson->createby_id = \Auth::user()->id;
		// $this->contactperson->lastupdateby_id = \Auth::user()->id;
		// $this->contactperson->created_at = new Carbon();
		// $this->contactperson->updated_at = new Carbon();
		$saved = $this->contactperson->save() ? true : false;
		return Response::json(array(
			'success' => $saved,
			'results' => $this->contactperson->toArray()
		))->setCallback();
	}

	/**
	 * Menghapus Contactperson
	 *
	 * @param $id
	 *
	 * @return mixed
	 *
	 */
	public function delete($id)
	{

		if ($this->hasAccess()) {
			$deleted = $this->contactperson
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
		$db = $this->contactperson->find($id);
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
	 * Menampilkan Page Create data Contactperson
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

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
use Emayk\Ics\Repo\Suppliers\Suppliers;
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
	 * @throws \Exception
	 * @return mixed
	 */
	public function all()
	{
		$page          = \Input::get('page');
		$limit         = \Input::get('limit', 1);
		$start         = \Input::get('start', 0);

		/*Jika Ambil Contact Berdasarkan Name Supplier /Buyer*/
		if (Input::has('pname')) {
			if (!Input::has('ptype')) throw new \Exception( 'Butuh Parameter Type' );

			$name       = Input::get('pname');
			$ptype      = Input::get('ptype');
			$parentId = 0;
			if ($ptype == 'supplier'){
				$supplier = new \Emayk\Ics\Repo\Factory\Supplier\Eloquent();
				$parentId = $supplier->Name($name)->first()->id;
			}else{
				if ($ptype==='buyer'){
					/*@todo : siapkan untuk model lain*/
					$parentId = 1;
				}
			}
			$parentType = $this->contactperson->getOwnerType($ptype);
			$contacts   = $this->contactperson->whereParentId($parentId)
				->whereParentType($parentType);
			$total = $contacts->count();
			$contacts = $contacts->skip($start)
				->take($limit)
				->get()->toArray();

			$contactpersons = array(
				'success' => true,
				'results' => $contacts,
				'total'   => $total
			);

			return Response::json($contactpersons);
		};
		$this->checkParams();


		$contactperson = $this->contactperson;
		$parentId      = Input::get('parent_id');
		$parentType    = Input::get('parenttype');
		$parentType    = $this->contactperson->getOwnerType($parentType);
		$contactperson = $contactperson->whereParentId($parentId)
			->whereParentType($parentType);

		if (Input::has('contactname')) {
			$contactname   = Input::get('contactname');
			$contactperson = $contactperson->where('name', 'LIKE', "%$contactname%");
		}

		$contactperson = $contactperson->with('position', 'departement')
			->orderBy('updated_at', 'DESC');
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
	 * Check Parameters
	 *
	 * @throws \Exception
	 */
	protected function checkParams()
	{
		if (( !Input::has('parent_id') ) or ( !Input::has('parenttype') )) {
			throw new \Exception( 'Not Enough parameter please provider parameter id and type' );
		}
	}

	/**
	 *
	 * Proses Simpan Contactperson
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

		/**
		 * Jika Post Id belum ada lakukan create
		 */

		/**
		 * Jika Departement Id belum ada lakukan create
		 */

		/*==========  Sesuaikan dengan Field di table  ==========*/
		$this->checkParams();

		$type  = Input::get('parenttype');
		$types = ['supplier', 'office', 'buyer'];

		if (!in_array($type, $types)) throw new \Exception( 'Parent Type salah' );

		$uid                                  = Auth::user()->id;
		$this->contactperson->parent_id       = Input::get('parent_id');
		$this->contactperson->parent_type     = $this->contactperson->getOwnerType($type);
		$this->contactperson->name            = Input::get("name");
		$this->contactperson->info            = Input::get("info", ' ');
		$this->contactperson->pos_id          = Input::get("pos_id");
		$this->contactperson->dept_id         = Input::get("dept_id");
		$this->contactperson->phone           = Input::get("phone");
		$this->contactperson->email           = Input::get("email");
		$this->contactperson->fax             = Input::get("fax");
		$this->contactperson->uuid            = uniqid('New_');
		$this->contactperson->createby_id     = $uid;
		$this->contactperson->lastupdateby_id = $uid;
		$this->contactperson->created_at      = new Carbon();
		$this->contactperson->updated_at      = new Carbon();
		$saved                                = $this->contactperson->save() ? true : false;

		return Response::json([
				'success' => $saved,
				'results' => $this->contactperson->toArray()
			]
		)->setCallback();

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

		$this->checkParams();

		if ($this->hasAccess()) {
			$contact = $this->contactperson
				->find($id);


			return ( $contact->delete() )
				? Response::json([
					'success' => true,
					'error'   => false,
				])
				: Response::json([
					'success' => false,
					'error'   => true,
				]);

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
		$uid                 = Auth::user()->id;
		$db->name            = Input::get("name");
		$db->info            = Input::get("info");
		$db->pos_id          = Input::get("pos_id");
		$db->dept_id         = Input::get("dept_id");
		$db->phone           = Input::get("phone");
		$db->email           = Input::get("email");
		$db->fax             = Input::get("fax");
		$db->lastupdateby_id = $uid;
		$db->updated_at      = new Carbon();
		$db->uuid            = uniqid('Update_');
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

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
 * Bussiness Logic Offices
 *
 **/

namespace Emayk\Ics\Repo\Offices;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class OfficesEloquent implements OfficesInterface
{
	protected $offices;

	function __construct(Offices $offices)
	{
		$this->offices = $offices;
	}

	/**
	 *
	 * Mendapatkan Record Offices berdasarkan ID yang diberikan
	 *
	 * @param  int $id ID Record
	 *
	 * @return Model Record Offices
	 **/

	public function find($id)
	{
		return $this->offices->find($id);
	}


	/**
	 * Mendapatkan Semua Offices
	 *
	 * @return mixed
	 */
	public function all()
	{
		$page    = \Input::get('page');
		$limit   = \Input::get('limit', 1);
		$start   = \Input::get('start', 0);
		$offices = $this->offices;

		if (Input::has('parenttype')) {
			$owner   = Input::get('parenttype');
			$type    = $offices->getOwnerType($owner);
			$idowner = Input::get('parent_id');
			$offices = $offices->OfParent($type, $idowner);

			$total   = $offices->count();
			$offices = $offices
				->orderBy('updated_at', 'DESC')
				->skip($start)
				->take($limit)
				->get()->toArray();

			$officess = array(
				'success' => true,
				'results' => $offices,
				'total'   => $total
			);

			return Response::json($officess)
				->setCallback(\Input::get('callback'));

		} else {
			return Response::json(['success' => true, 'error' => true, 'reason' => 'Need Parameter Type and Id'], 200)
				->setCallback(\Input::get('callback'));

		}


	}

	/**
	 *
	 * Proses Simpan Offices
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

		/*==========  Sesuaikan dengan Field di table  ==========*/
		$address = Input::get('address');
		if (empty($address)) {
			throw new \Exception('Alamat Kantor diperlukan');
		}
		$this->offices->address     = $address;
		$this->offices->city_id     = Input::get('city_id');
		$this->offices->country_id  = Input::get('country_id');
		$this->offices->province_id = Input::get('province_id');
		$mainoffice                 = Input::get('mainoffice');
		$mainoffice                 = ( empty( $mainoffice ) ) ? 0 : 1;

		$this->offices->postcode = Input::get('postcode');
		if (Input::has('parenttype')) {
			$owner = Input::get('parenttype');
			$type  = $this->offices->getOwnerType($owner);
		};
		/**
		 * Check Apakah main office sudah ada ?
		 * Jika ada maka mainoffice == 0
		 */
		$parentId = Input::get('parent_id');
		if ($mainoffice == 1) {
			$countmainoffice = $this->offices->whereParentId($parentId)->whereParentType($type)->whereMainoffice($mainoffice)->count();
			$mainoffice = ($countmainoffice > 0 ) ? 0 : 1;
		}

		$this->offices->mainoffice = $mainoffice;

		$this->offices->parent_id   = $parentId;
		$this->offices->parent_type = $type;

		$this->offices->type         = $type;
		$this->offices->codeinternal = uniqid('New_');

		$this->offices->uuid            = uniqid('New_');
		$this->offices->createby_id     = \Auth::user()->id;
		$this->offices->lastupdateby_id = \Auth::user()->id;
		$this->offices->created_at      = new Carbon();
		$this->offices->updated_at      = new Carbon();
		$saved                          = $this->offices->save() ? true : false;
		return Response::json(array(
			'success' => $saved,
			'results' => $this->offices->toArray()
		))->setCallback();
	}

	/**
	 * Menghapus Offices
	 *
	 * @param $id
	 *
	 * @return mixed
	 *
	 */
	public function delete($id)
	{

		if ($this->hasAccess()) {
			$deleted = $this->offices
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
		$db = $this->offices->find($id);
		/*==========  Sesuaikan  ==========*/
		$db->address     = Input::get('address');
		$db->city_id     = Input::get('city_id');
		$db->country_id  = Input::get('country_id');
		$db->province_id = Input::get('province_id');
		$mainoffice                 = Input::get('mainoffice');
		$mainoffice                 = ( empty( $mainoffice ) ) ? 0 : 1;

		$db->postcode = Input::get('postcode');
		if (Input::has('parenttype')) {
			$owner = Input::get('parenttype');
			$type  = $db->getOwnerType($owner);
		};
		/**
		 * Check Apakah main office sudah ada ?
		 * Jika ada maka mainoffice == 0
		 */
		$parentId = Input::get('parent_id');
		if ($mainoffice == 1) {
			$countmainoffice = $this->offices
				->whereParentId($parentId)
				->whereParentType($type)
				->whereMainoffice('\Emayk\Ics\Repo\Offices\Offices')->count();
			$mainoffice = ($countmainoffice > 0 ) ? 0 : $mainoffice;
		}

		$db->mainoffice = $mainoffice;

		$db->parent_id   = $parentId;
		$db->parent_type = $type;

		$db->type         = $type;
		$db->codeinternal = uniqid('New_');

		$db->uuid            = uniqid('New_');
		$db->lastupdateby_id = \Auth::user()->id;
		$db->updated_at      = new Carbon();
		$db->uuid = uniqid('Update_');
		return ( $db->save() )
			? Response::json(['success'=>true,'error'=> false,'results'=> $db->toArray(),'total' => 1 ])
			: Response::json(['success'=>true,'error'=> true, 'results'=> array(),'total' => 0,'reason'=> 'Cannot Update' ]);

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
	 * Menampilkan Page Create data Offices
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

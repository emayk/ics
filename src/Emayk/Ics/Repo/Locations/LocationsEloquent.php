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
 * Bussiness Logic Locations
 *
 **/

namespace Emayk\Ics\Repo\Locations;

use Carbon\Carbon;
use Auth;
use Response;
use Input;

/**
 * Class LocationsEloquent
 *
 * @package Emayk\Ics\Repo\Locations
 */
class LocationsEloquent implements LocationsInterface
{
	/**
	 * @var Locations
	 */
	protected $locations;

	/**
	 * @param Locations $locations
	 */
	function __construct(Locations $locations)
	{
		$this->locations = $locations;

	}

	/**
	 *
	 * Mendapatkan Record Locations berdasarkan ID yang diberikan
	 *
	 * @param  int $id ID Record
	 *
	 * @return Model Record Locations
	 **/

	public function find($id)
	{
		return $this->locations->find($id);
	}

	/**
	 * Mendapatkan Semua Locations
	 *
	 * @return mixed
	 */
	public function all()
	{
		$page  = \Input::get('page');
		$limit = \Input::get('limit', 1);
		$start = \Input::get('start', 1);

		/**
		 *
		 * Request dari Combo box
		 *
		 */
		if (Input::has('cbreq')) {
			$req  = Input::get('cbreq');
			$data = $this->locations;
			if (Input::has('level')) {
				$level = Input::get('level');
				$data  = $data->where('level', $level);
			}
			$total    = $data->count();
			$response = $data
				->skip($start)
				->take($limit)
				->get(array('id', 'name'))
				->toArray();

			return Response::json(
				array(
					'results' => $response,
					'success' => true,
					'total'   => $total
				)
			);
		}
		/**
		 * Request dari Grid
		 */
		$locations = $this->locations
			->orderBy('created_at', 'DESC');

		if (Input::has('type')) {
			$type = Input::get('type');
			if (Input::has('parentId')) {
				$parentId  = Input::get('parentId');
				$locations = $this->locations->findByTypeAndParent($type, $parentId, Input::all());
				return $this->response($locations[ 'results' ], $locations[ 'total' ]);
			}
			$locations = $this->locations->findByType($type, Input::all());
			return $this->response($locations[ 'results' ], $locations[ 'total' ]);
		};

		$total     = $locations->count();
		$locations = $locations
			->skip($start)
			->take($limit)
			->get()->toArray();

		return $this->response($locations, $total);

	}

	/**
	 * @param array $locations
	 * @param       $total
	 *
	 * @return \Symfony\Component\HttpFoundation\JsonResponse
	 */
	protected function response(array $locations, $total)
	{
		$locationss = array(
			'success' => true,
			'results' => $locations,
			'total'   => $total
		);

		return Response::json($locationss)
			->setCallback(\Input::get('callback'));

	}

	protected function convertTypeToLevel($type)
	{
		if ($type == 'country') {
			$level = 1; /*Menangani Country*/
		}else{
		if ($type == 'province') {
			$level = 2; /*Menangani Province*/
		}else{
			if ($type == 'city') {
				$level = 3; /*Menangani City*/
			} else{
				$level = 3;
			}
		}

		}

		return $level;
	}

	/**
	 *
	 * Proses Simpan Locations
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
                    'reason' => 'Action Need Login First',
                    'results' => null
                ))->setCallback();
        }


//        return Input::all();
		if (!Input::has('type')) {
			throw new \Exception('No Type Parameter');
		};
		$type  = Input::get('type');
		$level = $this->convertTypeToLevel($type);

//        $level = Input::get('level');
		/**
		 * Control Control Name
		 */
		$name = Input::get('name');

		if ($level == 1) {
			/*Nama Negara Tidak Boleh Sama */

			$exist = $this->locations->whereName($name)->count();
			if ($exist>0) {
				return Response::json(
					array(
						'success' => true,
						'error'   => true,
						'reason'  => 'Nama Negara harus Unique, sepertinya Negara Sudah ada'
					), 500
				);
			};
			$parentId = 0;
		} else {
			$parentId = Input::get('parent_id');
		}

		/*Proses Saving*/
		$uid       = \Auth::user()->id;
		$newRecord = [
			'name'            => $name,
			'level'           => $level,
			'info'            => Input::get('info'),
			'uuid'            => uniqid('New_'),
			'parent_id'       => $parentId,
			'parent_type'     => '\Emayk\Ics\Repo\Locations\Locations',
			'createby_id'     => $uid,
			'lastupdateby_id' => $uid,
			'created_at'      => Carbon::create(),
			'updated_at'      => Carbon::create()
		];
		$saved     = $this->locations->create($newRecord);

		return Response::json(array(
			'success' => $saved,
			'error'   => !$saved,
			'results' => $saved->toArray(),
			'reason'  => ( $saved ) ? 'Saved' : 'Error Saved'
		))->setCallback();
	}

	/**
	 * Menghapus Locations
	 *
	 * @param $id
	 *
	 * @return mixed
	 *
	 */
	public function delete($id)
	{

		if (!$this->hasAccess()) {
			return Response::json(
				array(
					'success' => true,
					'error'   => true,
					'reason'  => 'Tidak diizinkan'
				)
			);
		}

		/**
		 * Check Child
		 */
		$haveChild = ( $this->locations->whereParentId($id)->count() > 0 );
		if ($haveChild) {
			/*Cancel*/
			return Response::json(
				array(
					'success' => true,
					'error'   => true,
					'reason'  => 'Still Have Child'
				)
			);
		} else {
			/**
			 * Proses Delete
			 * - bisa terjadi, record tidak bisa didelete karena sudah digunakan
			 * sama table lain (relationship)
			 */
			$record = $this->locations->find($id);
			$record = $record->delete();

			return Response::json(
				array(
					'success' => true,
					'error'   => $record,
					'reason'  => 'Successfully deleted'
				)
			);
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
		/**
		 * test
		 */
		$db = $this->locations->find($id);
		/*==========  Sesuaikan  ==========*/
//		$db->name      = Input::get('name');
		$db->info      = Input::get('info');
//		$db->parent_id = Input::get('parent_id');
		$db->uuid      = uniqid('Update_');
		$saved         = $db->save();
		return ( $saved )
			? Response::json(array_merge(
				$db->toArray(),
				array('success' => $saved)
			))
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
	 * Menampilkan Page Create data Locations
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

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
 * Bussiness Logic Typesuppliersbuyers
 *
 **/

namespace Emayk\Ics\Repo\Typesuppliersbuyers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class TypesuppliersbuyersEloquent implements TypesuppliersbuyersInterface
{
	protected $typesuppliersbuyers;

	function __construct(Typesuppliersbuyers $typesuppliersbuyers)
	{
		$this->typesuppliersbuyers = $typesuppliersbuyers;
	}

	/**
	 *
	 * Mendapatkan Record Typesuppliersbuyers berdasarkan ID yang diberikan
	 *
	 * @param  int $id ID Record
	 *
	 * @return Model Record Typesuppliersbuyers
	 **/

	public function find($id)
	{
		return $this->typesuppliersbuyers->find($id);
	}

	/**
	 * Mendapatkan Semua Typesuppliersbuyers
	 *
	 * @return mixed
	 */
	public function all()
	{
		$page                = \Input::get('page');
		$limit               = \Input::get('limit', 1);
		$start               = \Input::get('start', 1);
		$typesuppliersbuyers = $this->typesuppliersbuyers
			->orderBy('id', 'DESC')
			->skip($start)
			->take($limit)
			->get()->toArray();
		$total               = $this->typesuppliersbuyers
			->all()->count();

		$typesuppliersbuyerss = array(
			'success' => true,
			'results' => $typesuppliersbuyers,
			'total'   => $total
		);

		return Response::json($typesuppliersbuyerss)
			->setCallback(\Input::get('callback'));

	}

	/**
	 *
	 * Proses Simpan Typesuppliersbuyers
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
		/**
		 * Check Nama , harus Unique
		 * sementara tanpa menggunakan validasi di model
		 */
		$name = Input::get('name');

		$this->checkName($name);
		$this->typesuppliersbuyers->name            = $name;
		$this->typesuppliersbuyers->info            = Input::get('info');
		$this->typesuppliersbuyers->uuid            = uniqid('New_');
		$this->typesuppliersbuyers->createby_id     = \Auth::user()->id;
		$this->typesuppliersbuyers->lastupdateby_id = \Auth::user()->id;
		$this->typesuppliersbuyers->created_at      = new Carbon();
		$this->typesuppliersbuyers->updated_at      = new Carbon();
		$saved                                      = $this->typesuppliersbuyers->save() ? true : false;
		return Response::json(array(
			'success' => $saved,
			'results' => $this->typesuppliersbuyers->toArray()
		))->setCallback();
	}

	protected function checkName($name,$update = false)
	{
		if (!$update)
		{
			if (empty( $name )) throw new \Exception( 'Need Name' );
			$exist = ( $this->typesuppliersbuyers->whereName($name)->count() > 0 );
			if ($exist) throw new \Exception( 'Name Already Exists' );
		}


	}

	/**
	 * Menghapus Typesuppliersbuyers
	 *
	 * @param $id
	 *
	 * @return mixed
	 *
	 */
	public function delete($id)
	{

		if ($this->hasAccess()) {
			$deleted = $this->typesuppliersbuyers
				->find($id)
				->delete();

			return Response::json([
				'success' => $deleted,
				'error'   => !$deleted
			]);
		} else {
			return Response::json([
				'success' => true,
				'error'   => true,
				'reason'  => 'Cannot Deleted'
			], 404);
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
		$name = Input::get('name');
		$this->checkName($name,true);

		$db       = $this->typesuppliersbuyers->find($id);
//		$db->name = Input::get('name');
		$db->info = Input::get('info');
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
	 * Menampilkan Page Create data Typesuppliersbuyers
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

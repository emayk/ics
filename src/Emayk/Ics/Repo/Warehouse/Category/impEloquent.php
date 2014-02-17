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



namespace Emayk\Ics\Repo\Warehouse\Category;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class impEloquent implements iCategory{
	protected $category;
	function __construct(Warehousecategory $Category)
	{
		$this->category = $Category;
	}

	/**
	 *
	 * Mendapatkan Record Warehousecategory berdasarkan ID yang diberikan
	 * @param  int $id ID Record
	 * @return Model Record Warehousecategory
	 **/

	public function find($id){
		return $this->category->find($id);
	}

	/**
	 * Mendapatkan Semua Warehousecategory
	 * @return mixed
	 */
	public function all()
	{

		$page = \Input::get('page');
		$limit = \Input::get('limit',1);
		$start = \Input::get('start',0);
		$warehousecategory = $this->category;

		$total = $warehousecategory->count();

		$warehousecategory = $warehousecategory
			->orderBy('id','DESC')
			->skip($start)
			->take($limit);

		if ( (Input::has('cb')) and (Input::get('cb') == 'true') ){
			$warehousecategory = $this->combobox();
		}else {
			$warehousecategory = $warehousecategory->get()->toArray();
		}

		$warehousecategorys = array(
			'success' => true,
			'results' => $warehousecategory,
			'total' => $total
		);

		return Response::json($warehousecategorys)
			->setCallback(\Input::get('callback'));

	}

	/**
	 *
	 * Proses Simpan Warehousecategory
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
		$this->category->name = Input::get('name');
		$this->category->info = Input::get('info');
		$this->category->uuid = uniqid('New_');
		$this->category->createby_id = \Auth::user()->id;
		$this->category->lastupdateby_id = \Auth::user()->id;
		$this->category->created_at = new Carbon();
		$this->category->updated_at = new Carbon();
		$saved = $this->category->save() ? true : false ;
		return Response::json(array(
			'success' => $saved,
			'results' => $this->category->toArray()
		))->setCallback();
	}

	/**
	 * Menghapus Warehousecategory
	 *
	 * @param $id
	 * @return mixed
	 *
	 */
	public function delete($id)
	{

		if ($this->hasAccess())
		{
			$deleted = $this->category
				->find($id)
				->delete();

			return \Icsoutput::toJson(array(
				'results' => $deleted
			),$deleted);

		}else{
			return \Icsoutput::toJson(array(
				'results' => false,
				'reason' => 'Dont Have Access to Delete '
			),false);
		}
	}

	/**
	 * Update Informasi [[cName]]
	 *
	 * @param $id
	 * @return mixed
	 */
	public function update($id)
	{
		$db = $this->category->find($id);
		/*==========  Sesuaikan  ==========*/
		// $db->name = Input::get('name');
		// $db->info = Input::get('info');
		$db->uuid = uniqid('Update_');
		return ($db->save())
			? \Icsoutput::msgSuccess( $db->toArray() )
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
		return (!Auth::guest());
	}

	/**
	 *
	 * Menampilkan Page Create data Warehousecategory
	 *
	 **/

	public function create()
	{
		// TODO: Implement create() method.
	}

	/**
	 * Menampilkan Resource
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{

		$db = $this->category->find($id);
		return (!$db)
			? \Icsoutput::msgError(array('reason' => 'Cannot Found'))
			: \Icsoutput::msgError($db->toArray());

	}
	/**
	 * Menampilkan Data Untuk di edit
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		// TODO: Implement edit() method.
	}

	/**
	 * Remove Storage
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		return $this->delete($id);
	}

	public function combobox()
	{
		return $this->category->get(array('name','id') )->toArray();
//        return $this->warehousecategory->lists('name','id');
	}

}
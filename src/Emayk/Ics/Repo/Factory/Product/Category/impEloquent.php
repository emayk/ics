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



namespace Emayk\Ics\Repo\Factory\Product\Category;


use Response;
use Input;

class impEloquent implements iCategory{
	protected $category;

	function __construct(Eloquent $Category)
	{
		$this->category = $Category;
	}

	/**
	 *
	 * Mendapatkan Record Productcategory berdasarkan ID yang diberikan
	 *
	 * @param  int $id ID Record
	 *
	 * @return Model Record Productcategory
	 **/

	public function find($id)
	{
		return $this->category->find($id);
	}

	/**
	 * Mendapatkan Semua Productcategory
	 *
	 * @return mixed
	 */
	public function all()
	{
		$page  = \Input::get('page');
		$limit = \Input::get('limit', 1);
		$start = \Input::get('start', 0);

		if (Input::has('selected')) {
			$id     = Input::get('selected');
			$record = $this->category->findOrFail($id);
			return Response::json([
				'success' => true, 'error' => false,
				'results' => $record->toArray()
			]);
		}

		$productcategory = $this->category
			->orderBy('id', 'DESC')
			->skip($start)
			->take($limit)
			->get()->toArray();
		$total           = $this->category
			->all()->count();

		$productcategorys = array(
			'success' => true,
			'results' => $productcategory,
			'total'   => $total
		);

		return Response::json($productcategorys)
			->setCallback(\Input::get('callback'));

	}

	/**
	 *
	 * Proses Simpan Productcategory
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
		$this->category->name            = Input::get('name');
		$this->category->info            = Input::get('info');
		$this->category->uuid            = uniqid('New_');
		$this->category->parent_type     = '\Emayk\Ics\Repo\Productcategory\Productcategory';
		$this->category->kodeinternal    = uniqid();
		$this->category->createby_id     = \Auth::user()->id;
		$this->category->lastupdateby_id = \Auth::user()->id;
		$this->category->created_at      = new Carbon();
		$this->category->updated_at      = new Carbon();
		$saved                                  = $this->category->save() ? true : false;
		return Response::json(array(
			'success' => $saved,
			'results' => $this->category->toArray()
		))->setCallback();
	}

	/**
	 * Menghapus Productcategory
	 *
	 * @param $id
	 *
	 * @return mixed
	 *
	 */
	public function delete($id)
	{

		if ($this->hasAccess()) {
			$cat = $this->category
				->findOrFail($id);

			return ( $cat->delete() )
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
		}

		return Response::json([
			'success' => false,
			'error'   => true,
			'reason'  => 'Not Authenticated'
		], 500);
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
		$db = $this->category->find($id);
		/*==========  Sesuaikan  ==========*/
		// $db->name = Input::get('name');
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
	 * Menampilkan Page Create data Productcategory
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
		$record = $this->category->findOrFail($id);

		return Response::json([
			'success' => true, 'error' => false,
			'results' => $record->toArray()
		]);


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

 
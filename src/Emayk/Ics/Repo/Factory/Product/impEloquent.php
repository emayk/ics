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



namespace Emayk\Ics\Repo\Factory\Product;

use \Exception;
use Carbon\Carbon;
use Emayk\Ics\Repo\Sysprodhistory\Sysprodhistory;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;
use \DB;
use \Event;
use \Cache;

class impEloquent implements iProduct
{
	protected $product;

	function __construct(Eloquent $Product)
	{
		$this->product = $Product;
	}

	/**
	 *
	 * Mendapatkan Record Products berdasarkan ID yang diberikan
	 *
	 * @param  int $id ID Record
	 *
	 * @return Model Record Products
	 **/

	public function find($id)
	{
		return $this->product->find($id);
	}

	/**
	 * Mendapatkan List Product Berdasarkan Nama Produk yang diberikan
	 * @param $searchName
	 * @param $limit
	 * @param $start
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function searchByName($searchName,$limit,$start){

		$products = $this->product->where('name', 'LIKE', "%$searchName%");
		$total    = $products->count();
		$products = $products->skip($start)
			->take($limit)
			->get()->toArray();

		return Response::json([
			'success' => true,
			'results' => $products,
			'total'   => $total
		]);
	}
	/**
	 * Mendapatkan Semua Products
	 *
	 * @return mixed
	 */
	public function all()
	{

		$page  = \Input::get('page');
		$limit = \Input::get('limit', 1);
		$start = \Input::get('start', 0);
		/*Jika ada Input cari berdasarkan Nama */
		if (Input::has('searchbyName')) {
			$searchName     = Input::get('searchbyName');
			return $this->searchByName($searchName,$limit,$start);
		}
		$product = $this->product;
		$total   = $product->count();
//            ->orderBy('id','DESC')
		$product = $product->skip($start)
			->take($limit)
			->get()->toArray();
//		$total = $this->$product
//			->all()->count();

		$product = array(
			'success' => true,
			'results' => $product,
			'total'   => $total
		);

		return Response::json($product)
			->setCallback(\Input::get('callback'));


		/*kalo sudah produksi gunakan ini*/
		$page    = \Input::get('page');
		$product = $this->products;
		\Event::fire('product.refresh', array($product));
		$products  = \Cache::get('products' . $page);
		$total     = \Cache::get('count_products');
		$productss = array('success' => true, 'results' => $products->toArray(), 'total' => $total);

		return Response::json($productss)->setCallback(\Input::get('callback'));

	}


	/**
	 * @throws \Exception
	 */
	public function store_2()
	{
		$product = $this->product;
		$userId  = \Auth::user()->id;
		DB::beginTransaction();

		try {
			$product = $product::create(
				array(
					'name'            => Input::get('name'),
					'cat_id'          => Input::get('cat_id'),
					'contruction'     => Input::get('contruction'),
					'nodesign'        => Input::get('nodesign'),
					'type_id'         => Input::get('type_id'),
					'weight'          => Input::get('weight'),
					'unitweight_id'   => Input::get('unitweight_id'),
					'width'           => Input::get('width'),
					'unitwidth_id'    => Input::get('unitwidth_id'),
					'codeinternal'    => uniqid('Prd_'),
					'parent_id'       => Input::get('parent_id'),
					'parent_type'     => Input::get('parent_type'),
					'uuid'            => uniqid('Prd_'),
					'createby_id'     => $userId,
					'lastupdateby_id' => $userId,
					'created_at'      => new \Datetime(),
					'updated_at'      => new \Datetime()
				)
			);

		} catch (\Exception $e) {
			DB::rollBack();
			throw $e;
		}

//			 Proses Detail
		try {
			// proses Product detail

		} catch (\Exception $e) {
			DB::rollBack();
			throw $e;
		}

		DB::commit();

		return Response::json(array(
			'success' => true,
			'results' => $product->toArray()
		))->setCallback();

	}

	/**
	 *
	 * Proses Simpan Products
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
		$userId                        = \Auth::user()->id;
		$name                          = Input::get('name');
		$this->product->name          = $name;
		$catId                         = Input::get('cat_id', 1);
		$this->product->cat_id        = $catId;
		$this->product->contruction   = Input::get('contruction');
		$this->product->nodesign      = Input::get('nodesign');
		$this->product->type_id       = Input::get('type_id');
		$this->product->weight        = Input::get('weight');
		$this->product->parent_id     = $catId;
		$this->product->parent_type   = '\Emayk\Ics\Repo\Productcategory\Productcategory';
		$this->product->unitweight_id = Input::get('unitweight_id');
		$this->product->width         = Input::get('width');
		$this->product->unitwidth_id  = Input::get('unitwidth_id');
		$this->product->codeinternal  = uniqid('Prd_');

		$this->product->uuid            = uniqid('Prd_');
		$this->product->createby_id     = $userId;
		$this->product->lastupdateby_id = $userId;
		$this->product->created_at      = new \Datetime();
		$this->product->updated_at      = new \Datetime();
		$saved                           = $this->product->save() ? true : false;

		if ($saved) {
			Sysprodhistory::createlog(["Product {$name} berhasil dibuat "], $userId, $this->product->id);
		};
		return Response::json(array(
			'success' => $saved,
			'results' => ( $saved ) ? $this->product->toArray() : null,
			'reason'  => ( $saved ) ? 'Created Successfully' : 'Fail Create',
		))->setCallback();
	}

	/**
	 * Menghapus Products
	 *
	 * @param $id
	 *
	 * @return mixed
	 *
	 */
	public function delete($id)
	{

		if ($this->hasAccess()) {
			$deleted = $this->product
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
		$db = $this->product->find($id);
		/*==========  Sesuaikan  ==========*/
		$db->name        = Input::get('name');
		$catId           = Input::get('cat_id', 1);
		$uid             = Auth::user()->id;
		$db->cat_id      = $catId;
		$db->contruction = Input::get('contruction');
		$db->nodesign    = Input::get('nodesign');
		$db->type_id     = Input::get('type_id');
		$db->weight      = Input::get('weight');
		$db->parent_id   = $catId;

		$db->unitweight_id = Input::get('unitweight_id');
		$db->width         = Input::get('width');
		$db->unitwidth_id  = Input::get('unitwidth_id');
		$db->codeinternal  = uniqid('Prd_');

		$db->uuid            = uniqid('Prd_');
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
	 * Menampilkan Page Create data Products
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
		$record = $this->product->whereId($id);

		return ( $record->count() ) ?
			Response::json(
				[
					'success' => true, 'error' => false,
					'results' => $record
							->with('type', 'detail', 'stocks')
							->get()->toArray()
				]
			)
			: Response::json(
				[
					'success' => true, 'error' => true,
					'reason'  => 'Cannot Find'
				], 404
			);
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

 
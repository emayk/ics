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

use Emayk\Ics\Controllers\BaseLogic;
use \Exception;
use Carbon\Carbon;
use Emayk\Ics\Repo\Sysprodhistory\Sysprodhistory;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;
use \DB;
use \Event;
use \Cache;

class impEloquent extends BaseLogic implements iProduct
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
	 *
	 * @param $searchName
	 * @param $limit
	 * @param $start
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function searchByName($searchName, $limit, $start)
	{

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
	 * @throws \Exception
	 * @return mixed
	 */
	public function all()
	{

		$page  = \Input::get('page');
		$limit = \Input::get('limit', 1);
		$start = \Input::get('start', 0);
		if (Input::has('withhpp')) {
			$hpptrue = Input::get('withhpp');
			if ($hpptrue == 'true') {
				/*Check Token*/
				if (!Input::has('_token')) throw new \Exception( 'Problem with Token' );
				$token = Input::get('_token');
//				$products = $this->product->with('detail');
				$products = $this->product->with('price');
				$total    = $products->count();
				$products = $products->skip($start)
					->take($limit)
					->get()->toArray();

				$product = ['success' => true, 'results' => $products, 'total' => $total];
				return Response::json($product);
			}
		}


		if (Input::has('listImport')) {
			return $this->listProductImported($start, $limit, $page);
		}

		/*Jika ada Input cari berdasarkan Nama */
		if (Input::has('searchbyName')) {
			$searchName = Input::get('searchbyName');
			return $this->searchByName($searchName, $limit, $start);
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

		if (Input::has('upload')) {
			return $this->processUploadProduct();
		};

		if (Input::has('sethpp')) {
			return $this->updateHpp();
		}

		/*==========  Sesuaikan dengan Field di table  ==========*/
		$product                = $this->product;
		$userId                 = \Auth::user()->id;
		$name                   = Input::get('name');
		$product->name          = $name;
		$catId                  = Input::get('cat_id', 1);
		$product->cat_id        = $catId;
		$product->contruction   = Input::get('contruction');
		$product->nodesign      = Input::get('nodesign');
		$product->type_id       = Input::get('type_id');
		$product->weight        = Input::get('weight');
		$product->parent_id     = $catId;
		$product->parent_type   = '\Emayk\Ics\Repo\Productcategory\Productcategory';
		$product->unitweight_id = Input::get('unitweight_id');
		$product->width         = Input::get('width');
		$product->unitwidth_id  = Input::get('unitwidth_id');
		$product->codeinternal  = uniqid('Prd_');

		$product->uuid            = uniqid('Prd_');
		$product->createby_id     = $userId;
		$product->lastupdateby_id = $userId;
		$product->created_at      = new \Datetime();
		$product->updated_at      = new \Datetime();
		$saved                    = $this->product->save() ? true : false;

		/**
		 * Buat Stock
		 */
		$product->oStock()->add($product, 0, 0, $userId);
		/**
		 * Buat Hpp
		 */
		$product->getHpp()->add($product, 0, 0);

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

		$detail = $db->detail;
		if (Input::has('unit_id')) $detail->unit_id = Input::get('unit_id');
		if (Input::has('color_id')) $detail->color_id = Input::get('color_id');
		if (Input::has('grade_id')) $detail->grade_id = Input::get('grade_id');
		$detail->save();

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
//		$record = $this->product->findOrFail($id);
		return ( $record->count() ) ?
			Response::json(
				[
					'success' => true, 'error' => false,
					'results' => $record
							->with('type', 'detail', 'stock')
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

	protected function setHpp()
	{
		$sethpp   = $this->getParams('sethpp', 'Need Parameter to Set Hpp');
		$prodId   = $this->getParams('product_id', 'Need Product Id');
		$price    = $this->getParams('price', 'Need Price ');
		$pricemin = $this->getParams('pricemin', 'Need Price Min Value');

		$product = $this->product->findOrFail($prodId);
		/**
		 * Jika Hpp Belum ada maka
		 * lakukan Tambah Record Hpp
		 */
		$hpp = $product->hpp;
		if (is_null($product->hpp)) {
			$hpp = $product->getHpp()->add($product, $price, $pricemin);
		} else {
			$hpp->pricemin = $price;
			$hpp->price    = $pricemin;
			$hpp->save();
		}
		return Response::json([
			'success' => true,
			'results' => $hpp
		]);
	}

	protected function listProductImported($start, $limit, $page)
	{
		$importId = $this->getParams('importid', 'Tidak Mendapatkan Import ID yang akan diload');
		$products = $this->product->getModelImport();

		$products = $products->whereImportid($importId);
		$total    = $products->count();
		$products = $products->skip($start)
			->take($limit)
			->get()->toArray();

		$product = ['success' => true, 'results' => $products, 'total' => $total];
		return Response::json($product);

	}

	protected function processUploadProduct()
	{
		$upload = $this->inputGet('upload');
		/*Token*/
		$token = $this->inputGet('_token');
		/*User Id yang upload*/
		$uid = $this->inputGet('uid');

		/*Dapatkan File*/
		if (!Input::hasFile('product')) {
			$response = [
				'success' => false,
				'error'   => true,
				'reason'  => 'Tidak ada file yang diupload'
			];
		} else {
			$file  = Input::file('product');
			$path  = storage_path('tmp') . '/' . date('d_m_Y');
			$fname = $uid.'_'.$file->getClientOriginalName();
			$file->move($path, $fname);
			/*
			 * Import Id  dapatkan dari Model Import
			 * Set semua import Id ke
			*/
			$importId = uniqid('Upload' . time() . $uid);
			$modelImport = $this->product->getModelImport();
			$modelImport->setImportId($importId);
			$fullname = $path . '/' . $fname;
			$modelImport->setFileExcel($fullname);
			$modelImport->sentToQueue($importId, $fullname);
//			$modelImport->getArrayFileExcel();
			$response = [
				'success'     => true,
				'results'     => '',
				'file'        => $fname,
//				'importId' => 'Test_531b5521cef951',
				'importId'    => $importId,
				'modelImport' => [
					'id'            => $modelImport->getImportId(),
					'fullnameExcel' => $modelImport->getImportId(),
					'fullname'      => $fullname
				],
				'msg'         => 'File Berhasil diupload, silahkan tunggu beberapa saat<br/>Grid akan segera diload',
				'params'      => [
					'listImport' => $importId,
					'token'      => $token
				]
			];
		}
		return Response::json($response);
	}
}

 
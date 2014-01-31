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
 * Bussiness Logic Productsuppliers
 *
 **/

namespace Emayk\Ics\Repo\Productsuppliers;

use Carbon\Carbon;
use \Emayk\Ics\Repo\Products\Products;
use \Emayk\Ics\Repo\Suppliers\Suppliers;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class ProductsuppliersEloquent implements ProductsuppliersInterface
{
	protected $productsuppliers;
	protected $suppliers;
	protected $products;

	function __construct(Productsuppliers $productsuppliers)
	{
		$this->productsuppliers = $productsuppliers;
		$this->suppliers        = new Suppliers();
		$this->products         = new Products();
	}

	/**
	 *
	 * Mendapatkan Record Productsuppliers berdasarkan ID yang diberikan
	 *
	 * @param  int $id ID Record
	 *
	 * @return Model Record Productsuppliers
	 **/

	public function find($id)
	{
		return $this->productsuppliers->find($id);
	}

	/**
	 * Mendapatkan Semua Productsuppliers
	 *
	 * @throws \Exception
	 * @return mixed
	 */
	public function all()
	{
		$page  = \Input::get('page');
		$limit = \Input::get('limit', 2);
		$start = \Input::get('start', 0);

		if (( !Input::has('supplierid') ) and ( !Input::has('productid') ))
			throw new \Exception( 'Butuh Supplier Id atau Product Id' );

		if (Input::has('supplierid')) {
			$supplierId = Input::get('supplierid');
			$sup        = $this->suppliers->findOrFail($supplierId);

			$products = [];
			foreach ($sup->products as $product) {
				if (Input::has('productname')) {
					$productName = Input::get('productname');
					if (preg_match("/{$productName}/i", $product->name)) {
						$products [ ] = ['name' => $product->name, 'stock' => $product->totalstocks, 'id' => $product->id];
					};
				} else {
					$products [ ] = ['name' => $product->name, 'stock' => $product->totalstocks, 'id' => $product->id];
				}
			}
			$products = array_unique($products, SORT_REGULAR);
			$total = count($products);

			return [
				'total'   => $total,
				'success' => true,
				'error'   => false,
				'results' => $products
			];
		};

		if (Input::has('productid')) {
			$productid = Input::get('productid');
			$product   = $this->products->findOrFail($productid);
			$total     = $this->products->count();
			foreach ($product->suppliers as $supplier) {
				$suppliers [ ] = $supplier->toArray();
			}
			$suppliers = array_unique($suppliers, SORT_REGULAR);
			return [
				'success' => true,
				'error'   => false,
				'total'   => $total,
				'results' => $suppliers
			];
			/*Cari Supplier - Supplier dari product id yang diberikan*/
		};
	}

	/**
	 *
	 * Proses Simpan Productsuppliers
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
		// $this->productsuppliers->name = Input::get('name');
		// $this->productsuppliers->info = Input::get('info');
		// $this->productsuppliers->uuid = uniqid('New_');
		// $this->productsuppliers->createby_id = \Auth::user()->id;
		// $this->productsuppliers->lastupdateby_id = \Auth::user()->id;
		// $this->productsuppliers->created_at = new Carbon();
		// $this->productsuppliers->updated_at = new Carbon();
		$saved = $this->productsuppliers->save() ? true : false;
		return Response::json(array(
			'success' => $saved,
			'results' => $this->productsuppliers->toArray()
		))->setCallback();
	}

	/**
	 * Menghapus Productsuppliers
	 *
	 * @param $id
	 *
	 * @return mixed
	 *
	 */
	public function delete($id)
	{

		if ($this->hasAccess()) {
			$deleted = $this->productsuppliers
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
		$db = $this->productsuppliers->find($id);
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
	 * Menampilkan Page Create data Productsuppliers
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

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
 * Bussiness Logic Saleproduct
 *
 **/

namespace Emayk\Ics\Repo\Saleproduct;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class SaleproductEloquent implements SaleproductInterface
{
	protected $saleproduct;



	function __construct(Saleproduct $saleproduct)
	{
		$this->saleproduct = $saleproduct;
	}

	/**
	 *
	 * Mendapatkan Record Saleproduct berdasarkan ID yang diberikan
	 *
	 * @param  int $id ID Record
	 *
	 * @return Model Record Saleproduct
	 **/

	public function find($id)
	{
		return $this->saleproduct->find($id);
	}

	/**
	 * Mendapatkan Semua Saleproduct
	 *
	 * @return mixed
	 */
	public function all()
	{
		$page  = \Input::get('page', 1);
		$limit = \Input::get('limit', 1);
		$start = \Input::get('start', 0);

		if (Input::has('saleid')) {
			$id = Input::get('saleid');
			return $this->showSaleProduct($id);
		}else{
			return Response::json([
				'success' => true,
				'error' => true,
				'reason' => 'Need Id Sale'
			],500);
		};


		$a_saleproduct = $this->saleproduct;
		$saleproduct   = $a_saleproduct
			->skip($start)
			->take($limit)
			->get();

		$total = $this->saleproduct->count();

		$saleproducts = array(
			'success' => true,
			'results' => $saleproduct->toArray(),
			'total'   => $total
		);

		return Response::json($saleproducts)
			->setCallback(\Input::get('callback'));

	}

	/**
	 * Menampilkan sale Product berdasarkan id yang diberikan
	 *
	 * @param $id
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	protected function showSaleProduct($id)
	{
		$records = $this->saleproduct->whereSaleid($id);
		if (!$records) {
			$response = [
				'success' => true,
				'error'   => true,
				'reason'  => 'Empty Sale Doc',
				'total'   => 0,
			];
			return Response::json($response);
		}

		$total        = $records->count();
		$records      = $records->get();
		$saleproducts = array(
			'success' => true,
			'results' => $records->toArray(),
			'total'   => $total
		);

		return Response::json($saleproducts);
	}

	/**
	 *
	 * Proses Simpan Saleproduct
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
		$this->saleproduct->saleid     = Input::get('saleid');
		$this->saleproduct->product_id = Input::get('product_id');
		$qty                           = Input::get('qty');
		$price                         = Input::get('price');
		$this->saleproduct->qty        = $qty;
		$this->saleproduct->price      = $price;
		$this->saleproduct->desc       = Input::get('desc');
		$subtotal                      = ( ( $qty > 0 ) and ( $price > 0 ) ) ? ( $qty * $price ) : 0;
		$this->saleproduct->subtotal   = $subtotal;

		/*todo : tambah createby di table*/
//         $this->saleproduct->desc = uniqid('New_');
		// $this->saleproduct->createby_id = \Auth::user()->id;
		// $this->saleproduct->lastupdateby_id = \Auth::user()->id;
		// $this->saleproduct->created_at = new Carbon();
		// $this->saleproduct->updated_at = new Carbon();

		/* todo : jika sudah sukses , update ref table trans_sale column totalitem */
		$saved = $this->saleproduct->save() ? true : false;
		return Response::json(array(
			'success' => $saved,
			'results' => $this->saleproduct->toArray()
		))->setCallback();
	}

	/**
	 * Menghapus Saleproduct
	 *
	 * @param $id
	 *
	 * @return mixed
	 *
	 */
	public function delete($id)
	{

		if ($this->hasAccess()) {
			$deleted = $this->saleproduct
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
		$db = $this->saleproduct->find($id);
		/*==========  Sesuaikan  ==========*/
		$db->saleid     = Input::get('saleid');
		$db->product_id = Input::get('product_id');
		$qty                           = Input::get('qty');
		$price                         = Input::get('price');
		$db->qty        = $qty;
		$db->price      = $price;
		$db->desc       = Input::get('desc');
		$subtotal                      = ( ( $qty > 0 ) and ( $price > 0 ) ) ? ( $qty * $price ) : 0;
		$db->subtotal   = $subtotal;

		// $db->name = Input::get('name');
		// $db->info = Input::get('info');
//		$db->uuid = uniqid('Update_');
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
	 * Menampilkan Page Create data Saleproduct
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

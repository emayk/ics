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
 * Bussiness Logic Transsale
 *
 **/

namespace Emayk\Ics\Repo\Transsale;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class TranssaleEloquent implements TranssaleInterface
{
	protected $transsale;

	function __construct(Transsale $transsale)
	{
		$this->transsale = $transsale;
	}

	/**
	 *
	 * Mendapatkan Record Transsale berdasarkan ID yang diberikan
	 *
	 * @param  int $id ID Record
	 *
	 * @return Model Record Transsale
	 **/

	public function find($id)
	{
		return $this->transsale->find($id);
	}

	/**
	 * Mendapatkan Semua Transsale
	 *
	 * @return mixed
	 */
	public function all()
	{
		$page        = \Input::get('page', 1);
		$limit       = \Input::get('limit', 1);
		$start       = \Input::get('start', 0);
		$a_transsale = $this->transsale;
		$transsale   = $a_transsale->skip($start)->take($limit)->get();

		$total = $this->transsale->count();

		$transsales = array(
			'success' => true,
			'results' => $transsale->toArray(),
			'total'   => $total
		);

		return Response::json($transsales)
			->setCallback(\Input::get('callback'));

	}

	/**
	 *
	 * Proses Simpan Transsale
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

		/*Get Latest Document */
		$date = Carbon::create()->toDateString();
//	    return $date;
		$doc = $this->transsale->whereSaledate($date)->count();
		$ref = "Sale-" . $date . '-' . ( $doc + 1 );
		/*==========  Sesuaikan dengan Field di table  ==========*/
		$this->transsale->buyer_id  = Input::get('buyer_id');
		$this->transsale->saledate  = $date;
		$this->transsale->totalitem = 0;
		$this->transsale->ref       = $ref;
		$saved                      = $this->transsale->save() ? true : false;
		return Response::json(array(
			'success' => $saved,
			'results' => $this->transsale->toArray()
		))->setCallback();
	}

	/**
	 * Menghapus Transsale
	 *
	 * @param $id
	 *
	 * @return mixed
	 *
	 */
	public function delete($id)
	{

		if ($this->hasAccess()) {
			$deleted = $this->transsale
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
		$db = $this->transsale->find($id);
		/*==========  Sesuaikan  ==========*/
		 $db->buyer_id = Input::get('buyer_id');
		 $db->saledate = Input::get('saledate');
		 $db->totalitem = Input::get('totalitem',0);
		 $db->totalprice = Input::get('totalprice',0);
		 $db->updated_at = Carbon::create();
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
	 * Menampilkan Page Create data Transsale
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

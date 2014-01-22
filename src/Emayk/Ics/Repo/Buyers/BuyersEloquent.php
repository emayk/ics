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
 * Bussiness Logic Buyers
 *
 **/

namespace Emayk\Ics\Repo\Buyers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;
use \Queue;

class BuyersEloquent implements BuyersInterface
{
	protected $buyers;
	protected $fake;

	function __construct(Buyers $buyers)
	{
		$this->buyers = $buyers;
		$this->fake   = \Faker\Factory::create();
	}

	/**
	 *
	 * Mendapatkan Record Buyers berdasarkan ID yang diberikan
	 *
	 * @param  int $id ID Record
	 *
	 * @return Model Record Buyers
	 **/

	public function find($id)
	{
		return $this->buyers->find($id);
	}

	/**
	 * Mendapatkan Semua Buyers
	 *
	 * @return mixed
	 */
	public function all()
	{
		$page   = \Input::get('page');
		$limit  = \Input::get('limit', 1);
		$start  = \Input::get('start', 1);
		$buyers = $this->buyers
			->orderBy('id', 'DESC')
			->skip($start)
			->take($limit)
			->get()->toArray();
		$total  = $this->buyers
			->all()->count();

		$buyerss = array(
			'success' => true,
			'results' => $buyers,
			'total'   => $total
		);

		return Response::json($buyerss)
			->setCallback(\Input::get('callback'));

	}

	/**
	 *
	 * Proses Simpan Buyers
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
		if (Input::has('quickadd')) {
			$quickadd = Input::get('quickadd');
			if (!$quickadd) throw new \Exception( 'Quick add Needed true' );

			return $this->quickAdd();
		}
		$uid = ( is_null(\Auth::getUser()) ) ? 1 : \Auth::getUser()->id;
		/*==========  Sesuaikan dengan Field di table  ==========*/
		$this->buyers->name            = Input::get('name');
		$status                        = ( !$status = Input::get('status_id') ) ? 2 : 1;
		$this->buyers->status_id       = $status;
		$this->buyers->codepos         = Input::get('codepos');
		$this->buyers->npwp            = Input::get('npwp');
		$this->buyers->fax             = Input::get('fax');
		$this->buyers->email           = Input::get('email');
		$this->buyers->plafon          = Input::get('plafon');
		$this->buyers->kredit          = Input::get('kredit');
		$this->buyers->address         = Input::get('address');
		$this->buyers->rt              = Input::get('rt');
		$this->buyers->rw              = Input::get('rw');
		$this->buyers->note            = Input::get('note');
		$this->buyers->uuid            = uniqid('New_');
		$this->buyers->createby_id     = $uid;
		$this->buyers->lastupdateby_id = $uid;
		$this->buyers->created_at      = new Carbon();
		$this->buyers->updated_at      = new Carbon();
		$saved                         = $this->buyers->save() ? true : false;

		return Response::json(array('success' => $saved, 'results' => $this->buyers->toArray()))->setCallback();
	}

	/**
	 * Menghapus Buyers
	 *
	 * @param $id
	 *
	 * @return mixed
	 *
	 */
	public function delete($id)
	{

		if ($this->hasAccess()) {
			$deleted = $this->buyers
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


	public function update($id)
	{
		$uid             = ( is_null(\Auth::getUser()) ) ? 1 : \Auth::getUser()->id;
		$db              = $this->buyers->find($id);
		$db->address     = Input::get("address");
		$db->codepos     = Input::get("codepos");
		$db->email       = Input::get("email");
		$db->fax         = Input::get("fax");
		$db->kredit      = Input::get("kredit");
		$db->name        = Input::get("name");
		$db->npwp        = Input::get("npwp");
		$db->phone       = Input::get("phone");
		$db->plafon      = Input::get("plafon");
		$db->rt          = Input::get("rt");
		$db->rw          = Input::get("rw");
		$status          = ( !$status = Input::get('status_id') ) ? 2 : 1;
		$db->status_id   = $status;
		$db->tipe_id     = Input::get("tipe_id");
		$db->typeprod_id = Input::get("typeprod_id");
		$db->province_id = Input::get("province_id");
		$db->legality_id = Input::get("legality_id");
		$db->note        = Input::get("note");
		/** @noinspection PhpUndefinedFieldInspection */
		$db->city_id         = Input::get("city_id");
		$db->country_id      = Input::get("country_id");
		$db->lastupdateby_id = $uid;
		$db->updated_at      = new Carbon();
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
	 * Menampilkan Page Create data Buyers
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
		$total = 100;
		$date  = Carbon::now()->addMinute();
		$uid   = ( is_null(\Auth::getUser()) ) ? 1 : \Auth::getUser()->id;
		Queue::later($date, '\Emayk\Ics\Queue\Iron\CreateBuyers', array('total' => $total, 'uid' => $uid));
		return 'im execute at ' . date('d m Y h:i:s');
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


	protected function niceUnits($size)
	{
		$unit = array('b', 'kb', 'mb', 'gb', 'tb', 'pb');
		return @round($size / pow(1024, ( $i = floor(log($size, 1024)) )), 2) . ' ' . $unit[ $i ];
	}

	protected function quickAdd()
	{
		$uid = ( is_null(\Auth::getUser()) ) ? 1 : \Auth::getUser()->id;
		/*==========  Sesuaikan dengan Field di table  ==========*/
		$name = Input::get('name');
		if (empty($name)) throw new \Exception('Need Name to add Buyer');
		$this->buyers->name            = $name;
		$status                        = ( !$status = Input::get('status_id') ) ? 2 : 1;
		$this->buyers->status_id       = $status;
		$this->buyers->codepos         = '';
		$this->buyers->npwp            = '';
		$this->buyers->fax             = '';
		$this->buyers->email           = '';
		$this->buyers->plafon          = 0;
		$this->buyers->kredit          = 0;
		$this->buyers->address         = Input::get('address');
		$this->buyers->rt              = 0;
		$this->buyers->rw              = 0;
		$this->buyers->note            = '';
		$this->buyers->uuid            = uniqid('New_');
		$this->buyers->createby_id     = $uid;
		$this->buyers->lastupdateby_id = $uid;
		$this->buyers->created_at      = new Carbon();
		$this->buyers->updated_at      = new Carbon();
		$saved                         = $this->buyers->save() ? true : false;

		return Response::json(array('success' => $saved, 'results' => $this->buyers->toArray()))->setCallback();
	}
}

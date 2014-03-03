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


namespace Emayk\Ics\Repo\System\Log;

use \Auth;
use \Input;
use \Response;
use Emayk\Ics\Controllers\BaseController;

class Controller extends BaseController
{
	protected $log;

	function __construct()
	{
		$this->log = new Eloquent();
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{

		$page  = \Input::get('page');
		$limit = \Input::get('limit', 1);
		$start = \Input::get('start', 0);

		if (Input::has('all')) {
			return $this->getAll();
		}
		/**
		 * Mendapatkan Log Hari ini
		 */
		$log   = $this->log->Today()
			->orderBy('id', 'DESC');
		$total = $log->count();

		$log = $log->skip($start)
			->take($limit)
			->get()->toArray();

		$logs = array(
			'success' => true,
			'results' => $log,
			'total'   => $total
		);

		return Response::json($logs);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @throws \Exception
	 * @return Response
	 */
	public function store()
	{
		if (Auth::guest()) throw new \Exception( 'Silahkan Login Terlebih dahulu' );
		$msg  = Input::get('msg');
		$info = Input::get('info', 'no description');

		$newlog = $this->log->create([
			'message'     => $msg,
			'description' => $info
		]);
		return $newlog->toArray();
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int $id
	 *
	 * @return Response
	 */
	public function show($id)
	{
		return $this->log->show($id);
	}


	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int $id
	 *
	 * @return Response
	 */
	public function update($id)
	{
		return $this->log->update($id);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int $id
	 *
	 * @return Response
	 */
	public function destroy($id)
	{
		return $this->log->destroy($id);
	}

	protected function getAll()
	{
		return 'Get All Log';
	}
}

 
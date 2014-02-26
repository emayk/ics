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



namespace Emayk\Ics\Repo\Factory\User;


use Emayk\Ics\Repo\Factory\Response;

class impEloquent implements iUser {
	protected $user;

	function __construct(Eloquent $user)
	{
		$this->user = $user;
	}

	/**
	 * Menampilkan Daftar Resource
	 *
	 * @return Response
	 */
	public function all()
	{
		return $this->user->all();
	}

	/**
	 * Menyimpan Resource Baru
	 *
	 * @return Response
	 */
	public function store()
	{
		// TODO: Implement store() method.
	}

	/**
	 * Menampilkan Form New
	 *
	 * @return Response
	 */
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
		return $this->user->findOrFail($id);
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
		return $this->user->findOrFail($id);
	}

	/**
	 * Update Resource Tertentu dari Storage
	 *
	 * @param  int $id
	 *
	 * @return Response
	 */
	public function update($id)
	{
		// TODO: Implement update() method.
		return $this->user->findOrFail($id);
	}

	/**
	 * Menghapus Spesifikasi Resource dari Storage
	 *
	 * @param  int $id
	 *
	 * @return Response
	 */
	public function delete($id)
	{
		// TODO: Implement delete() method.
		return $this->user->findOrFail($id)->delete();
	}

	/**
	 * Mencari Record berdasarkan Primary key
	 *
	 * @param  int $id
	 *
	 * @return Response
	 */
	public function find($id)
	{
		return $this->user->findOrFail($id);
	}

	/**
	 * Remove from Storage
	 *
	 */
	public function destroy($id)
	{
		// TODO: Implement destroy() method.
	}

}

 
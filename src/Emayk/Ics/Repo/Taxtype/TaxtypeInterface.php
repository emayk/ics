<?php

namespace Emayk\Ics\Repo\Taxtype;
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
**/


interface TaxtypeInterface {
	/**
	 * Menampilkan Daftar Resource
	 *
	 * @return Response
	 */
    public function all();
	/**
	 * Menyimpan Resource Baru
	 *
	 * @return Response
	 */
    public function store();
	/**
	 * Menampilkan Form New
	 *
	 * @return Response
	 */
    public function create();
	/**
	 * Menampilkan Resource
	 *
	 * @param  int  $id
	 * @return Response
	 */
    public function show($id);
	/**
	 * Menampilkan Data Untuk di edit
	 *
	 * @param  int  $id
	 * @return Response
	 */
    public function edit($id);
	/**
	 * Update Resource Tertentu dari Storage
	 *
	 * @param  int  $id
	 * @return Response
	 */
    public function update($id);
	/**
	 * Menghapus Spesifikasi Resource dari Storage
	 *
	 * @param  int  $id
	 * @return Response
	 */
    public function delete($id);
	/**
	 * Mencari Record berdasarkan Primary key
	 *
	 * @param  int  $id
	 * @return Response
	 */
    public function find($id);
    /**
    * Remove from Storage
    *
    */
    public function destroy($id);
}

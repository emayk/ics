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
**/

namespace Emayk\Ics\Repo\Bank;

interface BankInterface {
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
//    /**
//     *
//     * @return mixed
//     *
//     */
//    public function all();
//
//    /**
//     *
//     * @param $id
//     * @return mixed
//     *
//     */
//    public function findById($id);
//
//    /**
//     * @return mixed
//     */
//    public function show($id);
//
//    /**
//     * @return mixed
//     */
//    public function toArray();
//
//    /**
//     * @return mixed
//     */
//    public function toJson();
//    /**
//     * @return mixed
//     */
//    public function getAll();
//
//
//    /**
//     * @param array $data
//     * @return mixed
//     */
//    public function save(array $data);
//
//
//    /**
//     * Menghapus
//     *
//     * @param $id
//     * @return mixed
//     *
//     */
//    public function delete($id);
//
//
//    /**
//     * @param $id
//     * @param array $data
//     * @return mixed
//     */
//    public function update($id,array $data);
//
//    /**
//     *
//     * Mendapatkan berdasarkan id yang diberikan
//     *
//     * @param $id
//     * @return mixed
//     */
//    public function getById($id);
//
//    public function store();

}
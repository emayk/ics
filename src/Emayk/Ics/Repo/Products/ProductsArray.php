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
* Proses Bussiness Products dengan Array Support
*
**/

namespace Emayk\Ics\Repo\Products;


class ProductsArray implements  ProductsInterface{

    protected $products;
    /*function __construct() { }*/

    /**
     * @return mixed
     */
    public function all()
    {
        return __CLASS__.' => '.time();
    }

	 /**
		* Remove from Storage
		*
		*/
	 public function destroy ($id)
	 {
			// TODO: Implement destroy() method.
	 }

	 /**
     * Simpan Products
     *
     * @return mixed
     */
    public function store()
    {
        // TODO: Implement store() method.
    }

    /**
     * Menghapus Products
     *
     * @param $id
     * @return mixed
     *
     */
    public function delete($id)
    {
        // TODO: Implement delete() method.
    }

    /**
     * Update Informasi Products
     *
     * @param $id
     * @param array $products
     * @return mixed
     */
    public function update($id)
    {
        // TODO: Implement update() method.
    }

    /**
     *
     * Mendapatkan Products berdasarkan id yang diberikan
     *
     * @param $id
     * @return mixed
     */
    public function find($id)
    {
        // TODO: Implement find() method.
    }


    /**
    *
    * Menampilkan Page Untuk Buat Data
    *
    **/

    public function create()
    {
        // TODO: Implement create() method.
    }
        /**
     * Menampilkan Resource
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        return 'saya adalah id '.$id;
    }
    /**
     * Menampilkan Data Untuk di edit
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        // TODO: Implement edit() method.
    }

}

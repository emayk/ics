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
* Proses Bussiness Warehouse dengan Array Support
*
**/

namespace Emayk\Ics\Repo\Warehouse;


class WarehouseArray implements  WarehouseInterface{

    protected $warehouse;
    /*function __construct() { }*/

    /**
     * @return mixed
     */
    public function all()
    {
        // TODO: Implement all() method.
    }

    /**
     * Simpan Warehouse
     *
     * @return mixed
     */
    public function store()
    {
        // TODO: Implement store() method.
    }

    /**
     * Menghapus Warehouse
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
     * Update Informasi Warehouse
     *
     * @param $id
     * @param array $warehouse
     * @return mixed
     */
    public function update($id)
    {
        // TODO: Implement update() method.
    }

    /**
     *
     * Mendapatkan Warehouse berdasarkan id yang diberikan
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
        // TODO: Implement show() method.
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

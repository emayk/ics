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
* Proses Bussiness Taxtype dengan Array Support
*
**/

namespace Emayk\Ics\Repo\Taxtype;


class TaxtypeArray implements  TaxtypeInterface{

    protected $taxtype;
    /*function __construct() { }*/

    /**
     * @return mixed
     */
    public function all()
    {
        // TODO: Implement all() method.
    }

    /**
     * Simpan Taxtype
     *
     * @return mixed
     */
    public function store()
    {
        // TODO: Implement store() method.
    }

    /**
     * Menghapus Taxtype
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
     * Update Informasi Taxtype
     *
     * @param $id
     * @param array $taxtype
     * @return mixed
     */
    public function update($id)
    {
        // TODO: Implement update() method.
    }

    /**
     *
     * Mendapatkan Taxtype berdasarkan id yang diberikan
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

    /**
     * Remove from Storage
     *
     */
    public function destroy($id)
    {
        // TODO: Implement destroy() method.
    }

}

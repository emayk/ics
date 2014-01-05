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
* Model Structure Eloquent
*
**/

namespace Emayk\Ics\Repo\Dept;


class DeptArray implements  DeptInterface{

    function __construct()
    {
    }

    /**
     * @return mixed
     */
    public function getAll()
    {
        // TODO: Implement getAll() method.
    }

    /**
     * Simpan Departement
     * (New Departement)
     *
     * @param $dept array
     * @return mixed
     */
    public function save(array $dept)
    {
        // TODO: Implement save() method.
    }

    /**
     * Menghapus Departement
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
     * Update Informasi Departement
     *
     * @param $id
     * @param array $dept
     * @return mixed
     */
    public function update($id, array $dept)
    {
        // TODO: Implement update() method.
    }

    /**
     *
     * Mendapatkan Departement berdasarkan id yang diberikan
     *
     * @param $id
     * @return mixed
     */
    public function getById($id)
    {
        // TODO: Implement getById() method.
    }

}
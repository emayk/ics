<?php	namespace Emayk\Ics\Repo\Legality;
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


interface LegalityInterface {
    /**
     * @return mixed
     */
    public function getAll();

    /**
     * Simpan Legality
     * (New Legality)
     *
     * @return mixed
     */
    public function save();


    /**
     * Menghapus Legality
     *
     * @param $id
     * @return mixed
     *
     */
    public function delete($id);


    /**
     * Update Informasi Legality
     *
     * @param $id
     * @return mixed
     */
    public function update($id);

    /**
     *
     * Mendapatkan Legality berdasarkan id yang diberikan
     *
     * @param $id
     * @return mixed
     */
    public function getById($id);

    /**
     * @param $id
     * @return mixed
     */
    public function goedit($id);

    /**
     * @param $id
     * @return mixed
     */
    public function goshow($id);

    /**
     *
     * Page Create Legalitas
     *
     * @return mixed
     */
    public function pageCreate();

}
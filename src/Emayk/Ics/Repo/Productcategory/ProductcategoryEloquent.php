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
 * Bussiness Logic Productcategory
 *
 **/

namespace Emayk\Ics\Repo\Productcategory;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class ProductcategoryEloquent implements ProductcategoryInterface
{
    protected $productcategory;

    function __construct(Productcategory $productcategory)
    {
        $this->productcategory = $productcategory;
    }

    /**
     *
     * Mendapatkan Record Productcategory berdasarkan ID yang diberikan
     * @param  int $id ID Record
     * @return Model Record Productcategory
     **/

    public function find($id)
    {
        return $this->productcategory->find($id);
    }

    /**
     * Mendapatkan Semua Productcategory
     * @return mixed
     */
    public function all()
    {
        $page = \Input::get('page');
        $limit = \Input::get('limit', 1);
        $start = \Input::get('start', 0);

        if (Input::has('selected'))
        {
            $id = Input::get('selected');
            $record = $this->productcategory->findOrFail($id);
            return Response::json([
                'success' => true, 'error' => false,
                'results' => $record->toArray()
            ]);
        }

        $productcategory = $this->productcategory
            ->orderBy('id', 'DESC')
            ->skip($start)
            ->take($limit)
            ->get()->toArray();
        $total = $this->productcategory
            ->all()->count();

        $productcategorys = array(
            'success' => true,
            'results' => $productcategory,
            'total' => $total
        );

        return Response::json($productcategorys)
            ->setCallback(\Input::get('callback'));

    }

    /**
     *
     * Proses Simpan Productcategory
     *
     * @return mixed
     */
    public function store()
    {
        if (!$this->hasAccess()) {
            return Response::json(
                array(
                    'success' => false,
                    'reason' => 'Action Need Login First',
                    'results' => null
                ))->setCallback();
        }
        /*==========  Sesuaikan dengan Field di table  ==========*/
         $this->productcategory->name = Input::get('name');
         $this->productcategory->info = Input::get('info');
         $this->productcategory->uuid = uniqid('New_');
         $this->productcategory->parent_type = '\Emayk\Ics\Repo\Productcategory\Productcategory';
         $this->productcategory->kodeinternal = uniqid();
         $this->productcategory->createby_id = \Auth::user()->id;
         $this->productcategory->lastupdateby_id = \Auth::user()->id;
         $this->productcategory->created_at = new Carbon();
         $this->productcategory->updated_at = new Carbon();
        $saved = $this->productcategory->save() ? true : false;
        return Response::json(array(
            'success' => $saved,
            'results' => $this->productcategory->toArray()
        ))->setCallback();
    }

    /**
     * Menghapus Productcategory
     *
     * @param $id
     * @return mixed
     *
     */
    public function delete($id)
    {

        if ($this->hasAccess()) {
            $deleted = $this->productcategory
                ->find($id)
                ->delete();

            return \Icsoutput::toJson(array(
                'results' => $deleted
            ), $deleted);

        } else {
            return \Icsoutput::toJson(array(
                'results' => false,
                'reason' => 'Dont Have Access to Delete '
            ), false);
        }
    }

    /**
     * Update Informasi [[cName]]
     *
     * @param $id
     * @return mixed
     */
    public function update($id)
    {
        $db = $this->productcategory->find($id);
        /*==========  Sesuaikan  ==========*/
        // $db->name = Input::get('name');
         $db->info = Input::get('info');
        $db->uuid = uniqid('Update_');
        return ($db->save())
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
        return (!Auth::guest());
    }

    /**
     *
     * Menampilkan Page Create data Productcategory
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
     * @return Response
     */
    public function show($id)
    {
        $record = $this->productcategory->findOrFail($id);

        return Response::json([
            'success' => true, 'error' => false,
            'results' => $record->toArray()
        ]);


    }

    /**
     * Menampilkan Data Untuk di edit
     *
     * @param  int $id
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
     * @return Response
     */
    public function destroy($id)
    {
        return $this->delete($id);
    }


}

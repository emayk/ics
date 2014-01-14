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
 * Bussiness Logic Locations
 *
 **/

namespace Emayk\Ics\Repo\Locations;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class LocationsEloquent implements LocationsInterface
{
    protected $locations;

    function __construct(Locations $locations)
    {
        $this->locations = $locations;

    }

    /**
     *
     * Mendapatkan Record Locations berdasarkan ID yang diberikan
     * @param  int $id ID Record
     * @return Model Record Locations
     **/

    public function find($id)
    {
        return $this->locations->find($id);
    }

    /**
     * Mendapatkan Semua Locations
     * @return mixed
     */
    public function all()
    {
        $page = \Input::get('page');
        $limit = \Input::get('limit', 1);
        $start = \Input::get('start', 1);

        /**
         * Request dari Combo box
         *
         */
        if (Input::has('cbreq')) {
            $req = Input::get('cbreq');
            $data = $this->locations;
            if (Input::has('level')) {
                $level = Input::get('level');
                $data = $data->where('level', $level);
            }
            $total = $data->count();
            $response = $data
                ->skip($start)
                ->take($limit)
                ->get(array('id', 'name'))->toArray();

            return Response::json(
                array('results' => $response,
                    'success' => true,
                    'total' => $total
                )
            );
        }
        /**
         * Request dari Grid
         */
        if (Input::has('type')) {
            $type = Input::get('type');
            if (Input::has('parentId')) {
                $parentId = Input::get('parentId');
                $locations = $this->locations->findByTypeAndParent($type, $parentId, Input::all());
                return $this->response($locations, count($locations));
            }
            $locations = $this->locations->findByType($type, Input::all());
            return $this->response($locations, count($locations));
        }

        $locations = $this->locations
            ->orderBy('id', 'DESC')
            ->skip($start)
            ->take($limit)
            ->get()->toArray();
        $total = $this->locations
            ->all()->count();

        return $this->response($locations, $total);

    }

    protected function response(array $locations, $total)
    {
        $locationss = array(
            'success' => true,
            'results' => $locations,
            'total' => $total
        );

        return Response::json($locationss)
            ->setCallback(\Input::get('callback'));

    }

    /**
     *
     * Proses Simpan Locations
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

        $this->locations->name = Input::get('name');
        $level = Input::get('level');
        if ($level == 1) {
            /*Nama Tidak Boleh Sama */
            $name = Input::get('name');
            $exist = $this->locations->whereName($name)->count();
            if ($exist) {
                return Response::json(
                    array('success' => false,
                        'reason' => 'Nama Negara harus Unique, sepertinya Negara Sudah ada'
                    ), 500
                );
            };
            $parentId = 0;
        } else {
            $parentId = Input::get('parent_id', 0);
        }

        /*Proses Saving*/
        $this->locations->info = Input::get('info');
        $this->locations->uuid = uniqid('New_');
        $this->locations->parent_id = $parentId;
        $this->locations->parent_type = '\Emayk\Ics\Repo\Locations\Locations';
        $this->locations->createby_id = 1; // \Auth::user()->id;
        $this->locations->lastupdateby_id = 1; //\Auth::user()->id;
        $this->locations->created_at = new Carbon();
        $this->locations->updated_at = new Carbon();
        $saved = $this->locations->save() ? true : false;
        return Response::json(array(
            'success' => $saved,
            'results' => $this->locations->toArray()
        ))->setCallback();
    }

    /**
     * Menghapus Locations
     *
     * @param $id
     * @return mixed
     *
     */
    public function delete($id)
    {

        if ($this->hasAccess()) {
            $deleted = $this->locations
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
        /**
         * test
         */

        return Response::json(
          array('success' => true,
              'error' => true,
          'reason' => Input::get('name').' Cannot Find blable')
        );


        $db = $this->locations->find($id);
        /*==========  Sesuaikan  ==========*/
        $db->name = Input::get('name');
        $db->info = Input::get('info');
        $db->parent_id = Input::get('parent_id');
        $db->uuid = uniqid('Update_');
        $saved = $db->save();
        return ($saved)
            ? Response::json(array_merge(
                $db->toArray(),
                array('success' => $saved)
            ))
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
     * Menampilkan Page Create data Locations
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
        // TODO: Implement show() method.
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

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
 * Bussiness Logic Fabricgrade
 *
 **/

namespace Emayk\Ics\Repo\Fabricgrade;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class FabricgradeEloquent implements FabricgradeInterface
{
    protected $fabricgrade;

    function __construct(Fabricgrade $fabricgrade)
    {
        $this->fabricgrade = $fabricgrade;
    }

    /**
     *
     * Mendapatkan Record Fabricgrade berdasarkan ID yang diberikan
     * @param  int $id ID Record
     * @return Model Record Fabricgrade
     **/

    public function find($id)
    {
        return $this->fabricgrade->find($id);
    }

    /**
     * Mendapatkan Semua Fabricgrade
     * @return mixed
     */
    public function all()
    {

        $page = Input::get('page');
        $limit = Input::get('limit', 1);
        $start = Input::get('start', 1);

        if (Input::has('selected'))
        {
            $id = Input::get('selected');
            $record = $this->fabricgrade->findOrFail($id);
            return Response::json([
                'success' => true, 'error' => false,
                'results' => $record->toArray()
            ]);
        }

        $fabricgrade = $this->fabricgrade
            ->orderBy('updated_at', 'DESC');
        $total = $fabricgrade->count();
        $fabricgrade = $fabricgrade
            ->skip($start)
            ->take($limit)
            ->get()->toArray();

        $fabricgrades = array(
            'success' => true,
            'results' => $fabricgrade,
            'total' => $total
        );

        return Response::json($fabricgrades)
            ->setCallback(Input::get('callback'));

    }

    /**
     *
     * Proses Simpan Fabricgrade
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
//        $record =
        /*==========  Sesuaikan dengan Field di table  ==========*/
        $this->fabricgrade->name = Input::get('name');
        $this->fabricgrade->info = Input::get('info');
        $this->fabricgrade->uuid = uniqid('New_');
        $this->fabricgrade->createby_id = \Auth::user()->id;
        $this->fabricgrade->lastupdateby_id = \Auth::user()->id;
        $this->fabricgrade->created_at = new Carbon();
        $this->fabricgrade->updated_at = new Carbon();
        $saved = $this->fabricgrade->save() ? true : false;
        return Response::json(array(
            'success' => $saved,
            'results' => $this->fabricgrade->toArray()
        ))->setCallback();
    }

    /**
     * Menghapus Fabricgrade
     *
     * @param $id
     * @return mixed
     *
     */
    public function delete($id)
    {

        if ($this->hasAccess()) {
            $deleted = $this->fabricgrade
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
        $db = $this->fabricgrade->find($id);
        /*==========  Sesuaikan  ==========*/
//        $db->name = Input::get('name');
        $db->info = Input::get('info');
        $db->uuid = uniqid('Update_');
        return ($db->save()) ?
            \Icsoutput::msgSuccess($db->toArray())
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
     * Menampilkan Page Create data Fabricgrade
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

    public function destroy($id)
    {
        return $this->delete($id);
    }

    public function productDetail()
    {
        return $this->fabricgrade->products()->get()->toArray();
    }


}

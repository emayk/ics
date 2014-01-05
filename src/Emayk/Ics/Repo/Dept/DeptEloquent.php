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
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class DeptEloquent implements DeptInterface{
    protected $dept;
    function __construct(Dept $dept)
    {
        $this->dept = $dept;
    }

    /**
     * Mendapatkan Semua Departement
     */
    public function all(){

    }

    public function getById($id){
        return $this->dept->find($id);
    }

    /**
     * @return mixed
     */
    public function getAll()
    {
        $page = \Input::get('page');
        $limit = \Input::get('limit',1);
        $start = \Input::get('start',1);
        $_data = $this->dept->orderBy('id','DESC')->skip($start)->take($limit)->get()->toArray();
        $total = $this->dept->all()->count();

        $data = array('success' => true,
            'results' => $_data,
            'total' => $total
        );
        return \Response::json($data)
            ->setCallback(\Input::get('callback'));

    }

    /**
     * Simpan Departement
     * (New Departement)
     *
     * @return mixed
     */
    public function save()
    {
        $this->dept->name = Input::get('name');
        $this->dept->info = Input::get('info');
        $this->dept->uuid = uniqid('New_');
        $this->dept->createby_id = \Auth::user()->id;
        $this->dept->lastupdateby_id = \Auth::user()->id;
        $this->dept->created_at = new Carbon();
        $this->dept->updated_at = new Carbon();
        $saved = $this->dept->save() ? true : false ;
        return Response::json(array('success' => $saved,
            'results' => $this->dept->toArray()
        ))->setCallback();
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
        if ($this->hasAccess())
        {
            $deleted = $this->dept->find($id)->delete();
            return \Icsoutput::toJson(array(
                'results' => $deleted
            ),$deleted);
        }else{
            return \Icsoutput::toJson(array(
                'results' => false,
                'reason' => 'Dont Have Access to Delete '
            ),false);
        }
    }

    /**
     * Update Informasi Departement
     *
     * @param $id
     * @return mixed
     */
    public function update($id)
    {
        $db = $this->dept->find($id);
        $db->name = Input::get('name');
        $db->info = Input::get('info');
        $db->uuid = uniqid('Update_');
        return $db->save();
    }

    protected function  hasAccess(){

        return (isset( \Auth::user()->id ) );
    }

}
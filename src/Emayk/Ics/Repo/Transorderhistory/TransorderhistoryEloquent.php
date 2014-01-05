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
* Bussiness Logic Transorderhistory
*
**/

namespace Emayk\Ics\Repo\Transorderhistory;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class TransorderhistoryEloquent implements TransorderhistoryInterface{
    protected $transorderhistory;
    function __construct(Transorderhistory $transorderhistory)
    {
        $this->transorderhistory = $transorderhistory;
    }

    /**
    *
    * Mendapatkan Record Transorderhistory berdasarkan ID yang diberikan
    * @param  int $id ID Record
    * @return Model Record Transorderhistory
    **/

    public function find($id){
        return $this->transorderhistory->find($id);
    }

    /**
     * Mendapatkan Semua Transorderhistory
     * @return mixed
     */
    public function all()
    {
        $page = \Input::get('page');
			 $limit = \Input::get('limit',1);
			 $start = \Input::get('start',1);
        $transorderhistory = $this->transorderhistory
            ->orderBy('id','DESC')
            ->skip($start)
            ->take($limit)
            ->get()->toArray();
        $total = $this->transorderhistory
            ->all()->count();

        $transorderhistorys = array(
            'success' => true,
            'results' => $transorderhistory,
            'total' => $total
        );

        return Response::json($transorderhistorys)
            ->setCallback(\Input::get('callback'));

    }

    /**
     *
     * Proses Simpan Transorderhistory
     *
     * @return mixed
     */
    public function store()
    {
        if (!$this->hasAccess()) {
            return Response::json(
                      array(
                        'success' => false,
                        'reason'  => 'Action Need Login First',
                        'results' => null
                        ))->setCallback();
        }
        /*==========  Sesuaikan dengan Field di table  ==========*/
        // $this->transorderhistory->name = Input::get('name');
        // $this->transorderhistory->info = Input::get('info');
        // $this->transorderhistory->uuid = uniqid('New_');
        // $this->transorderhistory->createby_id = \Auth::user()->id;
        // $this->transorderhistory->lastupdateby_id = \Auth::user()->id;
        // $this->transorderhistory->created_at = new Carbon();
        // $this->transorderhistory->updated_at = new Carbon();
        $saved = $this->transorderhistory->save() ? true : false ;
        return Response::json(array(
            'success' => $saved,
            'results' => $this->transorderhistory->toArray()
        ))->setCallback();
    }

    /**
     * Menghapus Transorderhistory
     *
     * @param $id
     * @return mixed
     *
     */
    public function delete($id)
    {

        if ($this->hasAccess())
        {
            $deleted = $this->transorderhistory
                ->find($id)
                ->delete();

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
     * Update Informasi [[cName]]
     *
     * @param $id
     * @return mixed
     */
    public function update($id)
    {
        $db = $this->transorderhistory->find($id);
        /*==========  Sesuaikan  ==========*/
        // $db->name = Input::get('name');
        // $db->info = Input::get('info');
        $db->uuid = uniqid('Update_');
        return ($db->save())
            ? \Icsoutput::msgSuccess( $db->toArray() )
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
    * Menampilkan Page Create data Transorderhistory
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
     * Remove Storage
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        return $this->delete($id);
    }



}

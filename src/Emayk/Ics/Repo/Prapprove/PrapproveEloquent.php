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
* Bussiness Logic Prapprove
*
**/

namespace Emayk\Ics\Repo\Prapprove;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class PrapproveEloquent implements PrapproveInterface{
    protected $prapprove;
    function __construct(Prapprove $prapprove)
    {
        $this->prapprove = $prapprove;
    }

    /**
    *
    * Mendapatkan Record Prapprove berdasarkan ID yang diberikan
    * @param  int $id ID Record
    * @return Model Record Prapprove
    **/

    public function find($id){
        return $this->prapprove->find($id);
    }

    /**
     * Mendapatkan Semua Prapprove
     *
     * @return mixed
     */
    public function all()
    {
        $page = \Input::get('page',1);
        $a_prapprove = $this->prapprove;
        $prapprove = \Cache::remember('prapprove'.$page,10,function() use($a_prapprove){
            $limit =  \Input::get('limit',1);
            $start = \Input::get('start',0);
            return $a_prapprove->skip($start)->take($limit)->get();
        });

        $total = $this->prapprove->count();

        $prapproves = array(
            'success' => true,
            'results' => $prapprove->toArray(),
            'total' => $total
        );

        return Response::json($prapproves)
            ->setCallback(\Input::get('callback'));

    }

    /**
     *
     * Proses Simpan Prapprove
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
        // $this->prapprove->name = Input::get('name');
        // $this->prapprove->info = Input::get('info');
        // $this->prapprove->uuid = uniqid('New_');
        // $this->prapprove->createby_id = \Auth::user()->id;
        // $this->prapprove->lastupdateby_id = \Auth::user()->id;
        // $this->prapprove->created_at = new Carbon();
        // $this->prapprove->updated_at = new Carbon();
        $saved = $this->prapprove->save() ? true : false ;
        return Response::json(array(
            'success' => $saved,
            'results' => $this->prapprove->toArray()
        ))->setCallback();
    }

    /**
     * Menghapus Prapprove
     *
     * @param $id
     * @return mixed
     *
     */
    public function delete($id)
    {

        if ($this->hasAccess())
        {
            $deleted = $this->prapprove
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
        $db = $this->prapprove->find($id);
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
    * Menampilkan Page Create data Prapprove
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

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
* Bussiness Logic Approvaltype
*
**/

namespace Emayk\Ics\Repo\Approvaltype;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class ApprovaltypeEloquent implements ApprovaltypeInterface{
    protected $approvaltype;
    function __construct(Approvaltype $approvaltype)
    {
        $this->approvaltype = $approvaltype;
    }

    /**
    *
    * Mendapatkan Record Approvaltype berdasarkan ID yang diberikan
    * @param  int $id ID Record
    * @return Model Record Approvaltype
    **/

    public function find($id){
        return $this->approvaltype->find($id);
    }

    /**
     * Mendapatkan Semua Approvaltype
     * @return mixed
     */
    public function all()
    {
       $page = \Input::get('page');
			 $limit = \Input::get('limit',1);
			 $start = \Input::get('start',1);
        $approvaltype = $this->approvaltype
            ->orderBy('id','DESC')
            ->skip($start)
            ->take($limit)
            ->get()->toArray();
        $total = $this->approvaltype
            ->all()->count();

        $approvaltypes = array(
            'success' => true,
            'results' => $approvaltype,
            'total' => $total
        );

        return Response::json($approvaltypes)
            ->setCallback(\Input::get('callback'));

    }

    /**
     *
     * Proses Simpan Approvaltype
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
        // $this->approvaltype->name = Input::get('name');
        // $this->approvaltype->info = Input::get('info');
        // $this->approvaltype->uuid = uniqid('New_');
        // $this->approvaltype->createby_id = \Auth::user()->id;
        // $this->approvaltype->lastupdateby_id = \Auth::user()->id;
        // $this->approvaltype->created_at = new Carbon();
        // $this->approvaltype->updated_at = new Carbon();
        $saved = $this->approvaltype->save() ? true : false ;
        return Response::json(array(
            'success' => $saved,
            'results' => $this->approvaltype->toArray()
        ))->setCallback();
    }

    /**
     * Menghapus Approvaltype
     *
     * @param $id
     * @return mixed
     *
     */
    public function delete($id)
    {

        if ($this->hasAccess())
        {
            $deleted = $this->approvaltype
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
        $db = $this->approvaltype->find($id);
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
        return (!\Auth::guest());
    }

    /**
    *
    * Menampilkan Page Create data Approvaltype
    *
    **/

   public function create()
    {
			 return $this->approvaltype->create(\Input::all());
    }

    /**
     * Menampilkan Resource
     *
     * @param  int  $id
     * @return Response
     */
   public function show($id)
    {
			 return $this->approvaltype->find($id);//->toArray();
    }
    /**
     * Menampilkan Data Untuk di edit
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
			 return $this->approvaltype->find($id);//->toArray();
    }

    /**
     * Remove Storage
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        return $this->approvaltype->find($id)->delete();
    }

}

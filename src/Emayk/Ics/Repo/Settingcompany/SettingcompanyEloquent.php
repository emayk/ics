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
* Bussiness Logic Settingcompany
*
**/

namespace Emayk\Ics\Repo\Settingcompany;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class SettingcompanyEloquent implements SettingcompanyInterface{
    protected $settingcompany;
    function __construct(Settingcompany $settingcompany)
    {
        $this->settingcompany = $settingcompany;
    }

    /**
    *
    * Mendapatkan Record Settingcompany berdasarkan ID yang diberikan
    * @param  int $id ID Record
    * @return Model Record Settingcompany
    **/

    public function find($id){
        return $this->settingcompany->find($id);
    }

    /**
     * Mendapatkan Semua Settingcompany
     * @return mixed
     */
    public function all()
    {
        $page = \Input::get('page');
			 $limit = \Input::get('limit',1);
			 $start = \Input::get('start',1);
        $settingcompany = $this->settingcompany
            ->orderBy('id','DESC')
            ->skip($start)
            ->take($limit)
            ->get()->toArray();
        $total = $this->settingcompany
            ->all()->count();

        $settingcompanys = array(
            'success' => true,
            'results' => $settingcompany,
            'total' => $total
        );

        return Response::json($settingcompanys)
            ->setCallback(\Input::get('callback'));

    }

    /**
     *
     * Proses Simpan Settingcompany
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
        // $this->settingcompany->name = Input::get('name');
        // $this->settingcompany->info = Input::get('info');
        // $this->settingcompany->uuid = uniqid('New_');
        // $this->settingcompany->createby_id = \Auth::user()->id;
        // $this->settingcompany->lastupdateby_id = \Auth::user()->id;
        // $this->settingcompany->created_at = new Carbon();
        // $this->settingcompany->updated_at = new Carbon();
        $saved = $this->settingcompany->save() ? true : false ;
        return Response::json(array(
            'success' => $saved,
            'results' => $this->settingcompany->toArray()
        ))->setCallback();
    }

    /**
     * Menghapus Settingcompany
     *
     * @param $id
     * @return mixed
     *
     */
    public function delete($id)
    {

        if ($this->hasAccess())
        {
            $deleted = $this->settingcompany
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
        $db = $this->settingcompany->find($id);
        /*==========  Sesuaikan  ==========*/
         $db->name = Input::get('name');
         $db->address = Input::get('address');
         $db->city_id = Input::get('city_id');
         $db->phone = Input::get('phone');
         $db->fax = Input::get('fax');
         $db->lastupdateby_id = Input::get('lastupdateby_id');
         $db->updated_at = new \DateTime();
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
    * Menampilkan Page Create data Settingcompany
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
			 $data = $this->settingcompany->find($id);
			 if (!$data){
					return \Response::json(array(
						 'results' => null,
						 'success'=> false,
						 'reason' => 'Not Found'
					));
			 }


			 return Response::json(
					array('results' => $data->toArray(),
								'success' => true,
								'total' => $data->count()
					)
			 );
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

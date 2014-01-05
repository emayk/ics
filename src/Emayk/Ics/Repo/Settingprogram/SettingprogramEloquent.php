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
* Bussiness Logic Settingprogram
*
**/

namespace Emayk\Ics\Repo\Settingprogram;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class SettingprogramEloquent implements SettingprogramInterface{
    protected $settingprogram;
    function __construct(Settingprogram $settingprogram)
    {
        $this->settingprogram = $settingprogram;
    }

    /**
    *
    * Mendapatkan Record Settingprogram berdasarkan ID yang diberikan
    * @param  int $id ID Record
    * @return Model Record Settingprogram
    **/

    public function find($id){
        return $this->settingprogram->find($id);
    }

    /**
     * Mendapatkan Semua Settingprogram
     * @return mixed
     */
    public function all()
    {
        $page = \Input::get('page');
			 $limit = \Input::get('limit',1);
			 $start = \Input::get('start',1);
        $settingprogram = $this->settingprogram
            ->orderBy('id','DESC')
            ->skip($start)
            ->take($limit)
            ->get()->toArray();
        $total = $this->settingprogram
            ->all()->count();

        $settingprograms = array(
            'success' => true,
            'results' => $settingprogram,
            'total' => $total
        );

        return Response::json($settingprograms)
            ->setCallback(\Input::get('callback'));

    }

    /**
     *
     * Proses Simpan Settingprogram
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
        // $this->settingprogram->name = Input::get('name');
        // $this->settingprogram->info = Input::get('info');
        // $this->settingprogram->uuid = uniqid('New_');
        // $this->settingprogram->createby_id = \Auth::user()->id;
        // $this->settingprogram->lastupdateby_id = \Auth::user()->id;
        // $this->settingprogram->created_at = new Carbon();
        // $this->settingprogram->updated_at = new Carbon();
        $saved = $this->settingprogram->save() ? true : false ;
        return Response::json(array(
            'success' => $saved,
            'results' => $this->settingprogram->toArray()
        ))->setCallback();
    }

    /**
     * Menghapus Settingprogram
     *
     * @param $id
     * @return mixed
     *
     */
    public function delete($id)
    {

        if ($this->hasAccess())
        {
            $deleted = $this->settingprogram
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
        $db = $this->settingprogram->find($id);
        /*==========  Sesuaikan  ==========*/
			 $db->name = Input::get('name');
			 $db->address = Input::get('address');
			 $db->city_id = Input::get('city_id');
			 $db->telp = Input::get('telp');
			 $db->fax = Input::get('fax');
			 $db->npwp = Input::get('npwp');
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
    * Menampilkan Page Create data Settingprogram
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
		 $data = $this->settingprogram->find($id);
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

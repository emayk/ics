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
* Bussiness Logic Warehouse
*
**/

namespace Emayk\Ics\Repo\Warehouse;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class WarehouseEloquent implements WarehouseInterface{
    protected $warehouse;
    function __construct(Warehouse $warehouse)
    {
        $this->warehouse = $warehouse;
    }

    /**
    *
    * Mendapatkan Record Warehouse berdasarkan ID yang diberikan
    * @param  int $id ID Record
    * @return Model Record Warehouse
    **/

    public function find($id){
        return $this->warehouse->find($id);
    }

    /**
     * Mendapatkan Semua Warehouse
     * @return mixed
     */
    public function all()
    {
        $page = \Input::get('page');
			 $limit = \Input::get('limit',1);
			 $start = \Input::get('start',1);

        if (Input::has('selected'))
        {
            $id = Input::get('selected');
            $record = $this->warehouse->findOrFail($id);
            return Response::json([
                'success' => true, 'error' => false,
                'results' => $record->toArray()
            ]);
        }

        $warehouse = $this->warehouse
            ->with('city','category')
            ->orderBy('id','DESC')
            ->skip($start)
            ->take($limit)
            ->get()->toArray();
        $total = $this->warehouse
            ->all()->count();

        $warehouses = array(
            'success' => true,
            'results' => $warehouse,
            'total' => $total
        );

        return Response::json($warehouses)
            ->setCallback(\Input::get('callback'));

    }

    /**
     *
     * Proses Simpan Warehouse
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
         $this->warehouse->name = Input::get('name');
         $this->warehouse->address = Input::get('address');
         $this->warehouse->cat_id = Input::get('cat_id');
         $this->warehouse->city_id = Input::get('city_id');
         $this->warehouse->uuid = uniqid('New_');
         $this->warehouse->createby_id = \Auth::user()->id;
         $this->warehouse->lastupdateby_id = \Auth::user()->id;
         $this->warehouse->created_at = new Carbon();
         $this->warehouse->updated_at = new Carbon();
        $saved = $this->warehouse->save() ? true : false ;
        return Response::json(array(
            'success' => $saved,
            'results' => $this->warehouse->toArray()
        ))->setCallback();
    }

    /**
     * Menghapus Warehouse
     *
     * @param $id
     * @return mixed
     *
     */
    public function delete($id)
    {

        if ($this->hasAccess())
        {
            $deleted = $this->warehouse
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
        $db = $this->warehouse->find($id);
        /*==========  Sesuaikan  ==========*/
        $db->address = Input::get('address');
        $db->cat_id = Input::get('cat_id');
        $db->city_id = Input::get('city_id');
        $db->lastupdateby_id = \Auth::user()->id;
//        $db->name = Input::get('name');
        $db->updated_at = new Carbon();
        $db->uuid = uniqid('Update_');
        return ($db->save()) ?
            \Icsoutput::msgSuccess( $db->toArray() )
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
    * Menampilkan Page Create data Warehouse
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

					$db = $this->warehouse->find($id);
			 return (!$db)
				 ? \Icsoutput::msgError(array('reason' => 'Cannot Found'))
				 : \Icsoutput::msgSuccess($db->toArray());
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

    public function destroy($id)
    {
       return $this->delete($id);
    }


}

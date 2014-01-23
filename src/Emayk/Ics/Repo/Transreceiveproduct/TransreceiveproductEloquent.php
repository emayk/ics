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
* Bussiness Logic Transreceiveproduct
*
**/

namespace Emayk\Ics\Repo\Transreceiveproduct;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class TransreceiveproductEloquent implements TransreceiveproductInterface{
    protected $transreceiveproduct;
    function __construct(Transreceiveproduct $transreceiveproduct)
    {
        $this->transreceiveproduct = $transreceiveproduct;
    }

    /**
    *
    * Mendapatkan Record Transreceiveproduct berdasarkan ID yang diberikan
    * @param  int $id ID Record
    * @return Model Record Transreceiveproduct
    **/

    public function find($id){
        return $this->transreceiveproduct->find($id);
    }

    /**
     * Mendapatkan Semua Transreceiveproduct
     * @return mixed
     */
    public function all()
    {
        $page = \Input::get('page',1);
        $a_transreceiveproduct = $this->transreceiveproduct;
        $transreceiveproduct = \Cache::remember('transreceiveproduct'.$page,10,function() use($a_transreceiveproduct){
            $limit =  \Input::get('limit',1);
            $start = \Input::get('start',0);
            return $a_transreceiveproduct->skip($start)->take($limit)->get();
        });

        $total = $this->transreceiveproduct->count();

        $transreceiveproducts = array(
            'success' => true,
            'results' => $transreceiveproduct->toArray(),
            'total' => $total
        );

        return Response::json($transreceiveproducts)
            ->setCallback(\Input::get('callback'));

    }

    /**
     *
     * Proses Simpan Transreceiveproduct
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
        // $this->transreceiveproduct->name = Input::get('name');
        // $this->transreceiveproduct->info = Input::get('info');
        // $this->transreceiveproduct->uuid = uniqid('New_');
        // $this->transreceiveproduct->createby_id = \Auth::user()->id;
        // $this->transreceiveproduct->lastupdateby_id = \Auth::user()->id;
        // $this->transreceiveproduct->created_at = new Carbon();
        // $this->transreceiveproduct->updated_at = new Carbon();
        $saved = $this->transreceiveproduct->save() ? true : false ;
        return Response::json(array(
            'success' => $saved,
            'results' => $this->transreceiveproduct->toArray()
        ))->setCallback();
    }

    /**
     * Menghapus Transreceiveproduct
     *
     * @param $id
     * @return mixed
     *
     */
    public function delete($id)
    {

        if ($this->hasAccess())
        {
            $deleted = $this->transreceiveproduct
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
        $db = $this->transreceiveproduct->find($id);
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
    * Menampilkan Page Create data Transreceiveproduct
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

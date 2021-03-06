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
* Bussiness Logic Sysprodhistory
*
**/

namespace Emayk\Ics\Repo\Sysprodhistory;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class SysprodhistoryEloquent implements SysprodhistoryInterface{
    protected $sysprodhistory;
    function __construct(Sysprodhistory $sysprodhistory)
    {
        $this->sysprodhistory = $sysprodhistory;
    }

    /**
    *
    * Mendapatkan Record Sysprodhistory berdasarkan ID yang diberikan
    * @param  int $id ID Record
    * @return Model Record Sysprodhistory
    **/

    public function find($id){
        return $this->sysprodhistory->find($id);
    }

	/**
	 * Mendapatkan Semua Sysprodhistory
	 *
	 * @throws \Exception
	 * @return mixed
	 */
    public function all()
    {
        $page = \Input::get('page',1);
        $a_sysprodhistory = $this->sysprodhistory;
            $limit =  \Input::get('limit',1);
            $start = \Input::get('start',0);

//        $sysprodhistory = \Cache::remember('sysprodhistory'.$page,10,function() use($a_sysprodhistory){
//            $limit =  \Input::get('limit',1);
//            $start = \Input::get('start',0);
//            return $a_sysprodhistory->skip($start)->take($limit)->get();
//        });

	    /*Jika tidak product_id throw*/
	    if (!Input::has('product_id')){
		    throw new \Exception('Need Product id');
	    }
	    $prodId = Input::get('product_id');
        $sysprodhistory = $a_sysprodhistory->where('product_id',$prodId);
	    $total = $sysprodhistory->count();
	    $sysprodhistory = $sysprodhistory->skip($start)->take($limit)->get();

        $sysprodhistorys = array(
            'success' => true,
            'results' => $sysprodhistory->toArray(),
            'total' => $total
        );

        return Response::json($sysprodhistorys)
            ->setCallback(\Input::get('callback'));

    }

    /**
     *
     * Proses Simpan Sysprodhistory
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
        // $this->sysprodhistory->name = Input::get('name');
        // $this->sysprodhistory->info = Input::get('info');
        // $this->sysprodhistory->uuid = uniqid('New_');
        // $this->sysprodhistory->createby_id = \Auth::user()->id;
        // $this->sysprodhistory->lastupdateby_id = \Auth::user()->id;
        // $this->sysprodhistory->created_at = new Carbon();
        // $this->sysprodhistory->updated_at = new Carbon();
        $saved = $this->sysprodhistory->save() ? true : false ;
        return Response::json(array(
            'success' => $saved,
            'results' => $this->sysprodhistory->toArray()
        ))->setCallback();
    }

    /**
     * Menghapus Sysprodhistory
     *
     * @param $id
     * @return mixed
     *
     */
    public function delete($id)
    {

        if ($this->hasAccess())
        {
            $deleted = $this->sysprodhistory
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
        $db = $this->sysprodhistory->find($id);
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
    * Menampilkan Page Create data Sysprodhistory
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

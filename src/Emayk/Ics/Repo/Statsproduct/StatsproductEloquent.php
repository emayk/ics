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
* Bussiness Logic Statsproduct
*
**/

namespace Emayk\Ics\Repo\Statsproduct;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class StatsproductEloquent implements StatsproductInterface{
    protected $statsproduct;
    function __construct(Statsproduct $statsproduct)
    {
        $this->statsproduct = $statsproduct;
    }

    /**
    *
    * Mendapatkan Record Statsproduct berdasarkan ID yang diberikan
    * @param  int $id ID Record
    * @return Model Record Statsproduct
    **/

    public function find($id){
        return $this->statsproduct->find($id);
    }

    /**
     * Mendapatkan Semua Statsproduct
     * @return mixed
     */
    public function all()
    {
        $page = \Input::get('page',1);
			 	$statsproduct = $this->statsproduct;
        if (Input::has('limit'))  {
			 		$limit = \Input::get('limit');
			 		$statsproduct = $statsproduct->take($limit);
				}

			   if (Input::has('limit'))  {
						$start =  \Input::get('start');
			 			$statsproduct = $statsproduct->skip($start);
				}


        $statsproduct = $statsproduct->get()->toArray();
        $total = $this->statsproduct
            ->all()->count();

        $statsproducts = array(
            'success' => true,
            'results' => $statsproduct,
            'total' => $total
        );

        return Response::json($statsproducts)
            ->setCallback(\Input::get('callback'));

    }

    /**
     *
     * Proses Simpan Statsproduct
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
        // $this->statsproduct->name = Input::get('name');
        // $this->statsproduct->info = Input::get('info');
        // $this->statsproduct->uuid = uniqid('New_');
        // $this->statsproduct->createby_id = \Auth::user()->id;
        // $this->statsproduct->lastupdateby_id = \Auth::user()->id;
        // $this->statsproduct->created_at = new Carbon();
        // $this->statsproduct->updated_at = new Carbon();
        $saved = $this->statsproduct->save() ? true : false ;
        return Response::json(array(
            'success' => $saved,
            'results' => $this->statsproduct->toArray()
        ))->setCallback();
    }

    /**
     * Menghapus Statsproduct
     *
     * @param $id
     * @return mixed
     *
     */
    public function delete($id)
    {

        if ($this->hasAccess())
        {
            $deleted = $this->statsproduct
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
        $db = $this->statsproduct->find($id);
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
    * Menampilkan Page Create data Statsproduct
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

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
* Bussiness Logic Productdetails
*
**/

namespace Emayk\Ics\Repo\Productdetails;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class ProductdetailsEloquent implements ProductdetailsInterface{
    /**
     * @var array
     */

    protected $productdetails;
    function __construct(Productdetails $productdetails)
    {
        $this->productdetails = $productdetails;
    }

    /**
    *
    * Mendapatkan Record Productdetails berdasarkan ID yang diberikan
    * @param  int $id ID Record
    * @return Model Record Productdetails
    **/

    public function find($id){
        return $this->productdetails->find($id);
    }

    /**
     * Mendapatkan Semua Productdetails
     * @return mixed
     */
    public function all()
    {
//			 return $this->productdetails->all();
        $page = \Input::get('page');
        $limit = \Input::get('limit',1);
        $start = \Input::get('start',1);
        $productdetails = $this->productdetails
            ->orderBy('id','DESC')
            ->skip($start)
            ->take($limit)
            ->get()->toArray();
        $total = $this->productdetails
            ->all()->count();

        $productdetailss = array(
            'success' => true,
            'results' => $productdetails,
            'total' => $total
        );

        return Response::json($productdetailss)
            ->setCallback(\Input::get('callback'));

    }

    /**
     *
     * Proses Simpan Productdetails
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
         $this->productdetails->product_id = Input::get('product_id');
         $this->productdetails->color_id = Input::get('color_id');
         $this->productdetails->unit_id = Input::get('unit_id');
         $this->productdetails->grade_id = Input::get('grade_id');
         $this->productdetails->salesprice = Input::get('salesprice');
         $this->productdetails->salespricemin = Input::get('salespricemin');
         $this->productdetails->currsp_id = Input::get('currsp_id');
         $this->productdetails->currspm_id = Input::get('currspm_id');
         $this->productdetails->uuid = uniqid('New_');
         $this->productdetails->createby_id = \Auth::user()->id;
         $this->productdetails->lastupdateby_id = \Auth::user()->id;
         $this->productdetails->created_at = new Carbon();
         $this->productdetails->updated_at = new Carbon();
        $saved = $this->productdetails->save() ? true : false ;
        return Response::json(array(
            'success' => $saved,
            'results' => $this->productdetails->toArray()
        ))->setCallback();
    }

    /**
     * Menghapus Productdetails
     *
     * @param $id
     * @return mixed
     *
     */
    public function delete($id)
    {

        if ($this->hasAccess())
        {
            $deleted = $this->productdetails
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
        $db = $this->productdetails->find($id);
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
    * Menampilkan Page Create data Productdetails
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
        $record = $this->productdetails->findOrFail($id);
        return ($record) ?
            Response::json(
                [ 'success' => true, 'error' => false,
                  'reason' => 'Cannot Find',
                    'results' => $record->toArray()
                    ]
            )
            : Response::json(
              [
                  'success' => true, 'error' => true,
                  'reason' => 'Cannot Find'
              ],404
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

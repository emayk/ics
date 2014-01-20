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
* Bussiness Logic Stockproducts
*
**/

namespace Emayk\Ics\Repo\Stockproducts;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class StockproductsEloquent implements StockproductsInterface{
    protected $stockproducts;
    function __construct(Stockproducts $stockproducts)
    {
        $this->stockproducts = $stockproducts;
    }

    /**
    *
    * Mendapatkan Record Stockproducts berdasarkan ID yang diberikan
    * @param  int $id ID Record
    * @return Model Record Stockproducts
    **/

    public function find($id){
        return $this->stockproducts->find($id);
    }

    /**
     * Mendapatkan Semua Stockproducts
     * @return mixed
     */
    public function all()
    {
        $page = \Input::get('page');
			 $limit = \Input::get('limit',1);
			 $start = \Input::get('start',1);

//
//        if (Input::has('filter')){
//          $filter = Input::get('filter');
//            $json = json_decode($filter);
//            $property =$json[0]->property;
//            $productId = ($property == 'app.model.product.product_id') ? $json[0]->value : 0 ;
//            $stockproducts = $this->stockproducts->whereProductId($productId);
//            $total = $stockproducts->count();
//            $stockproducts1 = $stockproducts->get()->toArray();
//            foreach ($stockproducts->get() as $stock) {
//                $stocks[] = array(
//                    'id' => $stock->id,
//                    'app.model.product.product_id' => $productId,
//                    "createby_id" => $stock->createby_id,
//                    "created_at" => $stock->created_at,
//                    "lastupdateby_id" => $stock->lastupdateby_id,
//                    "lengthfabric" => $stock->lengthfabric,
//                    "onday" => $stock->onday,
//                    "product_id" => $stock->product_id,
//                    "total" => $stock->total,
//                    "unit_id" => $stock->unit_id,
//                    "updated_at" => $stock->updated_at,
//                    "uuid" => $stock->uuid,
//                    "wh_id" => $stock->wh_id,
//                );
//            }
//
//            return Response::json(
//                [
//                    'success' => true,
//                    'results' => $stockproducts1,
//                    'total' => $total
//                ]
//            );
//        };

        $stockproducts = $this->stockproducts
        ->with(
            'product',
            'categorywarehouse',
            'warehouse',
            'createby',
            'updateby'
        )

        ->orderBy('id','DESC');
			 if (Input::has('product_id'))
			 {
					$pid = Input::get('product_id');
					$stockproducts = $stockproducts->where('product_id',$pid);
					$total = $stockproducts->count();
			 }else{
					$total = $this->stockproducts
						->all()->count();
			 }

			 $stockproducts = $stockproducts->skip($start)
            ->take($limit)

            ->get()->toArray();

        $stockproductss = array(
            'success' => true,
            'results' => $stockproducts,
            'total' => $total
        );

        return Response::json($stockproductss)
            ->setCallback(\Input::get('callback'));

    }

    /**
     *
     * Proses Simpan Stockproducts
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
        // $this->stockproducts->name = Input::get('name');
        // $this->stockproducts->info = Input::get('info');
        // $this->stockproducts->uuid = uniqid('New_');
        // $this->stockproducts->createby_id = \Auth::user()->id;
        // $this->stockproducts->lastupdateby_id = \Auth::user()->id;
        // $this->stockproducts->created_at = new Carbon();
        // $this->stockproducts->updated_at = new Carbon();
        $saved = $this->stockproducts->save() ? true : false ;
        return Response::json(array(
            'success' => $saved,
            'results' => $this->stockproducts->toArray()
        ))->setCallback();
    }

    /**
     * Menghapus Stockproducts
     *
     * @param $id
     * @return mixed
     *
     */
    public function delete($id)
    {

        if ($this->hasAccess())
        {
            $deleted = $this->stockproducts
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
        $db = $this->stockproducts->find($id);
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
    * Menampilkan Page Create data Stockproducts
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
			 $db = $this->stockproducts->where('id',$id);
			 if (!$db) return \Icsoutput::msgError(array('reason' => 'Cannot Found'));

			 $db = $db
				 ->with(
						'product',
						'categorywarehouse',
						'createby',
						'warehouse',
						'updateby'
				 )
				 ->get();

			 return \Icsoutput::msgSuccess( $db->toArray() );

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

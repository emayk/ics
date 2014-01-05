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
* Bussiness Logic Products
*
**/

namespace Emayk\Ics\Repo\Products;
use Aws\CloudFront\Exception\Exception;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;
use \DB;
use \Event;
use \Cache;

class ProductsEloquent implements ProductsInterface{
    protected $products;
    function __construct(Products $products)
    {
        $this->products = $products;
    }

    /**
    *
    * Mendapatkan Record Products berdasarkan ID yang diberikan
    * @param  int $id ID Record
    * @return Model Record Products
    **/

    public function find($id){
        return $this->products->find($id);
    }

    /**
     * Mendapatkan Semua Products
     * @return mixed
     */
    public function all()
    {
		 	$page = \Input::get('page');
			 $product = $this->products;
			 \Event::fire('product.refresh',array($product));
			 $products = \Cache::get('products'.$page);
			 $total = \Cache::get('count_products');
        $productss = array('success' => true, 'results' => $products->toArray(), 'total' => $total);

			 return Response::json($productss)->setCallback(\Input::get('callback'));

    }


	 /**
		* @throws \Exception
		*/
	 public function store_2(){
			 $product = $this->products;
			 $userId = \Auth::user()->id;
			 DB::beginTransaction();

			 try {
					$product = $product::create(
						 array(
								'name' => Input::get('name'),
								'cat_id' => Input::get('cat_id'),
								'contruction' => Input::get('contruction'),
								'nodesign' => Input::get('nodesign'),
								'type_id' => Input::get('type_id'),
								'weight' => Input::get('weight'),
								'unitweight_id' => Input::get('unitweight_id'),
								'width' => Input::get('width'),
								'unitwidth_id' => Input::get('unitwidth_id'),
								'codeinternal' => uniqid('Prd_'),
								'parent_id' => Input::get('parent_id'),
								'parent_type' => Input::get('parent_type'),
								'uuid' => uniqid('Prd_'),
								'createby_id' => $userId,
								'lastupdateby_id' => $userId,
								'created_at' => new \Datetime(),
								'updated_at' => new \Datetime()
						 )
					);

			 }catch (\Exception $e){
					DB::rollBack();
					throw $e;
			 }

//			 Proses Detail
			 try{
					// proses Product detail

			 }catch (\Exception $e){
					DB::rollBack();
					throw $e;
			 }

			 DB::commit();

			return Response::json(array(
				 'success' => true,
				 'results' => $product->toArray()
			))->setCallback();

		}
	 /**
		*
		* Proses Simpan Products
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
				 $userId = \Auth::user()->id;
				 $this->products->name = Input::get('name');
				 $this->products->cat_id = Input::get('cat_id');
				 $this->products->contruction = Input::get('contruction');
				 $this->products->nodesign = Input::get('nodesign');
				 $this->products->type_id = Input::get('type_id');
				 $this->products->weight = Input::get('weight');
				 $this->products->unitweight_id = Input::get('unitweight_id');
				 $this->products->width = Input::get('width');
				 $this->products->unitwidth_id = Input::get('unitwidth_id');
				 $this->products->codeinternal = uniqid('Prd_');
				 //			  $this->products->parent_id = Input::get('parent_id');
				 //			  $this->products->parent_type = Input::get('parent_type');
				 $this->products->uuid = uniqid('Prd_');
				 $this->products->createby_id = $userId;
				 $this->products->lastupdateby_id = $userId;
				 $this->products->created_at = new \Datetime();
				 $this->products->updated_at = new \Datetime();
			 	$saved = $this->products->save() ? true : false ;

        return Response::json(array(
            'success' => $saved,
            'results' => ($saved) ? $this->products->toArray() : null,
					 'reason' => ($saved) ? 'Created Successfully' : 'Fail Create',
        ))->setCallback();
    }

    /**
     * Menghapus Products
     *
     * @param $id
     * @return mixed
     *
     */
    public function delete($id)
    {

        if ($this->hasAccess())
        {
            $deleted = $this->products
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
        $db = $this->products->find($id);
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
    * Menampilkan Page Create data Products
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
        return $this->products->where('id',$id)->get()->toArray();
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

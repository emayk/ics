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
* Bussiness Logic Bankaccount
*
**/

namespace Emayk\Ics\Repo\Bankaccount;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;
use Emayk\Ics\Repo\Bank\Bank as bank;
class BankaccountEloquent implements BankaccountInterface{
   protected $bankaccount;
	 protected $bank;

    function __construct(Bankaccount $bankaccount)
    {
        $this->bankaccount = $bankaccount;
			 $this->bank = new bank();
    }

    /**
    *
    * Mendapatkan Record Bankaccount berdasarkan ID yang diberikan
    * @param  int $id ID Record
    * @return Model Record Bankaccount
    **/

    public function find($id){
        return $this->bankaccount->find($id);
    }

    /**
     * Mendapatkan Semua Bankaccount
     * @return mixed
     */
    public function all()
    {
        $page = \Input::get('page');
			 $limit = \Input::get('limit',1);
			 $start = \Input::get('start',1);
        $bankaccount = $this->bankaccount
            ->orderBy('id','DESC')
            ->skip($start)
            ->take($limit)
            ->get()->toArray();
        $total = $this->bankaccount
            ->all()->count();

        $bankaccounts = array(
            'success' => true,
            'results' => $bankaccount,
            'total' => $total
        );

        return Response::json($bankaccounts)
            ->setCallback(\Input::get('callback'));

    }

    /**
     *
     * Proses Simpan Bankaccount
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
        // $this->bankaccount->name = Input::get('name');
        // $this->bankaccount->info = Input::get('info');
        // $this->bankaccount->uuid = uniqid('New_');
        // $this->bankaccount->createby_id = \Auth::user()->id;
        // $this->bankaccount->lastupdateby_id = \Auth::user()->id;
        // $this->bankaccount->created_at = new Carbon();
        // $this->bankaccount->updated_at = new Carbon();
        $saved = $this->bankaccount->save() ? true : false ;
        return Response::json(array(
            'success' => $saved,
            'results' => $this->bankaccount->toArray()
        ))->setCallback();
    }

    /**
     * Menghapus Bankaccount
     *
     * @param $id
     * @return mixed
     *
     */
    public function delete($id)
    {

        if ($this->hasAccess())
        {
            $deleted = $this->bankaccount
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
        $db = $this->bankaccount->find($id);
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
    * Menampilkan Page Create data Bankaccount
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

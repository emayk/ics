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
use Emayk\Ics\Repo\Bankaccounttype\Bankaccounttype;
use Emayk\Ics\Repo\Suppliers\Suppliers;
use Faker\Factory;
use Icsoutput;
use Illuminate\Support\Facades\Auth;
use Response;
use Input;
use Emayk\Ics\Repo\Bank\Bank as bank;

/**
 * Class BankaccountEloquent
 * @package Emayk\Ics\Repo\Bankaccount
 */
class BankaccountEloquent implements BankaccountInterface
{
    /**
     * @var Bankaccount
     */
    protected $bankaccount;
    /**
     * @var \Emayk\Ics\Repo\Bank\Bank
     */
    protected $bank;

    /**
     * @param Bankaccount $bankaccount
     */
    function __construct(Bankaccount $bankaccount)
    {
        $this->bankaccount = $bankaccount;
        $this->bank = new bank();
    }

    /**
     *
     * Mendapatkan Record Bankaccount berdasarkan ID yang diberikan
     *
     * @param  int $id ID Record
     *
     * @return Model Record Bankaccount
     **/

    public function find($id)
    {
        return $this->bankaccount->find($id);
    }

    /**
     * Mendapatkan Semua Bankaccount
     *
     * @return mixed
     */
    public function all()
    {
        $page = Input::get('page');
        $limit = Input::get('limit', 1);
        $start = Input::get('start', 1);

        $bankaccount = $this->bankaccount
            ->orderBy('id', 'DESC')
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
//				 if (! $this->hasAccess ()) {
//						return Response::json (
//							 array (
//									'success' => false,
//									'reason'  => 'Action Need Login First',
//									'results' => null
//							 ))->setCallback ();
//				 }
//

        /**
         * Debug Input
         */
        $fake = Factory::create();
        $bankid = bank::lists('id');
        //account milik ?
        $owner = Suppliers::first(array('id'));
        $lists_type = Bankaccounttype::lists('id');
        $random_number_account = rand(100, 900) . '-' . rand(900, 950) . '-' . rand(700, 800);
        Input::replace(
            array(
                'bank_id' => $bankid[rand(0, count($bankid) - 1)],
                'number' => $random_number_account,
                'name' => $fake->name,
                'owner_id' => $owner->id,
                'owner_type' => get_class($owner),
                'type_id' => $lists_type[rand(0, count($lists_type) - 1)],
                'uuid' => $fake->uuid,
                'uid' => 1,
                'updated_at' => Carbon::create()
            )
        );


        $this->bankaccount->owner_id = Input::get('owner_id');
        $this->bankaccount->owner_type = Input::get('owner_type');
        $this->bankaccount->createby_id = Input::get('uid');
        $this->bankaccount->created_at = Carbon::create();
        /*Field yang bisa diupdate */
        $this->bankaccount->type_id = Input::get('type_id');
        $this->bankaccount->name = Input::get('name');
        $this->bankaccount->number = Input::get('number');
        $this->bankaccount->bank_id = Input::get('bank_id');
        $this->bankaccount->uuid = uniqid('New_');
        $this->bankaccount->lastupdateby_id = Input::get('uid');
        $this->bankaccount->updated_at = Carbon::create();
        $saved = $this->bankaccount->save() ? true : false;

        return Response::json(array(
            'success' => $saved,
            'results' => $this->bankaccount->toArray()
        ))->setCallback();
    }

    /**
     * Menghapus Bankaccount
     *
     * @param $id
     *
     * @return mixed
     *
     */
    public function delete($id)
    {

        if ($this->hasAccess()) {
            $deleted = $this->bankaccount
                ->find($id)
                ->delete();
            Log::info('bank.delete', array('action $id'));

            return Response::json(array(
                'results' => $deleted,
                'success' => true
            ));

        } else {
            return Icsoutput::toJson(array(
                'results' => false,
                'reason' => 'Dont Have Access to Delete '
            ), false);
        }
    }

    /**
     * Update Informasi [[cName]]
     *
     * @param $id
     *
     * @return mixed
     */
    public function update($id)
    {
        $fake = Factory::create();
        $bankid = bank::lists('id');
        $lists_type = Bankaccounttype::lists('id');
        $random_number_account = rand(100, 900) . '-' . rand(900, 950) . '-' . rand(700, 800);

        Input::replace(
            array(
                'bank_id' => $bankid[rand(0, count($bankid) - 1)],
                'number' => $random_number_account,
                'name' => $fake->name,
                'type_id' => $lists_type[rand(0, count($lists_type) - 1)],
                'uid' => 1
            )
        );

        $db = $this->bankaccount->find($id);
        /*Field yang bisa diupdate */
        $db->type_id = Input::get('type_id');
        $db->name = Input::get('name');
        $db->number = Input::get('number');
        $db->bank_id = Input::get('bank_id');
        $db->lastupdateby_id = Input::get('uid');
        $db->updated_at = Carbon::create();
        $db->uuid = uniqid('Update_');
        $db->save();
        Log::info('bankaccount.update', array('data' => Input::all()));
        return Icsoutput::msgSuccess($db->toArray());
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
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        return $this->bankaccount->findOrFail($id);
    }

    /**
     * Menampilkan Data Untuk di edit
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        // TODO: Implement edit() method.
    }

    /**
     * Remove Storage
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        return $this->delete($id);
    }


}

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
 * Bussiness Logic Bankaccounttype
 *
 **/

namespace Emayk\Ics\Repo\Bankaccounttype;

use Carbon\Carbon;
use \Auth;
use \Response;
use \Input;
use \Log;

/**
 * Class BankaccounttypeEloquent
 * @package Emayk\Ics\Repo\Bankaccounttype
 */
class BankaccounttypeEloquent implements BankaccounttypeInterface
{
    /**
     * @var Bankaccounttype
     */
    protected $bankaccounttype;
    /**
     * @var bool
     */
    protected $debug = true;

    /**
     * @param Bankaccounttype $bankaccounttype
     */
    function __construct(Bankaccounttype $bankaccounttype)
    {
        $this->bankaccounttype = $bankaccounttype;
    }

    /**
     *
     * Mendapatkan Record Bankaccounttype berdasarkan ID yang diberikan
     *
     * @param  int $id ID Record
     *
     * @return Model Record Bankaccounttype
     **/

    public function find($id)
    {
        return $this->bankaccounttype->find($id);
    }

    /**
     * Mendapatkan Semua Bankaccounttype
     *
     * @return mixed
     */
    public function all()
    {
        $page = \Input::get('page');
        $limit = \Input::get('limit', 1);
        $start = \Input::get('start', 1);
        $bankaccounttype = $this->bankaccounttype
            ->orderBy('id', 'DESC')
            ->skip($start)
            ->take($limit)
            ->get()->toArray();
        $total = $this->bankaccounttype
            ->all()->count();

        $bankaccounttypes = array(
            'success' => true,
            'results' => $bankaccounttype,
            'total' => $total
        );
        Log::info('bankaccounttype.index', array('data' => Input::all()));
        return Response::json($bankaccounttypes)
            ->setCallback(\Input::get('callback'));

    }

    /**
     *
     * Proses Simpan Bankaccounttype
     *
     * @return mixed
     */
    public function store()
    {
        if (!$this->hasAccess()) {
            return Response::json(
                array(
                    'success' => false,
                    'reason' => 'Action Need Login First',
                    'results' => null
                ))->setCallback();
        }


//	      Input::replace(
//		      array(
//			      'name'=> 'Type Bank Account '. time(),
//			      'uid' => '1'
//
//	      ));

        /*==========  Sesuaikan dengan Field di table  ==========*/
        $uid = (\Auth::getUser() == null) ? 1 : \Auth::getUser()->id;
        $this->bankaccounttype->name = Input::get('name');
        $this->bankaccounttype->info = "Info " . Input::get('info');
        $this->bankaccounttype->uuid = uniqid('New_');
        $this->bankaccounttype->createby_id = $uid;
        $this->bankaccounttype->lastupdateby_id = $uid;
        $this->bankaccounttype->created_at = new Carbon();
        $this->bankaccounttype->updated_at = new Carbon();
        $saved = $this->bankaccounttype->save() ? true : false;

        \Log::info('bankaccounttype.store', array('data' => Input::all()));
        return Response::json(array(
            'success' => $saved,
            'results' => $this->bankaccounttype->toArray()
        ))->setCallback();
    }

    /**
     * Menghapus Bankaccounttype
     *
     * @param $id
     *
     * @return mixed
     *
     */
    public function delete($id)
    {

        if ($this->hasAccess()) {
            $uid = (\Auth::getUser() == null) ? 1 : \Auth::getUser()->id;
            $deleted = $this->bankaccounttype->findOrFail($id);
            $datadeleted = $deleted;
            $deleted = $deleted->delete();
            Log::info('bankaccounttype.delete dihapus oleh ' . $uid, array($datadeleted));

            return \Icsoutput::toJson(array(
                'results' => $deleted
            ), $deleted);

        } else {
            return \Icsoutput::toJson(array(
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
        $db = $this->bankaccounttype->findOrFail($id);
        $uid = (null === \Auth::getUser()) ? 1 : \Auth::getUser()->id;
        $db->name = Input::get('name');
        $db->info = Input::get('info');
        $db->lastupdateby_id = $uid;
        $db->updated_at = Carbon::create();
        $db->uuid = uniqid('Update_');

        return ($db->save())
            ? \Icsoutput::msgSuccess($db->toArray())
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
        return (!\Auth::guest());
    }

    /**
     *
     * Menampilkan Page Create data Bankaccounttype
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
        return $this->bankaccounttype->findOrFail($id);
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
        return $this->bankaccounttype->findOrFail($id);
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

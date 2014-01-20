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
 * Bussiness Logic Stockproducthistory
 *
 **/

namespace Emayk\Ics\Repo\Stockproducthistory;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class StockproducthistoryEloquent implements StockproducthistoryInterface
{
    protected $stockproducthistory;

    function __construct(Stockproducthistory $stockproducthistory)
    {
        $this->stockproducthistory = $stockproducthistory;
    }

    /**
     *
     * Mendapatkan Record Stockproducthistory berdasarkan ID yang diberikan
     * @param  int $id ID Record
     * @return Model Record Stockproducthistory
     **/

    public function find($id)
    {
        return $this->stockproducthistory->find($id);
    }

    /**
     * Mendapatkan Semua Stockproducthistory
     * @return mixed
     */
    public function all()
    {
        $page = \Input::get('page');
        $limit = \Input::get('limit', 1);
        $start = \Input::get('start', 1);

        if (Input::has('stock_id')) {
            $stockId = Input::get('stock_id');
            return $this->getHistoryStockById($stockId, $limit, $start, $page);
        };


        /*Mesti ada Stock Id*/
                return Response::json(
                    ['success' => true, 'error' => true,
                    'reason' => 'No Parameter Stock Id'],200
                );
//            ->setCallback(\Input::get('callback'));

//        $stockproducthistory = $this->stockproducthistory
//            ->orderBy('id', 'DESC')
//            ->skip($start)
//            ->take($limit)
//            ->get()->toArray();
//        $total = $this->stockproducthistory
//            ->all()->count();
//
//        $stockproducthistorys = array(
//            'success' => true,
//            'results' => $stockproducthistory,
//            'total' => $total
//        );
//
//        return Response::json($stockproducthistorys)
//            ->setCallback(\Input::get('callback'));

    }

    /**
     *
     * Proses Simpan Stockproducthistory
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
        /*==========  Sesuaikan dengan Field di table  ==========*/
        // $this->stockproducthistory->name = Input::get('name');
        // $this->stockproducthistory->info = Input::get('info');
        // $this->stockproducthistory->uuid = uniqid('New_');
        // $this->stockproducthistory->createby_id = \Auth::user()->id;
        // $this->stockproducthistory->lastupdateby_id = \Auth::user()->id;
        // $this->stockproducthistory->created_at = new Carbon();
        // $this->stockproducthistory->updated_at = new Carbon();
        $saved = $this->stockproducthistory->save() ? true : false;
        return Response::json(array(
            'success' => $saved,
            'results' => $this->stockproducthistory->toArray()
        ))->setCallback();
    }

    /**
     * Menghapus Stockproducthistory
     *
     * @param $id
     * @return mixed
     *
     */
    public function delete($id)
    {

        if ($this->hasAccess()) {
            $deleted = $this->stockproducthistory
                ->find($id)
                ->delete();

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
     * @return mixed
     */
    public function update($id)
    {
        $db = $this->stockproducthistory->find($id);
        /*==========  Sesuaikan  ==========*/
        // $db->name = Input::get('name');
        // $db->info = Input::get('info');
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
        return (!Auth::guest());
    }

    /**
     *
     * Menampilkan Page Create data Stockproducthistory
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
     * @return Response
     */
    public function show($id)
    {
        // TODO: Implement show() method.
    }

    /**
     * Menampilkan Data Untuk di edit
     *
     * @param  int $id
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
     * @return Response
     */
    public function destroy($id)
    {
        return $this->delete($id);
    }

    protected function getHistoryStockById($stockId, $limit, $start, $page)
    {
          $record = $this->stockproducthistory->OfStocks($stockId)
              ->skip($start)
              ->take($limit)
              ->get()->toArray();

        return $record;

    }

}

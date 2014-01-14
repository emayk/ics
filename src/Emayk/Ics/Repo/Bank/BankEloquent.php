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
 **/

namespace Emayk\Ics\Repo\Bank;

use \Cache;
use Carbon\Carbon;
use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;
use Input;
use Response;

/**
 * Bank Eloquent
 */
class BankEloquent implements BankInterface
{
    /**
     * @var Bank
     */
    protected $bank;

    /**
     * @param Bank $bank
     */
    function __construct(Bank $bank)
    {
        $this->bank = $bank;
    }

    /**
     * @return array|\Illuminate\Database\Eloquent\Collection|static[]
     */
    public function all()
    {

        $page = Input::get('page', 1);
        $banks = $this->bank;

//        $bank = Cache::remember('bank' . $page, 10, function () use ($banks) {
//                $limit = \Input::get('limit', 1);
//                $start = \Input::get('start', 0);
//
//                return $banks->skip($start)->take($limit)->get();
//            });


        $limit = Input::get('limit', 1);
        $start = Input::get('start', 0);

        $bank = $banks->skip($start)->take($limit)->get();


        $total = $this->bank->count();

        $data = array('success' => true,
            'results' => $bank->toArray(),
            'total' => $total
        );

        return \Response::json($data)
            ->setCallback(Input::get('callback'));

    }

    /**
     * Menyimpan Resource Baru
     *
     * @return Response
     */
    public function store()
    {
        $fake = new AbstractGenerate();
        $saved = $this->bank->create(
            array_merge(Input::except('uuid'),array(
                'info' => 'Info Bank '.Input::get('name'),
                'uuid' => $fake->getFake()->uuid,
                'createby_id' => 1,
                'lastupdateby_id' => 1,
                'created_at' => Carbon::create(),
                'updated_at' => Carbon::create(),
            ))
        );

        return Response::json(array(
            'success' => $saved->exists,
            'results' => $saved->toArray()
        ))->setCallback();
    }

    /**
     * Menampilkan Form New
     *
     * @return Response
     */
    public function create()
    {
//
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
        return $this->bank->find($id);
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
        return $this->bank->find($id);
    }

    /**
     * Update Resource Tertentu dari Storage
     *
     * @param  int $id
     *
     * @return Response
     */
    public function update($id)
    {
        $db = $this->bank->findOrFail($id);
        $db->name = trim(Input::get('name'));
        $db->notelp = trim(Input::get('notelp'));
        $db->address = trim(Input::get('address'));

        $saved = $db->save();
        return ($saved)
            ? \Icsoutput::msgSuccess($db->toArray())
            : \Icsoutput::msgError(array('reason' => 'Cannot Update'));
    }

    /**
     * Menghapus Spesifikasi Resource dari Storage
     *
     * @param  int $id
     *
     * @return Response
     */
    public function delete($id)
    {
        $deleted = $this->bank->find($id)->delete();

        return Response::json(array('success' => $deleted));

    }

    /**
     * Mencari Record berdasarkan Primary key
     *
     * @param  int $id
     *
     * @return Response
     */
    public function find($id)
    {
        return $this->bank->find($id);
    }

    /**
     * Remove from Storage
     *
     */
    public function destroy($id)
    {
        return $this->delete($id);
    }


}
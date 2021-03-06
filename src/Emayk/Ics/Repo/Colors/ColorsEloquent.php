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
 * Bussiness Logic Colors
 *
 **/

namespace Emayk\Ics\Repo\Colors;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

/**
 * Class ColorsEloquent
 * @package Emayk\Ics\Repo\Colors
 */
class ColorsEloquent implements ColorsInterface
{
    /**
     * @var Colors
     */
    protected $colors;

    /**
     * @param Colors $colors
     */
    function __construct(Colors $colors)
    {
        $this->colors = $colors;
    }

    /**
     *
     * Mendapatkan Record Colors berdasarkan ID yang diberikan
     * @param  int $id ID Record
     * @return Model Record Colors
     **/

    public function find($id)
    {
        return $this->colors->find($id);
    }

    /**
     * Mendapatkan Semua Colors
     * @return mixed
     */
    public function all()
    {
        $page = \Input::get('page');
        $limit = \Input::get('limit', 1);
        $start = \Input::get('start', 1);


        if (Input::has('selected'))
        {
            $id = Input::get('selected');
            $record = $this->colors->findOrFail($id);
            return Response::json([
                'success' => true, 'error' => false,
                'results' => $record->toArray()
            ]);
        }

        $colors = $this->colors;
        $total = $colors->count();

        $colors = $colors->skip($start)
            ->take($limit)
            ->get()->toArray();

        $colorss = array(
            'success' => true,
            'results' => $colors,
            'total' => $total
        );

        return Response::json($colorss)
            ->setCallback(\Input::get('callback'));

    }

    /**
     *
     * Proses Simpan Colors
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
        $this->colors->name = Input::get('name');
        $this->colors->info = Input::get('info');
        $this->colors->uuid = uniqid('New_');
        $this->colors->createby_id = \Auth::user()->id;
        $this->colors->lastupdateby_id = \Auth::user()->id;
        $this->colors->created_at = new Carbon();
        $this->colors->updated_at = new Carbon();
        $saved = $this->colors->save() ? true : false;
        return Response::json(array(
            'success' => $saved,
            'results' => $this->colors->toArray()
        ))->setCallback();
    }

    /**
     * Menghapus Colors
     *
     * @param $id
     * @return mixed
     *
     */
    public function delete($id)
    {

        if ($this->hasAccess()) {
            $deleted = $this->colors
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
     * Update Informasi
     *
     * @param $id
     * @return mixed
     */
    public function update($id)
    {
        $db = $this->colors->find($id);
        /*==========  Sesuaikan  ==========*/
        $db->name = Input::get('name');
        $db->info = Input::get('info');
        $db->uuid = uniqid('Update_');
        $updated = $db->save();
        return Response::json(array(
            'success' => $updated,
            'results' => $db->toArray()
        ));
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
     * Menampilkan Page Create data Colors
     *
     **/

    public function create()
    {
//
    }

    /**
     * Menampilkan Resource
     *
     * @param  int $id
     * @return Response
     */
    public function show($id)
    {
        $record = $this->colors->whereId($id);
        if ($record)
        {
            $total = 1;
            $record = $record->get()->toArray();
            return Response::json([
               'success' => true,
                'error' => false,
                'total' => $total,
                'results' => $record
            ]);
        }else{
            return Response::json([
                'success' => true,
                'error' => true,
                'reason' => 'Cannot Find Record',
                'total' => 0,
                'results' => array()
            ],404);
        }
    }

    /**
     * Menampilkan Data Untuk di edit
     *
     * @param  int $id
     * @return Response
     */
    public function edit($id)
    {
//
    }


}

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
 * Bussiness Logic Currencies
 *
 **/

namespace Emayk\Ics\Repo\Currencies;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use \Response;
use \Input;

class CurrenciesEloquent implements CurrenciesInterface
{
    protected $currencies;

    function __construct(Currencies $currencies)
    {
        $this->currencies = $currencies;
    }

    /**
     *
     * Mendapatkan Record Currencies berdasarkan ID yang diberikan
     * @param  int $id ID Record
     * @return Model Record Currencies
     **/

    public function find($id)
    {
        return $this->currencies->find($id);
    }

    /**
     * Mendapatkan Semua Currencies
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
            $record = $this->currencies->findOrFail($id);
            return Response::json([
                'success' => true, 'error' => false,
                'results' => $record->toArray()
            ]);
        }


        $currencies = $this->currencies
            ->with('country')
            ->orderBy('updated_at', 'DESC')
            ->skip($start)
            ->take($limit)
            ->get()->toArray();
        $total = $this->currencies
            ->all()->count();

        $currenciess = array(
            'success' => true,
            'results' => $currencies,
            'total' => $total
        );

        return Response::json($currenciess)
            ->setCallback(\Input::get('callback'));

    }

    /**
     *
     * Proses Simpan Currencies
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
        $this->currencies->name = Input::get('name');
        $this->currencies->shortname = Input::get('shortname');
        $this->currencies->country_id = Input::get('country_id');
        $this->currencies->uuid = uniqid('New_');
        $this->currencies->createby_id = \Auth::user()->id;
        $this->currencies->lastupdateby_id = \Auth::user()->id;
        $this->currencies->created_at = new Carbon();
        $this->currencies->updated_at = new Carbon();
        $saved = $this->currencies->save() ? true : false;
        return Response::json(array(
            'success' => $saved,
            'results' => $this->currencies->toArray()
        ))->setCallback();
    }

    /**
     * Menghapus Currencies
     *
     * @param $id
     * @return mixed
     *
     */
    public function delete($id)
    {

        if ($this->hasAccess()) {
            $currency = $this->currencies
                ->find($id);

	        return ($currency->delete())
		        ?  Response::json(['success' => false, 'error' => false])
		        :   Response::json(['success' => false, 'error' => true]);

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
        $db = $this->currencies->find($id);
        /*==========  Sesuaikan  ==========*/
        $db->name = Input::get('name');
//        $country_id = (Input::get('negara_id') == 0) ? 1 : Input::get('negara_id');
//         $db->country_id = $country_id;
        $db->country_id = Input::get('country_id');
        $db->shortname = Input::get('shortname');
        $db->uuid = uniqid('Update_');
        return ($db->save()) ?
            \Icsoutput::msgSuccess($db->toArray())
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
     * Menampilkan Page Create data Currencies
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
     * Remove Resource
     * @param $id
     * @return mixed
     */
    public function destroy($id)
    {
        return $this->delete($id);
    }


}

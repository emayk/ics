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

use \Eloquent;
use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;


/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Bank\Bank'
 *
 * @property integer $id
 * @property string $name
 * @property string $info
 * @property string $address
 * @property string $notelp
 * @property string $uuid
 * @property integer $createby_id
 * @property integer $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\Emayk\Ics\Repo\Bankaccount\Bankaccount[] $accounts
 */
class Bank extends Eloquent
{
    /**
     * @var array
     */
    protected $guarded = array();

    /**
     * @var array
     */
    public static $rules = array();
    /**
     * @var string
     */
    public $table = 'master_banks';

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function accounts()
    {
        return $this->hasMany('Emayk\Ics\Repo\Bankaccount\Bankaccount', 'bank_id');
    }


    /**
     * @param bool $resultIds
     *
     * @return array
     */
    public static function getIdsOrCreateBanks($resultIds = false)
    {
        $ids = static::lists('id');
        $created = false;
        if (!count($ids)) {
            /*Jika Kosong*/
            $ids = array();
            $banks = static::getFake()->getBank()->createBanks();
            foreach ($banks as $record) {
                $newrecord = static::createRecord($record);
                $ids [] = $newrecord->id;
            }
            $created = true;
        };
        $total = count($ids);
        $msg = ($created)
            ? "Generate Record with {$total} records"
            : "found record {$total} records";

        return ($resultIds) ? $ids : $msg;
    }

    /**
     * @param array $record
     *
     * @return \Illuminate\Database\Eloquent\Model|static
     */
    protected static function  createRecord(array $record)
    {
        return static::create($record);
    }

    /**
     * @return AbstractGenerate
     */
    protected static function getFake()
    {
        return new AbstractGenerate();
    }
}
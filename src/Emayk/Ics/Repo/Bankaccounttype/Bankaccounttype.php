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
 * Model Structure Eloquent
 *
 **/
namespace Emayk\Ics\Repo\Bankaccounttype;

use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;
use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Bankaccounttype\Bankaccounttype'
 *
 * @property integer $id
 * @property string $name
 * @property string $info
 * @property string $uuid
 * @property integer $createby_id
 * @property integer $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Emayk\Ics\Repo\Users\Users $creator
 * @property-read \Emayk\Ics\Repo\Users\Users $updater
 * @property-read mixed $createby
 * @property-read \Illuminate\Database\Eloquent\Collection|\Emayk\Ics\Repo\Bankaccount\Bankaccount[] $accounts
 * @method static Emayk\Ics\Repo\Bankaccounttype\Bankaccounttype name($name) 
 */
class Bankaccounttype extends Model
{
    /**
     * @var array
     */
    protected $guarded = array();
    /**
     * @var string
     */
    protected $table = 'master_bank_account_type';
    /**
     * @var array
     */
    public static $rules = array();
    /**
     * @var array
     */
    protected static $defaultType = array(
        'Deposit', 'Saving'
    );

    /**
     * @var array
     */
    public $appends = ['createby','updater'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function creator()
    {
        return $this->belongsTo('\Emayk\Ics\Repo\Users\Users','createby_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function updater()
    {
        return $this->belongsTo('\Emayk\Ics\Repo\Users\Users','lastupdateby_id');
    }

    /**
     * @return mixed
     */
    public function getCreatebyAttribute()
    {
        return $this->attributes['createby'] = $this->creator()->pluck('username');
    }

    /**
     * @return mixed
     */
    public function getUpdaterAttribute()
    {
        return $this->attributes['updater'] = $this->updater()->pluck('username');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function accounts()
    {
        return $this->hasMany('Emayk\Ics\Repo\Bankaccount\Bankaccount', 'type_id');
    }

    /**
     * @param array $record
     *
     * @return Model|static
     */
    protected static function createRecord(array $record)
    {
        return self::create($record);
    }

    /**
     * @return AbstractGenerate
     */
    protected static function getFake()
    {
        return new AbstractGenerate();
    }

    /**
     * @param $query
     * @param $name
     *
     * @return mixed
     */
    public function scopeName($query, $name)
    {
        return $query->whereName($name);
    }

    /**
     *
     * Apakah Default Type Sudah ada
     *
     * @return bool
     */
    protected static function hasDefault()
    {
        return (static::getDefaultIds() > 0);
    }

    /**
     * Mendapatkan ID default Bank Type
     *
     * @param bool $resultIds
     *
     * @return array
     */
    public static function getDefaultBankTypeIdsOrCreate($resultIds = false)
    {
        $ids = array();
        $created = false;
        foreach (static::$defaultType as $name) {
            $record = static::whereName($name);
            if (!$record->count() > 0) {
                /*create*/
                $newrecord = static::createRecord(
                    static::getFake()->getBank()->createBankType($name)
                );
                $ids [] = $newrecord->id;
                $created = true;
            } else {
                $ids [] = $record->pluck('id');
            }
        }
        $msg = ($created)
            ? "Generate Data with " . count($ids) . " records"
            : "Found Data " . count($ids) . " records ";
        return ($resultIds) ? $ids : $msg;
    }
}

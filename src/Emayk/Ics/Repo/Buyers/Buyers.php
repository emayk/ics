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
namespace Emayk\Ics\Repo\Buyers;

use Emayk\Ics\Repo\Locations\Locations;
use Emayk\Ics\Repo\Producttype\Producttype;
use Emayk\Ics\Repo\Typesuppliersbuyers\Typesuppliersbuyers;
use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;
use Emayk\Ics\Repo\Legality\Legality;
use Emayk\Ics\Repo\Status\Status;
use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Buyers\Buyers'
 *
 * @property integer $id
 * @property string $name
 * @property string $codepos
 * @property string $npwp
 * @property string $fax
 * @property string $email
 * @property float $plafon
 * @property integer $kredit
 * @property \Carbon\Carbon $deleted_at
 * @property string $address
 * @property string $rt
 * @property string $rw
 * @property string $phone
 * @property integer $status_id
 * @property integer $tipe_id
 * @property integer $legality_id
 * @property integer $typeprod_id
 * @property integer $country_id
 * @property integer $province_id
 * @property integer $city_id
 * @property string $uuid
 * @property integer $createby_id
 * @property integer $lastupdateby_id
 * @property string $codeinternal
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Emayk\Ics\Repo\Status\Status $status
 * @property-read \Emayk\Ics\Repo\Legality\Legality $legality
 * @property-read \Emayk\Ics\Repo\Typesuppliersbuyers\Typesuppliersbuyers $type
 * @property-read \Emayk\Ics\Repo\Producttype\Producttype $product_type
 * @property-read \Emayk\Ics\Repo\Locations\Locations $country
 * @property-read \Emayk\Ics\Repo\Locations\Locations $province
 * @property-read \Emayk\Ics\Repo\Locations\Locations $city
 * @property-read \Emayk\Ics\Repo\Users\Users $creator
 * @property-read \Emayk\Ics\Repo\Users\Users $updater
 */
class Buyers extends Model
{
    /**
     * @var array
     */
    protected $guarded = array();
    /**
     * @var string
     */
    protected $table = 'master_buyers';
    /**
     * @var array
     */
    public static $rules = array();

    /**
     *
     * Mendapatkan Alamat Lengkap
     *
     * @return string
     */
    public function fullAddress()
    {
        return $this->address . ' ' . $this->rt . '/' . $this->rw . ' ' .
        $this->province->name . ' ' .
        $this->city->name . ' ' .
        $this->country->name .
        $this->codepos;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function status()
    {
        return $this->belongsTo('Emayk\Ics\Repo\Status\Status', 'status_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function legality()
    {
        return $this->belongsTo('Emayk\Ics\Repo\Legality\Legality', 'legality_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function type()
    {
        return $this->belongsTo('Emayk\Ics\Repo\Typesuppliersbuyers\Typesuppliersbuyers', 'tipe_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function product_type()
    {
        return $this->belongsTo('Emayk\Ics\Repo\Producttype\Producttype', 'typeprod_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function country()
    {
        return $this->belongsTo('Emayk\Ics\Repo\Locations\Locations', 'country_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function province()
    {
        return $this->belongsTo('Emayk\Ics\Repo\Locations\Locations', 'province_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function city()
    {
        return $this->belongsTo('Emayk\Ics\Repo\Locations\Locations', 'city_id');
    }

    /**
     * Create By
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function creator()
    {
        return $this->belongsTo('Emayk\Ics\Repo\Users\Users', 'createby_id');
    }


    /**
     * Last Update By
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function updater()
    {
        return $this->belongsTo('Emayk\Ics\Repo\Users\Users', 'lastupdateby_id');
    }


    /**
     * @param bool $resultsIds
     * @param int $count
     *
     * @return array|string
     */
    public static function  generateDummyData($resultsIds = false, $count = 10)
    {
        /** Legalitas */
        $listLegalitiesId = Legality::getIdsOrGenerateDummyData(100);
        /** Status */
        $listStatusId = Status::getIdsOrCreate();
        /*Product Type*/
        $typeProductIds = Producttype::getIdsOrCreateDummy(100);
        /*Type Supplier*/
        $typeIdsSupBuy = Typesuppliersbuyers::generateDummyData(true);
        /** Locations */
        $countryId = Locations::getIdsDefaultCountryOrCreate();

        $provinceId = Locations::getIdsDefaultProvinceOrCreate($countryId);
        $cityId = Locations::getIdsDefaultCityOrCreate($provinceId);


        $records = static::getFake()
            ->getBuyers()
            ->createBuyers(10, $typeIdsSupBuy, $typeProductIds, $listLegalitiesId, $countryId, $provinceId, $cityId, $listStatusId);


        foreach ($records as $record) {
            $newrecord = static::createRecord($record);
            $recordIds [] = $newrecord->id;
        }

        \Log::debug('Supplier Masih Kosong , Sudah diisi ' . count($recordIds));
        return ($resultsIds) ? $recordIds : "Generate " . count($recordIds) . " records";
    }

    /**
     * @param int $count
     *
     * @return array
     */
    public static function  getRecordIdsOrCreate($count = 10)
    {
        $recordIds = static::getListId();
        if (!count($recordIds)) {
            /*Create*/
            $recordIds = static::generateDummyData(true, $count);
        };
        return $recordIds;
    }

    /**
     * @return mixed
     */
    protected static function getListId()
    {
        return static::lists('id');
    }

    /**
     * @param array $record
     *
     * @return Model|static
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

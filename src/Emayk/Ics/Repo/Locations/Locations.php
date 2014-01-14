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
namespace Emayk\Ics\Repo\Locations;


use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;
use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Locations\Locations'
 *
 * @property integer $id
 * @property string $name
 * @property string $info
 * @property integer $level
 * @property integer $parent_id
 * @property string $parent_type
 * @property string $uuid
 * @property integer $createby_id
 * @property integer $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static Emayk\Ics\Repo\Locations\Locations name($name) 
 * @method static Emayk\Ics\Repo\Locations\Locations provinces($countryId) 
 * @method static Emayk\Ics\Repo\Locations\Locations cities($provinceId) 
 * @method static Emayk\Ics\Repo\Locations\Locations ofLevel($level) 
 * @method static Emayk\Ics\Repo\Locations\Locations ofParentId($parentId) 
 * @method static Emayk\Ics\Repo\Locations\Locations country() 
 * @method static Emayk\Ics\Repo\Locations\Locations province() 
 * @method static Emayk\Ics\Repo\Locations\Locations city() 
 * @method static Emayk\Ics\Repo\Locations\Locations defaultCountry() 
 * @method static Emayk\Ics\Repo\Locations\Locations defaultProvince() 
 * @method static Emayk\Ics\Repo\Locations\Locations defaultCity() 
 * @method static Emayk\Ics\Repo\Locations\Locations parentId($parenId) 
 */
class Locations extends Model
{
    /**
     * @var array
     */
    protected $guarded = array();
    /**
     * @var string
     */
    protected $table = 'master_locations';
    /**
     * @var array
     */
    public static $rules = array();


    /**
     * List Countries
     *
     * @var array
     */
    protected static $countriesName = array("Albania", "Afghanistan", "Argentina", "Aruba", "Australia", "Azerbaijan New", "Bahamas", "Barbados", "Belarus", "Belize", "Bermuda", "Bolivia", "Bosnia and Herzegovina Convertible", "Botswana", "Bulgaria", "Brazil", "Brunei Darussalam", "Cambodia", "Canada", "Cayman Islands", "Chile", "China Yuan", "Colombia", "Costa Rica", "Croatia", "Cuba", "Czech Republic", "Denmark", "Dominican Republic", "East Caribbean", "Egypt", "El Salvador", "Estonia", "Euro Member", "Falkland Islands (Malvinas)", "Fiji", "Ghana", "Gibraltar", "Guatemala", "Guernsey", "Guyana", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Iran", "Isle of Man", "Israel", "Jamaica", "Japan", "Jersey", "Kazakhstan", "Korea (North)", "Korea (South)", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Liberia", "Lithuania", "Macedonia", "Malaysia", "Mauritius", "Mexico", "Mongolia", "Mozambique", "Namibia", "Nepal", "Netherlands Antilles", "New Zealand", "Nicaragua", "Nigeria", "Korea (North)", "Norway", "Oman", "Pakistan", "Panama", "Paraguay", "Peru Nuevo", "Philippines", "Poland", "Qatar", "Romania New", "Russia", "Saint Helena", "Saudi Arabia", "Serbia", "Seychelles", "Singapore", "Solomon Islands", "Somalia", "South Africa", "Korea (South)", "Sri Lanka", "Sweden", "Switzerland", "Suriname", "Syria", "Taiwan New", "Thailand", "Trinidad and Tobago", "Turkey", "Turkey", "Tuvalu", "Ukraine", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Venezuela", "Viet Nam", "Yemen", "Zimbabwe");

    /**
     * @var array
     */
    protected static $defaultGeo = array(
        'country' => 'Indonesia',
        'province' => 'Jawa Barat',
        'city' => 'Bandung'
    );

    /**
     * @param $id
     *
     * @return bool
     * @throws \Exception
     */
    public static function recordExist($id)
    {
        if (is_array($id)) {
            foreach ($id as $rec) {
                if (self::where('id', $rec)->count() == 0) throw new \Exception("Record Location Not Found with {$rec}");
            }
        } else {
            if (self::where('id', $id)->count() == 0) throw new \Exception("Record Location Not Found with {$id}");
        }

        return true;
    }


    /**
     * @param bool $resultIds
     *
     * @return array|string
     * @throws \Exception
     */
    public static function generateMassiveLocation1($resultIds = false)
    {
        $total = self::lists('id');
        if (count($total) > 1000) throw new \Exception('Data sudah lebih dari 1000 Record,Tidak Perlu Tambah Lagi');
        $dummy_location = new FakeLocations();
        $generate = [];
        for ($location = 0; $location < 20; $location++) {
            $d_country = $dummy_location->country();
            $country = self::create($d_country);
            $cIds [] = $country->id;
            for ($pro = 0; $pro < rand(15, 10); $pro++) {
                $d_province = $dummy_location->province($country->id, $country->name);
                $province = self::create($d_province);
                $pIds [] = $province->id;
                for ($ci = 0; $ci < rand(4, 10); $ci++) {
                    $d_city = $dummy_location->city($province->id, $province->name);
                    $city = self::create($d_city);
                    $generate[] = $city->id;
                    $cityIds[] = $city->id;
                }
            }
        }
        $locations = ['country_ids' => $cIds, 'province_ids' => $pIds, 'city_ids' => $cityIds];
        return ($resultIds) ? $locations : "Generate Location with " . count($generate) . " Records ";
    }

    /**
     *
     */
    public static function createRecordCountry($resultIds = false)
    {
        foreach (static::$countriesName as $countryName) {
            $newrecord = static::createRecord(
                static::getFake()->getLocation()->createLocationByName($countryName, 1, 0));
            $ids [] = $newrecord->id;
        }

        return ($resultIds) ? $ids : "Generate with " . count($ids) . " records";

    }

    /**
     * @param $record
     *
     * @return Model|static
     */
    protected static function  createRecordLocation($record)
    {
        return static::create($record);
    }

    /**
     * @param int $count
     *
     * @return array
     */
    protected static function createLocationCountry($count = 10)
    {

        $fake = self::getFake();
        for ($location = 0; $location < $count; $location++) {
            $country = self::create($fake->country());
            $ids [] = $country->id;
        }
        return $ids;
    }

    /**
     * Melakukan Penambahan Lokasi
     * berdasarkan countryId
     *
     * @param     $countryId
     *
     * @param int $count
     *
     * @return array
     */
    protected static function createLocationProvinces($countryId, $count = 10)
    {
        $fake = self::getFake();
        for ($pro = 0; $pro < $count; $pro++) {
            $d_province = $fake->province($countryId);
            $province = self::create($d_province);
            $ids [] = $province->id;
        }
        return $ids;
    }

    /**
     * @param     $provinceId
     * @param int $count
     *
     * @return array
     */
    protected static function createLocationCities($provinceId, $count = 10)
    {
        for ($pro = 0; $pro < $count; $pro++) {
            $city = static::createLocation("{$provinceId} City " . rand(2, 1000), $provinceId, 3);
            $cityIds [] = $city->id;
        }
        return $cityIds;
    }

    /**
     * @param int $count
     *
     * @return array|mixed
     */
    public static function getLocationIdsOrCreate($count = 10)
    {
        $countryIds = static::getIdsCountry();
        if (!$countryIds->count()) {
            /**
             * Jika Belum Ada
             */
            $countryIds = static::createLocationCountry($count);
            foreach ($countryIds as $countryId) {
                /**
                 * Create Province
                 */
                $provincesIds = static::createLocationProvinces($countryId);
                foreach ($provincesIds as $provinceId) {
                    $cityIds = static::createLocationCities($provinceId);
                }
            }
        } else {
            /**
             * Check Punya Province ?
             */
            foreach ($countryIds as $countryId) {
                $provincesIds = static::getIdsProvince($countryId);
                if (!count($provincesIds)) {
                    /**
                     * Jika Belum ada ,
                     * Buat Province dan Kota
                     */

                    /**
                     * Buat Province
                     */
                    $provincesIds [] = static::createLocationProvinces($countryId);

                    /**
                     * Buat Kota
                     */
                    foreach ($provincesIds as $provinceId) {
                        $city = static::createLocation("{$countryId} - {$provinceId} City " . rand(2, 1000), $provinceId, 3);
                        $cityIds [] = $city->id;
                    }
                } else {
                    /* Jika Province Ada */
                    foreach ($provincesIds as $provinceId) {
                        /*Check apakah Province Memiliki City*/
                        $cityIds = static::getIdsCity($provinceId);
                        if (!count($cityIds)) {
                            /*Jika Belum ada */
                            $city = static::createLocation("{$countryId} - {$provinceId} City " . rand(2, 1000), $provinceId, 3);
                            $cityIds [] = $city->id;
                        };
                    }
                }
            }
        }

        return array('countryIds' => $countryIds, 'provinceIds' => $provincesIds, 'cityIds' => $cityIds);
    }

    /**
     * @return Array
     */
    public static function getIdsCountry()
    {
        return static::Country()->lists('id');
    }

    /**
     * @param int $count
     *
     * @return array
     */
    public static function getIdsCountryOrCreate($count = 10)
    {
        $records = static::Country();
        if ($records->count()) {
            $ids = $records->lists('id');
        } else {
            $records = static::getFake()->getLocation()->country(static::$countries);
            foreach ($records as $rec) {
                $record = static::createRecord($rec);
                $ids[] = $record->id;
            }
        }
        return $ids;
    }

    /**
     * @param array $countryIds
     *
     * @return array
     */
    public static function getIdsProvinceOrCreate(array $countryIds)
    {
        $provinceIds = array();
        foreach ($countryIds as $countryId) {
            $record = static::Provinces($countryId);
            if ($record->count()) {
                $provinceIds [] = $record->lists('id');
            } else {
                $record = static::getFake()->getLocation()->province($countryId);
                $province = static::createRecord($record);
                $provinceIds [] = $province->id;
            }
        }
        return $provinceIds;
    }

    /**
     * @param array $provinceIds
     *
     * @return array
     */
    public static function getIdsCityOrCreate(array $provinceIds)
    {
        $cityIds = array();
        foreach ($provinceIds as $provinceId) {
            $record = static::Cities($provinceId);
            if ($record->count()) {
                $cityIds [] = $record->lists('id');
            } else {
                $record = static::getFake()->getLocation()->city($provinceId);
                $city = static::createRecord($record);
                $cityIds [] = $city->id;
            }
        }
        return $cityIds;
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
     * @return array
     */
    public static function getDefaultGeo()
    {
        return self::$defaultGeo;
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
     * Mendapatkan Ids Province dari country Id Yang diberikan
     *
     * @param $countryId
     *
     * @return mixed
     */
    public static function getIdsProvince($countryId)
    {
        return static::Provinces($countryId)->lists('id');
    }

    /**
     * @param $query
     * @param $countryId
     *
     * @return mixed
     */
    public function scopeProvinces($query, $countryId)
    {
        return $query->ofParentId($countryId)->ofLevel(2);
    }

    /**
     * Mendapatkan ID City
     *
     * @param $provinceId
     *
     * misal :
     * $provinceId =1;
     * print_r( \Emayk\Ics\Repo\Locations\Locations::getIdsCity($provinceId) );
     *
     * @return mixed
     */
    public static function getIdsCity($provinceId)
    {
        return static::Cities($provinceId)->lists('id');
    }

    /**
     * @param $query
     * @param $provinceId
     *
     * @return mixed
     */
    public function scopeCities($query, $provinceId)
    {
        return $query->ofParentId($provinceId)->OfLevel(3);
    }

    /**
     * @param $query
     * @param $level
     *
     * @return mixed
     */
    public function scopeOfLevel($query, $level)
    {
        return $query->whereLevel($level);
    }

    /**
     * Mendapatkan Parent Parent ID
     * Cth :
     * $location = Locations::ofParentId(1)->get();
     *
     * @param $query    Model
     * @param $parentId parameter parent_id
     *
     * @return mixed
     */
    public function scopeOfParentId($query, $parentId)
    {
        return $query->whereParentId($parentId);
    }

    /**
     * @param $query
     *
     * @return mixed
     */
    public function scopeCountry($query)
    {
        return $query->ofLevel(1)->OfParentId(0);
    }

    /**
     * @param $q
     *
     * @return mixed
     */
    public function scopeProvince($q)
    {
        return $q->where('level', 2);
    }

    /**
     * @param $q
     *
     * @return mixed
     */
    public function scopeCity($q)
    {
        return $q->where('level', 3);
    }


    /**
     * @param $parentId
     * @param $level
     * @param $id
     *
     * @return mixed
     */
    public function getLocationById($parentId, $level, $id)
    {
        $location = static::where('id', $id)
            ->where('parent_id', $parentId)
            ->where('level', $level);
        return $location;
    }

    /**
     * @param        $parentId
     * @param        $level
     * @param string $name
     *
     * @return mixed
     */
    public static function  getLocationByName($parentId, $level, $name = 'indonesia')
    {
        $location = static::where('name', $name)
            ->where('parent_id', $parentId)
            ->where('level', $level);
        return $location;
    }

    /**
     * @param $name
     * @param $parent_id
     * @param $level
     *
     * @return Model|static
     */
    public static function  createLocation($name, $parent_id, $level)
    {
        $location = static::create(
            array_merge(
                array(
                    'name' => $name, 'info' => "Information {$name} ", 'parent_id' => $parent_id,
                    'level' => $level, 'parent_type' => '\Emayk\Ics\Repo\Locations\Locations'
                ),
                static::onlyOncefillerAttributes()
            ));
        return $location;
    }

    /**
     * @return array
     */
    protected static function  onlyOncefillerAttributes()
    {
        return array(
            'uuid' => uniqid('System'),
            'createby_id' => 1,
            'lastupdateby_id' => 1,
            'created_at' => Carbon::create(),
            'updated_at' => Carbon::create(),
        );
    }

    /**
     * @param $query
     *
     * @return mixed
     */
    public function scopeDefaultCountry($query)
    {
        return $query->Name($this->defaultLocation['country']);
    }

    /**
     * @param $query
     *
     * @return mixed
     */
    public function scopeDefaultProvince($query)
    {
        return $query->Name($this->defaultLocation['province']);
    }

    /**
     * Mendapatkan Location
     *
     * @param $query
     *
     * @return mixed
     */
    public function scopeDefaultCity($query)
    {
        return $query->Name($this->defaultLocation['city']);
    }

    /**
     * @return AbstractGenerate
     */
    protected static function getFake()
    {
        return new AbstractGenerate();
    }

    /**
     * Mendapatkan ID Default Country
     * Jika Belum maka dibuatkan
     *
     * @return int
     */

    public static function  getIdsDefaultCountryOrCreate()
    {

        $record = static::Name(static::$defaultGeo['country']);
        if (!$record->count()) {
            $c = static::create(
                static::getFake()->getLocation()->createLocationByName(static::$defaultGeo['country'], 1, 0)
            );
            $id = $c->id;
        } else {
            $id = $record->pluck('id');
        }
        return $id;
    }

    /**
     * @return string
     */
    public static function createDefaultLocationSample()
    {
        $countryName = static::$defaultGeo['country'];
        $provinceName = static::$defaultGeo['province'];
        $cityName = static::$defaultGeo['city'];

        $countryId = static::createRecord(
            static::getFake()->getLocation()->createLocationByName($countryName, 1, 0)
        );

        $provinceId = static::createRecord(
            static::getFake()->getLocation()->createLocationByName($provinceName, 2, $countryId->id)
        );

        $cityId = static::createRecord(
            static::getFake()->getLocation()->createLocationByName($cityName, 2, $provinceId->id)
        );

        return "Generate Data Location with {$countryName} - {$provinceName} - {$cityName} Successfully";
    }

    /**
     * Mendapatkan ID default Province
     *
     * @param $countryId
     *
     * @return int
     */
    public static function  getIdsDefaultProvinceOrCreate($countryId)
    {
        $record = static::Name(static::$defaultGeo['province']);
        if (!$record->count()) {
            $c = static::create(
                static::getFake()->getLocation()->createLocationByName(static::$defaultGeo['province'], 2, $countryId)
            );
            /** @var $id \Emayk\Ics\Repo\Locations\Locations */
            $id = $c->id;
        } else {
            $id = $record->pluck('id');
        }
        return $id;
    }

    /**
     * @param $provinceId
     *
     * @return Locations
     */
    public static function  getIdsDefaultCityOrCreate($provinceId)
    {
        $record = static::Name(static::$defaultGeo['city']);
        if (!$record->count()) {
            $c = static::create(
                static::getFake()->getLocation()->createLocationByName(static::$defaultGeo['city'], 3, $provinceId)
            );
            $id = $c->id;
        } else {
            $id = $record->pluck('id');
        }
        return $id;
    }


    /**
     * @param $type
     * @param $parentId
     * @param array $allInput
     * @return array
     */
    public function findByTypeAndParent($type, $parentId, array $allInput = array())
    {
        $level = $this->getLevelFromString(strtolower($type));

        $result = static::ofLevel($level)->ofParentId($parentId)->get()->toArray();
        $res = [];
        /**
         * dapatkan selain parent 0
         */
        if ($parentId>0)
        {
        foreach ($result as $r) {
            $recParent = $this->getParent($parentId);
            $parentRecord = array(
                'id' => $recParent->id,
                'name' => $recParent->name);
            $res[] = array_merge($r, array(
                    'parent' => $parentRecord)
            );

        }
        }else{
            $res = $result;
        }
        return $res;
    }

    /**
     * @param $parentId
     * @return mixed
     */
    public function getParent($parentId)
    {
        return  static::whereId($parentId)->first();
    }

    /**
     * @param $type
     * @param array $allInput
     * @return mixed
     */
    public function findByType($type, array $allInput = array())
    {
        $level = $this->getLevelFromString(strtolower($type));
        return static::ofLevel($level)->get()->toArray();
    }

    /**
     * @param $query
     * @param $parenId
     * @return mixed
     */
    public function scopeParentId($query, $parenId)
    {
        return $query->whereParentId($parenId);
    }


    /**
     * @param $type
     * @return int
     */
    protected function getLevelFromString($type)
    {
        $allowType = array('country', 'province', 'city');
        if (!in_array($type, $allowType)) $type = 'country';

        switch ($type) {
            case 'city' :
                $level = 3;
                break;
            case 'province' :
                $level = 2;
                break;
            case 'country' :
                $level = 1;
                break;
        }

        return $level;
    }

}

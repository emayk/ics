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
namespace Emayk\Ics\Repo\Suppliers;

use Aws\CloudFront\Exception\Exception;
use Emayk\Ics\Repo\Fabrictype\Fabrictype;
use Emayk\Ics\Repo\Legality\Legality;
use Emayk\Ics\Repo\Locations\Locations;
use Emayk\Ics\Repo\Producttype\Producttype;
use Emayk\Ics\Repo\Status\Status;
use Emayk\Ics\Repo\Typesuppliersbuyers\Typesuppliersbuyers;
use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;
use Emayk\Ics\Support\Dummy\Faker\Suppliers as SuppliersFaker;
use Illuminate\Database\Eloquent\Model;
use Log;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Suppliers\Suppliers'
 *
 * @property integer                                                                           $id
 * @property string                                                                            $name
 * @property string                                                                            $codepos
 * @property string                                                                            $npwp
 * @property string                                                                            $fax
 * @property string                                                                            $email
 * @property float                                                                             $plafon
 * @property integer                                                                           $kredit
 * @property \Carbon\Carbon                                                                    $deleted_at
 * @property string                                                                            $address
 * @property string                                                                            $rt
 * @property string                                                                            $rw
 * @property string                                                                            $phone
 * @property integer                                                                           $status_id
 * @property integer                                                                           $tipe_id
 * @property integer                                                                           $legality_id
 * @property integer                                                                           $typeprod_id
 * @property integer                                                                           $country_id
 * @property integer                                                                           $province_id
 * @property integer                                                                           $city_id
 * @property string                                                                            $uuid
 * @property integer                                                                           $createby_id
 * @property integer                                                                           $lastupdateby_id
 * @property string                                                                            $codeinternal
 * @property \Carbon\Carbon                                                                    $created_at
 * @property \Carbon\Carbon                                                                    $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\Emayk\Ics\Repo\Products\Products[] $products
 * @property-read \Emayk\Ics\Repo\Typesuppliersbuyers\Typesuppliersbuyers $type
 */
class Suppliers extends Model
{
	/**
	 * @var array
	 */
	protected $guarded = array();
	/**
	 * @var string
	 */
	protected $table = 'master_suppliers';
	/**
	 * @var array
	 */
	public static $rules = array();

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function products()
	{
		return $this->hasMany('Emayk\Ics\Repo\Products\Products');
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function type()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Typesuppliersbuyers\Typesuppliersbuyers', 'tipe_id');
	}

	/**
	 * @return AbstractGenerate
	 */
	public static function getFake()
	{
		return new AbstractGenerate();
	}

	/**
	 * @param bool $resultsIds
	 * @param int  $count
	 *
	 * @return array|string
	 */
	protected  static function generateMassiveDummy($resultsIds = false, $count = 100)
	{
		/** Buat Data fake Instance */
		$fake = static::getFake()->getSupplier();

		/** Cari Legalitas */
		$listLegalitiesId = Legality::getIdsOrGenerateDummyData(100);
		/** Status */

		$listStatusId = Status::getIdsOrCreate();

		/*Product Type*/
		$typeProductIds = Producttype::getIdsOrCreateDummy(100);

		/*Type Supplier*/
		$typeIdsSupBuy =  Typesuppliersbuyers::generateDummyData(true);
//		return $typeIdsSupBuy;
		/** Locations */
		$countryId = Locations::getIdsDefaultCountryOrCreate();

		$provinceId = Locations::getIdsDefaultProvinceOrCreate($countryId);

		$cityId = Locations::getIdsDefaultCityOrCreate($provinceId);

		$suppliers = $fake->generateSuppliers(
			$count, $typeIdsSupBuy, $typeProductIds, $listLegalitiesId,
			$countryId, $provinceId, $cityId, $listStatusId);

		foreach ($suppliers as $sup) {
			$s          = static::create($sup);
			$supIds [ ] = $s->id;
		}


		Log::debug('Supplier Masih Kosong , Sudah diisi ' . count($supIds));
		return ( $resultsIds ) ? $supIds : "Generate " . count($supIds) . " records";
	}

	/**
	 * @param bool $resultIds
	 * @param int  $count
	 *
	 * @return array|string
	 */
	public  static function generateRecordsFromDummy($resultIds = false,$count = 100)
	{
		return static::generateMassiveDummy($resultIds,$count);
	}

	/**
	 * @param int $count
	 *
	 * @return array|string
	 */
	public static  function getRecordIdsOrCreate($count = 10)
	{
		$recordIds = static::getListIds();
		if (!count($recordIds))
		{
			/*Create*/
			$recordIds = static::generateMassiveDummy(true,$count);
		};
		return $recordIds;
	}


	/**
	 * @return mixed
	 */
	protected static function getListIds()
	{
		return static::lists('id');
	}
}

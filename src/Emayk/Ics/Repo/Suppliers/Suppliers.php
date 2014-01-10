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
 */
class Suppliers extends Model
{
	protected $guarded = array();
	protected $table = 'master_suppliers';
	public static $rules = array();

	public function products()
	{
		return $this->hasMany('Emayk\Ics\Repo\Products\Products');
	}

	public function type()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Typesuppliersbuyers\Typesuppliersbuyers', 'tipe_id');
	}

	public static function generateMassiveDummy($resultsIds = false, $count = 100)
	{
		/**
		 * Buat Data fake Instance
		 */
		$fake = new SuppliersFaker();
		/**
		 * Cari Type Supplier dan Buyer
		 */
		$listtypesId[ ] = Typesuppliersbuyers::getIdsOrGenerateDummydata();
		/**
		 * Cari Legalitas
		 */
		$listLegalitiesId = Legality::getIdsOrGenerateDummyData(100);
		/**
		 * Status
		 */
		$listStatusId = Status::getIdsOrCreate();
		$typeProductIds = Producttype::getIdsOrCreateDummy(100);

		/**
		 * Locations
		 */
		$locationsIds = Locations::lists('id');
		if (!count($locationsIds)) {
			/**
			 * Jika Tidak ada, Buat
			 */
			$locationsIds = Locations::generateMassiveLocation(true);
			$countryIds   = $locationsIds[ 'country_ids' ];
			$provinceIds  = $locationsIds[ 'province_ids' ];
			$cityIds      = $locationsIds[ 'city_ids' ];
		} else {
			/**
			 * Jika Lokasi Ada, Telusuri Country
			 */
			$countryIds = Locations::where('parent_id', 0)->lists('id');
			if (!count($countryIds)) {
				/**
				 * Jika Country Tidak ada,
				 * Buat Masing2 Entry (Province , City)
				 */
				$country  = Locations::createLocation('Indonesia', 0, 1);
				$province = Locations::createLocation('Jawa Barat', $country->id, 2);
				$city     = Locations::createLocation('Bandung', $province->id, 3);
				/**
				 * Masukan List Ids yang sudah dibuat ke masing2 variable
				 */
				$countryIds  = array($country->id);
				$provinceIds = array($province->id);
				$cityIds     = array($city->id);
			} else {
				/**
				 * Jika Negara Sudah Ada
				 * Lakukan Extract Info Province dan Kota
				 */
				foreach ($countryIds as $cId)
					/**
					 * Dapatkan Info Province , Jika Tidak ada Throw
					 */
					$provinceIds = Locations::where('parent_id', $cId)->lists('id');
				if (!count($provinceIds)) throw new \Exception( 'Province None' );
				foreach ($provinceIds as $pId) {
					$cityIds = Locations::where('parent_id', $pId)->lists('id');
				}
			}
		}

		$countryId  = $countryIds[ 0 ];
		$provinceId = $provinceIds[ 0 ];
		$cityId     = $cityIds[ 0 ];

		$suppliers = $fake->generateSuppliers(
			$count, $listtypesId, $typeProductIds, $listLegalitiesId,
			$countryId, $provinceId, $cityId, $listStatusId);

		foreach ($suppliers as $sup) {
			$s          = self::create($sup);
			$supIds [ ] = $s->id;
		}
		Log::debug('Supplier Masih Kosong , Sudah diisi ' . count($supIds));
		return ( $resultsIds ) ? $supIds : "Generate " . count($supIds) . " records";
	}

	/**
	 * Mendapatkan Id Type Supplier
	 *
	 * @return bool | array
	 */
	protected static function  getTypesId()
	{
		$a = new self();
		return ( !$a->count() ) ? false : $a->type()->lists('id');
	}


}

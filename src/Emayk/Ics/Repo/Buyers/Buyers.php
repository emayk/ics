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

use Emayk\Ics\Support\Dummy\Faker\Buyers as FakeBuyers;
use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Buyers\Buyers'
 *
 * @property integer                                                      $id
 * @property string                                                       $name
 * @property string                                                       $codepos
 * @property string                                                       $npwp
 * @property string                                                       $fax
 * @property string                                                       $email
 * @property float                                                        $plafon
 * @property integer                                                      $kredit
 * @property \Carbon\Carbon                                               $deleted_at
 * @property string                                                       $address
 * @property string                                                       $rt
 * @property string                                                       $rw
 * @property string                                                       $phone
 * @property integer                                                      $status_id
 * @property integer                                                      $tipe_id
 * @property integer                                                      $legality_id
 * @property integer                                                      $typeprod_id
 * @property integer                                                      $country_id
 * @property integer                                                      $province_id
 * @property integer                                                      $city_id
 * @property string                                                       $uuid
 * @property integer                                                      $createby_id
 * @property integer                                                      $lastupdateby_id
 * @property string                                                       $codeinternal
 * @property \Carbon\Carbon                                               $created_at
 * @property \Carbon\Carbon                                               $updated_at
 * @property-read \Emayk\Ics\Repo\Status\Status                           $status
 * @property-read \Emayk\Ics\Repo\Legality\Legality                       $legality
 * @property-read \Emayk\Ics\Repo\Typesuppliersbuyers\Typesuppliersbuyers $type
 * @property-read \Emayk\Ics\Repo\Producttype\Producttype                 $product_type
 * @property-read \Emayk\Ics\Repo\Locations\Locations                     $country
 * @property-read \Emayk\Ics\Repo\Locations\Locations                     $province
 * @property-read \Emayk\Ics\Repo\Locations\Locations                     $city
 * @property-read \Emayk\Ics\Repo\Users\Users                             $creator
 * @property-read \Emayk\Ics\Repo\Users\Users                             $updater
 */
class Buyers extends Model
{
	protected $guarded = array();
	protected $table = 'master_buyers';
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


	public static function  generateDummyData($resultsIds = false,$count = 10)
	{
		/**
		 * Buat Data fake Instance
		 */
		$fake = new FakeBuyers();
		/**
		 * Cari Type Supplier dan Buyer
		 */
//		$listtypesId = ::lists('id');
		if (!count($listtypesId)) {
			/**
			 * Jika Tidak ada (Buat)
			 */
			$supbuy = $fake->typeSuplierBuyer()->types();
			foreach ($supbuy as $type) {
				$typex          = Typesuppliersbuyers::create($type);
				$listtypesId[ ] = $typex->id;
			}
		}

		/**
		 * Cari Legalitas
		 */
		$listLegalitiesId = Legality::lists('id');
		if (!count($listLegalitiesId)) {
			/**
			 * Buat Jika Belum ada
			 */
			$legalities = $fake->getLegality()->createLegalities();
			foreach ($legalities as $legal) {
				$l                    = Legality::create($legal);
				$listLegalitiesId [ ] = $l->id;
			}
		}

		/**
		 * Status
		 */
		$listStatusId = Status::lists('id');
		if (!count($listStatusId)) {
			/**
			 * Buat Jika Belum ada
			 */
			$listStatusId = Status::createDataStatus(true);
		}

		$typeProductIds = Producttype::lists('id');
		/**
		 * Cari ,
		 * Jika tidak ada Type product akan dibuatkan
		 */
		if (!count($typeProductIds)) {
			/**
			 * Buat Product Type
			 */

			/**
			 * Cari Fabric Type ,
			 * Jika Tidak ada akan dibuat.
			 */
			$listFabricType = Fabrictype::lists('id');
			if (!count($listFabricType)) {
				$listFabricType = Fabrictype::generateMassive(true);
			}
			/**
			 * Lakukan Proses Buat Product
			 */
			$typeProductIds = Producttype::generateMassiveDummy(
				$listFabricType, $fake, true, 10
			);
		}


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

}

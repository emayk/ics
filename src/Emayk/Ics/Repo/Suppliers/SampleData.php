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
 **/


namespace Emayk\Ics\Repo\Suppliers;

use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;
use Emayk\Ics\Repo\Legality\Legality;
use Emayk\Ics\Repo\Locations\Locations;
use Emayk\Ics\Repo\Producttype\Producttype;
use Emayk\Ics\Repo\Status\Status;
use Emayk\Ics\Repo\Typesuppliersbuyers\Typesuppliersbuyers;
use Emayk\Ics\Support\Dummy\Faker\Suppliers as SuppliersFaker;

class SampleData
{
	protected $fake;

	function __construct()
	{
		$this->fake = new AbstractGenerate;
	}

	/**
	 * @return \Emayk\Ics\Support\Dummy\Faker\AbstractGenerate
	 */
	public function getFake()
	{
		return $this->fake;
	}

	/**
	 * @param bool $resultsIds
	 * @param int  $count
	 *
	 * @return array|string
	 */
	public static function generateMassiveDummy($resultsIds = false, $count = 100)
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
		$typeIdsSupBuy = Typesuppliersbuyers::generateDummyData(true);
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


}

 
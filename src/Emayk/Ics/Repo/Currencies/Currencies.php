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
namespace Emayk\Ics\Repo\Currencies;

use Emayk\Ics\Repo\Locations\Locations;
use Emayk\Ics\Support\Dummy\Faker\Currency;
use Exception;
use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Currencies\Currencies'
 *
 * @property integer                                  $id
 * @property string                                   $name
 * @property string                                   $shortname
 * @property integer                                  $country_id
 * @property string                                   $uuid
 * @property integer                                  $createby_id
 * @property integer                                  $lastupdateby_id
 * @property \Carbon\Carbon                           $created_at
 * @property \Carbon\Carbon                           $updated_at
 * @property-read \Emayk\Ics\Repo\Countries\Countries $country
 */
class Currencies extends Model
{
	protected $guarded = array();
	protected $table = 'master_currencies';
	public static $rules = array();

	/**
	 * List Countries
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function country()
	{
		return $this->belongsTo('Emayk\Ics\Repo\Countries\Countries', 'country_id');
	}


	public static function generateMassive($resultIds = false)
	{

		$countries = Locations::where('level', 1);
		if (!$countries->count()) throw new Exception( 'Negara Masih Kosong , Isi Dl' );


		$listsCountries = $countries->lists('id');
		$fakeCurrencies = new Currency();

		/** @var $currencies array */
		$currencies = array();
		foreach ($listsCountries as $c) {
			if (self::where('country_id',$c)->count()) continue;
			$curr = $fakeCurrencies->create_Currency($c,
				$fakeCurrencies->getFake()->unique()->country,
				$fakeCurrencies->getFake()->locale);
			$currency = self::create($curr);
			/** @noinspection PhpUndefinedFieldInspection */
			$currencies [ ] = $currency->id;
		}

		return ( $resultIds ) ? $currencies : "Generate Currency with " . count($currencies) . " records with country " . count($listsCountries) . " records";

	}
}

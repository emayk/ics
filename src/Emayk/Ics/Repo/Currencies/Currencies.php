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
use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;
use Emayk\Ics\Support\Dummy\Faker\Currency;
use Exception;
use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Currencies\Currencies'
 *
 * @property integer $id
 * @property string $name
 * @property string $shortname
 * @property integer $country_id
 * @property string $uuid
 * @property integer $createby_id
 * @property integer $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Emayk\Ics\Repo\Countries\Countries $country
 */
class Currencies extends Model
{
	/**
	 * @var array
	 */
	protected $guarded = array();
	/**
	 * @var string
	 */
	protected $table = 'master_currencies';
	/**
	 * @var array
	 */
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


	/**
	 * @param bool $resultIds
	 *
	 * @return array|string
	 * @throws \Exception
	 */
	public static function generateMassive($resultIds = false)
	{

		$countries = Locations::where('level', 1);
		if (!$countries->count()) throw new Exception( 'Negara Masih Kosong , Isi Dl' );

		$fake         = static::getFake()->getCurrency();
		$ListCurrency = $fake->getCurrencies();
		$ids          = array();
		foreach ($ListCurrency as $curr) {
			/*dapatkan ID*/
			$countryName = $curr[ 'country' ];
			$currName    = $curr[ 'name' ];
			$currSymbol  = $curr[ 'symbol' ];
			$country     = Locations::whereName($countryName);
			if ($country->count()) {
				/*Jika Country Ada*/
				$countryId = $country->pluck('id');
				$record    = $fake->createRecordCurrency($countryId, $currName, $currSymbol);
				$newrecord = static::createRecord($record);
				$ids[ ]    = $newrecord->id;
			};
		}
		return ( $resultIds ) ? $ids : "Generate Currency with " . count($ids) . " records";
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

	public static function getIdsOrCreateSample()
	{
		$ids = static::lists('id');
		if (!count($ids))
		{
			$ids = static::generateMassive(true);
		}
		return $ids;
	}
}

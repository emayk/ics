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


namespace Emayk\Ics\Support\Dummy\Faker;


/**
 * Class Currency
 *
 * @package Emayk\Ics\Support\Dummy\Faker
 */
class Currency extends AbstractGenerate
{
	/**
	 * @var array
	 */
	protected $symbols = array('Rp', '$');
	/**
	 * @var array
	 */
	protected $name = array('Rupiah', 'Dollar');

	/**
	 * @param string $name
	 * @param string $symbol
	 * @param int    $country_id
	 *
	 * @return array
	 */
	public function currency($name = 'Rupiah', $symbol = 'Rp', $country_id = 1)
	{
		return array_merge(array(
			'name'       => $name,
			'shortname'  => $symbol,
			'country_id' => $country_id
		), $this->othersAttributesArray());
	}

	/**
	 * Mendapatkan Currencies
	 *
	 * @param array $listIdCountry ( berupa array(1,2,3,4) )
	 *
	 * @return array
	 */
	public function createCurrencies(array $listIdCountry)
	{

		$currencies = array();
		foreach ($listIdCountry as $countryId) {
			$currencies[ ] = $this->currency(
				$this->fake->randomElement($this->name),
				$this->fake->randomElement($this->symbols),
				$countryId
			);
		}
		return $currencies;
	}
}

/** 1/8/14 **/ 
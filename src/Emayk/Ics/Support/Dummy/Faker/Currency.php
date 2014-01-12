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
	 * @var array
	 */
	protected static  $currencies = array(
		array("country" => "Albania", "name" => "Lek", "symbol" => "ALL"),
		array("country" => "Afghanistan", "name" => "Afghani", "symbol" => "AFN"),
		array("country" => "Argentina", "name" => "Peso", "symbol" => "ARS"),
		array("country" => "Aruba", "name" => "Guilder", "symbol" => "AWG"),
		array("country" => "Australia", "name" => "Dollar", "symbol" => "AUD"),
		array("country" => "Azerbaijan New", "name" => "Manat", "symbol" => "AZN"),
		array("country" => "Bahamas", "name" => "Dollar", "symbol" => "BSD"),
		array("country" => "Barbados", "name" => "Dollar", "symbol" => "BBD"),
		array("country" => "Belarus", "name" => "Ruble", "symbol" => "BYR"),
		array("country" => "Belize", "name" => "Dollar", "symbol" => "BZD"),
		array("country" => "Bermuda", "name" => "Dollar", "symbol" => "BMD"),
		array("country" => "Bolivia", "name" => "Boliviano", "symbol" => "BOB"),
		array("country" => "Bosnia and Herzegovina Convertible", "name" => "Marka", "symbol" => "BAM"),
		array("country" => "Botswana", "name" => "Pula", "symbol" => "BWP"),
		array("country" => "Bulgaria", "name" => "Lev", "symbol" => "BGN"),
		array("country" => "Brazil", "name" => "Real", "symbol" => "BRL"),
		array("country" => "Brunei Darussalam", "name" => "Dollar", "symbol" => "BND"),
		array("country" => "Cambodia", "name" => "Riel", "symbol" => "KHR"),
		array("country" => "Canada", "name" => "Dollar", "symbol" => "CAD"),
		array("country" => "Cayman Islands", "name" => "Dollar", "symbol" => "KYD"),
		array("country" => "Chile", "name" => "Peso", "symbol" => "CLP"),
		array("country" => "China Yuan", "name" => "Renminbi", "symbol" => "CNY"),
		array("country" => "Colombia", "name" => "Peso", "symbol" => "COP"),
		array("country" => "Costa Rica", "name" => "Colon", "symbol" => "CRC"),
		array("country" => "Croatia", "name" => "Kuna", "symbol" => "HRK"),
		array("country" => "Cuba", "name" => "Peso", "symbol" => "CUP"),
		array("country" => "Czech Republic", "name" => "Koruna", "symbol" => "CZK"),
		array("country" => "Denmark", "name" => "Krone", "symbol" => "DKK"),
		array("country" => "Dominican Republic", "name" => "Peso", "symbol" => "DOP"),
		array("country" => "East Caribbean", "name" => "Dollar", "symbol" => "XCD"),
		array("country" => "Egypt", "name" => "Pound", "symbol" => "EGP"),
		array("country" => "El Salvador", "name" => "Colon", "symbol" => "SVC"),
		array("country" => "Estonia", "name" => "Kroon", "symbol" => "EEK"),
		array("country" => "Euro Member", "name" => "Countries", "symbol" => "EUR"),
		array("country" => "Falkland Islands (Malvinas)", "name" => "Pound", "symbol" => "FKP"),
		array("country" => "Fiji", "name" => "Dollar", "symbol" => "FJD"),
		array("country" => "Ghana", "name" => "Cedis", "symbol" => "GHC"),
		array("country" => "Gibraltar", "name" => "Pound", "symbol" => "GIP"),
		array("country" => "Guatemala", "name" => "Quetzal", "symbol" => "GTQ"),
		array("country" => "Guernsey", "name" => "Pound", "symbol" => "GGP"),
		array("country" => "Guyana", "name" => "Dollar", "symbol" => "GYD"),
		array("country" => "Honduras", "name" => "Lempira", "symbol" => "HNL"),
		array("country" => "Hong Kong", "name" => "Dollar", "symbol" => "HKD"),
		array("country" => "Hungary", "name" => "Forint", "symbol" => "HUF"),
		array("country" => "Iceland", "name" => "Krona", "symbol" => "ISK"),
		array("country" => "India", "name" => "Rupee", "symbol" => "INR"),
		array("country" => "Indonesia", "name" => "Rupiah", "symbol" => "IDR"),
		array("country" => "Iran", "name" => "Rial", "symbol" => "IRR"),
		array("country" => "Isle of Man", "name" => "Pound", "symbol" => "IMP"),
		array("country" => "Israel", "name" => "Shekel", "symbol" => "ILS"),
		array("country" => "Jamaica", "name" => "Dollar", "symbol" => "JMD"),
		array("country" => "Japan", "name" => "Yen", "symbol" => "JPY"),
		array("country" => "Jersey", "name" => "Pound", "symbol" => "JEP"),
		array("country" => "Kazakhstan", "name" => "Tenge", "symbol" => "KZT"),
		array("country" => "Korea (North)", "name" => "Won", "symbol" => "KPW"),
		array("country" => "Korea (South)", "name" => "Won", "symbol" => "KRW"),
		array("country" => "Kyrgyzstan", "name" => "Som", "symbol" => "KGS"),
		array("country" => "Laos", "name" => "Kip", "symbol" => "LAK"),
		array("country" => "Latvia", "name" => "Lat", "symbol" => "LVL"),
		array("country" => "Lebanon", "name" => "Pound", "symbol" => "LBP"),
		array("country" => "Liberia", "name" => "Dollar", "symbol" => "LRD"),
		array("country" => "Lithuania", "name" => "Litas", "symbol" => "LTL"),
		array("country" => "Macedonia", "name" => "Denar", "symbol" => "MKD"),
		array("country" => "Malaysia", "name" => "Ringgit", "symbol" => "MYR"),
		array("country" => "Mauritius", "name" => "Rupee", "symbol" => "MUR"),
		array("country" => "Mexico", "name" => "Peso", "symbol" => "MXN"),
		array("country" => "Mongolia", "name" => "Tughrik", "symbol" => "MNT"),
		array("country" => "Mozambique", "name" => "Metical", "symbol" => "MZN"),
		array("country" => "Namibia", "name" => "Dollar", "symbol" => "NAD"),
		array("country" => "Nepal", "name" => "Rupee", "symbol" => "NPR"),
		array("country" => "Netherlands Antilles", "name" => "Guilder", "symbol" => "ANG"),
		array("country" => "New Zealand", "name" => "Dollar", "symbol" => "NZD"),
		array("country" => "Nicaragua", "name" => "Cordoba", "symbol" => "NIO"),
		array("country" => "Nigeria", "name" => "Naira", "symbol" => "NGN"),
		array("country" => "Korea (North)", "name" => "Won", "symbol" => "KPW"),
		array("country" => "Norway", "name" => "Krone", "symbol" => "NOK"),
		array("country" => "Oman", "name" => "Rial", "symbol" => "OMR"),
		array("country" => "Pakistan", "name" => "Rupee", "symbol" => "PKR"),
		array("country" => "Panama", "name" => "Balboa", "symbol" => "PAB"),
		array("country" => "Paraguay", "name" => "Guarani", "symbol" => "PYG"),
		array("country" => "Peru Nuevo", "name" => "Sol", "symbol" => "PEN"),
		array("country" => "Philippines", "name" => "Peso", "symbol" => "PHP"),
		array("country" => "Poland", "name" => "Zloty", "symbol" => "PLN"),
		array("country" => "Qatar", "name" => "Riyal", "symbol" => "QAR"),
		array("country" => "Romania New", "name" => "Leu", "symbol" => "RON"),
		array("country" => "Russia", "name" => "Ruble", "symbol" => "RUB"),
		array("country" => "Saint Helena", "name" => "Pound", "symbol" => "SHP"),
		array("country" => "Saudi Arabia", "name" => "Riyal", "symbol" => "SAR"),
		array("country" => "Serbia", "name" => "Dinar", "symbol" => "RSD"),
		array("country" => "Seychelles", "name" => "Rupee", "symbol" => "SCR"),
		array("country" => "Singapore", "name" => "Dollar", "symbol" => "SGD"),
		array("country" => "Solomon Islands", "name" => "Dollar", "symbol" => "SBD"),
		array("country" => "Somalia", "name" => "Shilling", "symbol" => "SOS"),
		array("country" => "South Africa", "name" => "Rand", "symbol" => "ZAR"),
		array("country" => "Korea (South)", "name" => "Won", "symbol" => "KRW"),
		array("country" => "Sri Lanka", "name" => "Rupee", "symbol" => "LKR"),
		array("country" => "Sweden", "name" => "Krona", "symbol" => "SEK"),
		array("country" => "Switzerland", "name" => "Franc", "symbol" => "CHF"),
		array("country" => "Suriname", "name" => "Dollar", "symbol" => "SRD"),
		array("country" => "Syria", "name" => "Pound", "symbol" => "SYP"),
		array("country" => "Taiwan New", "name" => "Dollar", "symbol" => "TWD"),
		array("country" => "Thailand", "name" => "Baht", "symbol" => "THB"),
		array("country" => "Trinidad and Tobago", "name" => "Dollar", "symbol" => "TTD"),
		array("country" => "Turkey", "name" => "Lira", "symbol" => "TRY"),
		array("country" => "Turkey", "name" => "Lira", "symbol" => "TRL"),
		array("country" => "Tuvalu", "name" => "Dollar", "symbol" => "TVD"),
		array("country" => "Ukraine", "name" => "Hryvna", "symbol" => "UAH"),
		array("country" => "United Kingdom", "name" => "Pound", "symbol" => "GBP"),
		array("country" => "United States", "name" => "Dollar", "symbol" => "USD"),
		array("country" => "Uruguay", "name" => "Peso", "symbol" => "UYU"),
		array("country" => "Uzbekistan", "name" => "Som", "symbol" => "UZS"),
		array("country" => "Venezuela", "name" => "Bolivar", "symbol" => "VEF"),
		array("country" => "Viet Nam", "name" => "Dong", "symbol" => "VND"),
		array("country" => "Yemen", "name" => "Rial", "symbol" => "YER"),
		array("country" => "Zimbabwe", "name" => "Dollar", "symbol" => "ZWD")
	);

	/**
	 * @return array
	 */
	public static function getCurrencies()
	{
		return self::$currencies;
	}

	/**
	 * @return array
	 */
	public function getOwners()
	{
		return $this->owners;
	}

	/**
	 * @param        $countryId
	 * @param string $name
	 * @param string $symbol
	 *
	 *
	 * @return array
	 */
	public function create_Currency($countryId, $name , $symbol )
	{
		return array_merge(array(
			'name'       => $name,
			'shortname'  => $symbol,
			'country_id' => $countryId
		), $this->othersAttributesArray());
	}

	/**
	 * @return \Faker\Generator
	 */
	public function getFake()
	{
		return $this->fake;
	}

	/**
	 * @param $countryId
	 * @param $name
	 * @param $symbol
	 *
	 * @return array
	 */
	public function createRecordCurrency($countryId,$name,$symbol)
	{
		return $this->create_Currency($countryId,$name,$symbol);
	}

}

/** 1/8/14 **/ 
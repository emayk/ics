<?php

namespace Emayk\Ics\Support\Dummy;

use \Faker;



/**
 * Class Dummy
 *
 * @package Emayk\Ics\Support\Dummy
 *
 * @property string name
 * @property string firstName
 * @property string lastName
 *
 * @property string citySuffix
 * @property string streetSuffix
 * @property string buildingNumber
 * @property string city
 * @property string streetName
 * @property string streetAddress
 * @property string postcode
 * @property string address
 * @property string country
 * @property float latitude
 * @property float longitude
 *
 * @property string phoneNumber
 *
 * @property string company
 * @property string companySuffix
 *
 * @property string creditCardType
 * @property string creditCardNumber
 * @property string creditCardExpirationDate
 * @property string creditCardExpirationDateString
 * @property string creditCardDetails
 * @property string bankAccountNumber
 *
 * @property string word
 * @method string words
 * @method string sentence
 * @method string sentences
 * @method string paragraph
 * @method string paragraphs
 * @method string text
 *
 * @property string email
 * @property string safeEmail
 * @property string freeEmail
 * @property string companyEmail
 * @property string freeEmailDomain
 * @property string safeEmailDomain
 * @property string userName
 * @property string domainName
 * @property string domainWord
 * @property string tld
 * @property string url
 * @property string ipv4
 * @property string ipv6
 *
 * @property int unixTime
 * @property string dateTime
 * @property string dateTimeAD
 * @property string iso8601
 * @property string dateTimeThisCentury
 * @property string dateTimeThisDecade
 * @property string dateTimeThisYear
 * @property string dateTimeThisMonth
 * @property string amPm
 * @property int dayOfMonth
 * @property int dayOfWeek
 * @property int month
 * @property string monthName
 * @property int year
 * @property int century
 * @property string timezone
 * @method string date
 * @method string time
 * @method string dateTimeBetween
 *
 * @property string md5
 * @property string sha1
 * @property string sha256
 * @property string locale
 * @property string countryCode
 * @property string languageCode
 * @method boolean boolean
 *
 * @property int randomDigit
 * @property int randomDigitNotNull
 * @property string randomLetter
 * @method int randomNumber
 * @method mixed randomKey
 * @method int numberBetween
 * @method float randomFloat
 * @method string randomElement
 * @method string numerify
 * @method string lexify
 * @method string bothify
 * @method string toLower
 * @method string toUpper
 * @method mixed optional
 * @method UniqueGenerator unique
 *
 * @property string userAgent
 * @property string chrome
 * @property string firefox
 * @property string safari
 * @property string opera
 * @property string internetExplorer
 *
 * @property string uuid
 *
 * @property string mimeType
 * @property string fileExtension
 *
 * @property string hexcolor
 * @property string safeHexColor
 * @property string rgbcolor
 * @property string rgbColorAsArray
 * @property string rgbCssColor
 * @property string safeColorName
 * @property string colorName
 */
class Dummy {
	 protected $faker;
	 protected $_address = array("citySuffix", "streetSuffix", "buildingNumber", "city", "streetName", "streetAddress", "postcode", "address", "country", "latitude", "longitude", "randomDigit", "randomDigitNotNull", "randomNumber", "randomFloat", "numberBetween", "randomLetter", "randomElement", "randomKey", "numerify", "lexify", "bothify", "toLower", "toUpper", "optional", "unique");
	 protected $_base = array("randomDigit", "randomDigitNotNull", "randomNumber", "randomFloat", "numberBetween", "randomLetter", "randomElement", "randomKey", "numerify", "lexify", "bothify", "toLower", "toUpper", "optional", "unique");
	 protected $_color = array("hexColor", "safeHexColor", "rgbColorAsArray", "rgbColor", "rgbCssColor", "safeColorName", "colorName", "randomDigit", "randomDigitNotNull", "randomNumber", "randomFloat", "numberBetween", "randomLetter", "randomElement", "randomKey", "numerify", "lexify", "bothify", "toLower", "toUpper", "optional", "unique");
	 protected $_company = array("company", "companySuffix", "randomDigit", "randomDigitNotNull", "randomNumber", "randomFloat", "numberBetween", "randomLetter", "randomElement", "randomKey", "numerify", "lexify", "bothify", "toLower", "toUpper", "optional", "unique");
	 protected $_datetime = array("unixTime", "dateTime", "dateTimeAD", "iso8601", "date", "time", "dateTimeBetween", "dateTimeThisCentury", "dateTimeThisDecade", "dateTimeThisYear", "dateTimeThisMonth", "amPm", "dayOfMonth", "dayOfWeek", "month", "monthName", "year", "century", "timezone", "randomDigit", "randomDigitNotNull", "randomNumber", "randomFloat", "numberBetween", "randomLetter", "randomElement", "randomKey", "numerify", "lexify", "bothify", "toLower", "toUpper", "optional", "unique");
	 protected $_file = array("mimeType", "fileExtension", "randomDigit", "randomDigitNotNull", "randomNumber", "randomFloat", "numberBetween", "randomLetter", "randomElement", "randomKey", "numerify", "lexify", "bothify", "toLower", "toUpper", "optional", "unique");
	 protected $_image = array("imageUrl", "image", "randomDigit", "randomDigitNotNull", "randomNumber", "randomFloat", "numberBetween", "randomLetter", "randomElement", "randomKey", "numerify", "lexify", "bothify", "toLower", "toUpper", "optional", "unique");
	 protected $_internet = array("email", "safeEmail", "freeEmail", "companyEmail", "freeEmailDomain", "safeEmailDomain", "userName", "domainName", "domainWord", "tld", "url", "ipv4", "ipv6", "randomDigit", "randomDigitNotNull", "randomNumber", "randomFloat", "numberBetween", "randomLetter", "randomElement", "randomKey", "numerify", "lexify", "bothify", "toLower", "toUpper", "optional", "unique");
	 protected $_lorem = array("word", "words", "sentence", "sentences", "paragraph", "paragraphs", "text", "randomizeNbElements", "randomDigit", "randomDigitNotNull", "randomNumber", "randomFloat", "numberBetween", "randomLetter", "randomElement", "randomKey", "numerify", "lexify", "bothify", "toLower", "toUpper", "optional", "unique");
	 protected $_miscellaneous = array("boolean", "md5", "sha1", "sha256", "locale", "countryCode", "languageCode", "randomDigit", "randomDigitNotNull", "randomNumber", "randomFloat", "numberBetween", "randomLetter", "randomElement", "randomKey", "numerify", "lexify", "bothify", "toLower", "toUpper", "optional", "unique");
	 protected $_payment = array("creditCardType", "creditCardNumber", "creditCardExpirationDate", "creditCardExpirationDateString", "creditCardDetails", "iban", "addBankCodeChecksum", "randomDigit", "randomDigitNotNull", "randomNumber", "randomFloat", "numberBetween", "randomLetter", "randomElement", "randomKey", "numerify", "lexify", "bothify", "toLower", "toUpper", "optional", "unique");
	 protected $_person = array("name", "firstName", "lastName", "randomDigit", "randomDigitNotNull", "randomNumber", "randomFloat", "numberBetween", "randomLetter", "randomElement", "randomKey", "numerify", "lexify", "bothify", "toLower", "toUpper", "optional", "unique");
	 protected $_phonenumber = array("phoneNumber", "randomDigit", "randomDigitNotNull", "randomNumber", "randomFloat", "numberBetween", "randomLetter", "randomElement", "randomKey", "numerify", "lexify", "bothify", "toLower", "toUpper", "optional", "unique");
	 protected $_useragent = array("macProcessor", "linuxProcessor", "userAgent", "chrome", "firefox", "safari", "opera", "internetExplorer", "windowsPlatformToken", "macPlatformToken", "linuxPlatformToken", "randomDigit", "randomDigitNotNull", "randomNumber", "randomFloat", "numberBetween", "randomLetter", "randomElement", "randomKey", "numerify", "lexify", "bothify", "toLower", "toUpper", "optional", "unique");
	 protected $_uuid = array("uuid", "randomDigit", "randomDigitNotNull", "randomNumber", "randomFloat", "numberBetween", "randomLetter", "randomElement", "randomKey", "numerify", "lexify", "bothify", "toLower", "toUpper", "optional", "unique");
	 function __construct ()
	 {
			$this->faker = Faker\Factory::create();
	 }

	 /**
		* Generator Faker Data
		* @return \Faker\Generator
		*/
	 public function getFaker ()
	 {
			return $this->faker;
	 }

	 public function get(){
			return $this->faker;
	 }

	 /**
		* @return string
		*/
	 public function c(){
			return $this->faker->colorName;
	 }

	 /**
		* Mendapatkan Fungsi Public
		* @param string $className
		* @return array
		*/
	 public  function getColorFunctionToArray($className = '\Faker\Provider\Color'){
			$reflectionClass = new \ReflectionClass($className);
			$methods = $reflectionClass->getMethods(\ReflectionMethod::IS_STATIC | \ReflectionMethod::IS_PUBLIC);
			$method = array();
			foreach ($methods as $m) if ($m->getName() !== '__construct')  $method[] = $m->getName();
			return $method;
	 }

	 protected function SingleClassFuncPublicToArray($class){
			return $this->getColorFunctionToArray($class);
	 }
	 /**
		* get Color
		* @param string $color
		*
		* @return mixed
		*/
	 public  function color($color = 'colorName'){

			$f = (in_array($color,$this->_color)) ? $color : 'colorName';
			return $this->faker->$f;
	 }


	 public  function getAllClassFaker(){
			$classes = array(
				'Address','Base','Color',
				 'Company','DateTime','File','Image','Internet','Lorem',
				 'Miscellaneous','Payment','Person','PhoneNumber','UserAgent',
				 'Uuid'
			);
			$class = array();
			foreach ($classes as $c ){
				 $class['\Faker\Provider\\'.$c] = array(
						$this->SingleClassFuncPublicToArray('\Faker\Provider\\'.$c)
				 );
			}
			return $class;
	 }

	 function __get ($attribute)
	 {

			return $this->faker->format($attribute);
	 }

	 public function __call($method, $attributes)
	 {
			return $this->faker->format($method, $attributes);
	 }

}
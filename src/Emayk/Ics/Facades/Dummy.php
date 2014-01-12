<?php
namespace Emayk\Ics\Facades;
use Illuminate\Support\Facades\Facade as FacadeCore;

/**
 * Class Dummy
 * @package Emayk\Ics\Facades
 */
class Dummy extends FacadeCore {
	 /**
		* Get the registered name of the component.
		*
		* @return string
		*/
	 protected static function getFacadeAccessor() { return 'icsfaker'; }
} 
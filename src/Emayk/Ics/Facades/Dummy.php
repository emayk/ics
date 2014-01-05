<?php
namespace Emayk\Ics\Facades;
use Illuminate\Support\Facades\Facade as FacadeCore;

class Dummy extends FacadeCore {
	 /**
		* Get the registered name of the component.
		*
		* @return string
		*/
	 protected static function getFacadeAccessor() { return 'icsfaker'; }
} 
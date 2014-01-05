<?php namespace Emayk\Ics\Facades;
use Illuminate\Support\Facades\Facade;

class Output extends Facade {

    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor() { return 'icsoutput'; }

}
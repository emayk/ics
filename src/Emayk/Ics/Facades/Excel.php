<?php namespace Emayk\Ics\Facades;
use Illuminate\Support\Facades\Facade;

class Excel extends Facade {

    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor() { return 'excel'; }

}
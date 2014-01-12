<?php namespace Emayk\Ics\Facades;
use Illuminate\Support\Facades\Facade;

/**
 * Class Config
 * @package Emayk\Ics\Facades
 */
class Config extends Facade {

    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor() { return 'icsconfig'; }

}
<?php namespace Emayk\Ics\Facades;
use Illuminate\Support\Facades\Facade;

/**
 * Class Excel
 * @package Emayk\Ics\Facades
 */
class Excel extends Facade {

    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor() { return 'excel'; }

}
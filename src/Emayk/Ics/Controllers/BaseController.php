<?php namespace Emayk\Ics\Controllers;

use Controller;
use Event;
/**
 * Base Controller
 */
class BaseController extends Controller
{
    function __construct()
    {
        $this->beforeFilter(function () {
            Event::fire('clockwork.controller.start');
        });

        $this->afterFilter(function () {
            Event::fire('clockwork.controller.end');
        });

    }

    /**
     * Setup the layout used by the controller.
     *
     * @return void
     */
    protected function setupLayout()
    {
        if (!is_null($this->layout)) {
            $this->layout = View::make($this->layout);
        }
    }

    public function index()
    {
        $logged = \Session::get('logged');
        return \View::make('ics::home.index', compact('logged'));
    }

    public function missingMethod($parameters = array())
    {
        return 'Missing Method' . var_dump($parameters);
    }
}
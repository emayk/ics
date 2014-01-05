<?php namespace Emayk\Ics\Controllers;
use \Controller;

/**
* Base Controller
*/
class BaseController extends Controller {
    /**
     * Setup the layout used by the controller.
     *
     * @return void
     */
    protected function setupLayout()
    {
        if ( ! is_null($this->layout))
        {
            $this->layout = View::make($this->layout);
        }
    }

	public function index()
	{
    $logged = \Session::get('logged');
    // $versions = file_get_contents(url('/versi.json'));
    // $version = json_decode($versions);
    // $versi = $version->version;

    // return \View::make('ext.home', compact('logged') );
    // return Redirect::to('v1');
        return \View::make('ics::home.index',compact('logged'));
	}

    public function missingMethod($parameters = array())
    {
        return 'Missing Method'. var_dump($parameters);
    }
}
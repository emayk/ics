<?php namespace Emayk\Ics\Controllers;

use Controller;
use Event;
use Input;

/**
 * Base Controller
 */
class BaseController extends Controller
{
	/*	function __construct()
		{
			$this->beforeFilter(function () {
				Event::fire('clockwork.controller.start');
			});

			$this->afterFilter(function () {
				Event::fire('clockwork.controller.end');
			});

		}*/

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
		$theme  = Input::get('theme', 0);
		$theme  = intval($theme);
		$theme  = ( !is_int($theme) ) ? 0 : $theme;
		$themes = array('ext-all', 'ext-all-gray');
		$dev    = Input::get('dev', false);

//		if (!Input::has('dev')) {
		if (!$dev) {
			$devjs = 'app.js';
			$title = \Icsconfig::getAppName();
			$modedev = 'false';
		} else {
			$devjs = 'app-dev.js';
			$title = 'Development';
			$modedev = 'true';
		};

		if ($theme > ( count($themes) - 1 )) $theme = 0;
		$selectedtheme = $themes[ $theme ];

		if (!$logged){
			/*Jika belum Login*/
			return \View::make('ics::home.login', compact('logged', 'selectedtheme', 'devjs', 'title'));
		};

		/*Apakah Dev ?*/
			return \View::make('ics::home.index', compact('logged', 'selectedtheme', 'devjs', 'title','modedev'));
	}

	public function missingMethod($parameters = array())
	{
		return 'Missing Method' . var_dump($parameters);
	}
}
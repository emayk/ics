<?php namespace Emayk\Ics\View;

use \View as CoreView;
use Config;

/**
 * View Class
 */
class View implements ViewInterface
{
	/**
	 * @var array
	 */
	protected $assets = array();
	/**
	 * @var
	 */
	protected $baseUrl;
	/**
	 * @var string
	 */
	protected $baseRouteName = 'icsroot';
	/**
	 * @var string
	 */
	protected $apiroutename = 'service';

	/**
	 * @return mixed
	 */
	public function getBaseUrl()
	{
		return CoreView::get('ics::path.baseUrl');
	}

	/**
	 * @param $key
	 *
	 * @return mixed
	 */
	protected function get($key)
	{
		return Config::get('ics::' . $key);
	}

	/**
	 * @param $view
	 *
	 * @return \Illuminate\View\View
	 */
	public function make($view)
	{
		return CoreView::make('ics::' . $view);
	}

	/**
	 * @param string $asset
	 *
	 * @return string
	 */
	public function asset($asset = '')
	{
		return asset('packages/emayk/ics/' . $asset);
	}

	/**
	 * Mendapatkan Path Extjs dari Config
	 * @return mixed
	 */
	protected function getAssetExtjs()
	{
		return $this->get('path.extjs');
	}

	/**
	 *
	 */
	public function getPackageAsset()
	{
		$b = $this->getBaseUrl();
	}

	/**
	 * @return string
	 */
	protected  function extjs_link()
	{
		return url($this->getAssetExtjs());
	}

	/**
	 *
	 * @param string $path
	 *
	 *
	 * @return string
	 */
	public function extjsasset($path = '')
	{
		$pathjs = (null == $path) ? $this->getAssetExtjs() : $this->getAssetExtjs().'/'.$path .'/';
		return $this->getUrl($pathjs);
	}

	/**
	 * Mendapatkan Session Timeout dari Laravel Env
	 * @return mixed
	 */
	public function getSessionTimeOut(){
		$timeout = \Config::get('session.lifetime');
		return ($timeout);
	}

	/**
	 * @param $value
	 *
	 * @return mixed
	 */
	public function addAsset($value)
	{
		return $this->assets[ ] = $value;
	}

	/**
	 * @param       $path
	 * @param array $parameters
	 * @param bool  $secure
	 *
	 * @return string
	 */
	public function getUrl($path,array $parameters = array() ,$secure = false )
	{
		return url($path,$parameters,$secure);
	}

	/**
	 * @return string
	 */
	public function linkBaseUrl()
	{
		return route('icsroot');
	}


	/**
	 * @return string
	 */
	public function  routeBase()
	{
		return $this->route($this->baseRouteName);
	}

	/**
	 * @param       $route
	 * @param array $parameters
	 *
	 * @return string
	 */
	public function route($route,array $parameters = array())
	{
		return route($route,$parameters);
	}
	/**
	 * Mendapatkan Link dari Nama route yang diberikan
	 *
	 * cth :
	 * Icsview::linkToRoute('api','Api',array('api' => 1, 'key' = uniqid() );
	 *
	 * @param       $name
	 * @param null  $title
	 * @param array $parameters
	 * @param array $attributes
	 *
	 * @return string
	 */
	public function linkToRoute($name, $title = null, $parameters = array(), $attributes = array())
	{
		return link_to_route($name, $title, $parameters, $attributes);
	}

}
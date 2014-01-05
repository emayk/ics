<?php namespace Emayk\Ics\View;
use \View as CoreView;
/**
* View Class
*/
class View implements ViewInterface
{
	protected $assets = array();
	public function make($view)
	{
		return CoreView::make('ics::'.$view);
	}

	public function asset($asset='')
	{
		return asset('packages/emayk/ics/'.$asset);
	}
	public function addAsset($value)
	{
		return $this->assets[] = $value;
	}
}
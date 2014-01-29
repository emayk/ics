<?php namespace Emayk\Ics\Config;
use Emayk\Ics\Config\ConfigInterface;
use \Config as CoreConfig;
/**
* Class Config For Ics
*/
class Config implements ConfigInterface
{
	/**
	 *
	 * Mendapatkan Config Aplikasi
	 *
	 * @param string $value Value yang dicari
	 *
	 **@return mixed
	 */
	public function get($value){
		return CoreConfig::get('ics::'.$value);
	}

	public function getProgrammer()
	{
		return $this->get('programmer');
	}

	public function getAppname()
	{
		return $this->get('appName');
	}

	public function getRoot()
	{
		return $this->get('prefix_url');
	}

	public function getLicense()
	{
		 $license = \DB::table('master_settings_program')->where('id',1)->pluck('name');
		return (!empty($license)) ? $license : $this->get('license');

	}

	public function getVersion()
	{
		return $this->get('versi.versi');
	}


}


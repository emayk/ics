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
		$file = __DIR__.'/version';
		$version =  (file_exists($file))  ? file_get_contents($file) : 'no have version';
		return trim($version);
	}

public function getChangeLog()
{
list($version, $changes) = $this->getChangeVersion($this->getChangesArray());
$out = [];
		foreach ($changes as $change)
		{
			$out[] = $change;
		}
		return \Response::json(['results' => $out[0] ]);
}

protected function getChangesArray()
{
	return json_decode(file_get_contents(__DIR__.'/changeslog.json'), true);
}
protected function getChangeVersion(array $changes)
	{

		// if (is_null($version))
		// {
			// $latest = head(array_keys($changes));

			// return array($latest, $changes[$latest]);

		// }
		// else
		// {
			return array('version', $changes);
		// }
	}

}


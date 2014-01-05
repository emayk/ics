<?php namespace Emayk\Ics\Message\Pusher;
use \Pusher as CorePusher;
use \Config;
use Emayk\Ics\Message\MessageInterface;
use Emayk\Ics\Message\Message;
/**
* Class Pusher
*/
class Pusher extends Message implements MessageInterface
{
	protected $pusher;
	protected $id;
	protected $secret;
	protected $key;
	protected $about = 'Pusher Message System';

	function __construct()
	{
		$this->settings();
		$this->pusher = new CorePusher(
		                            $this->key,
		                            $this->secret,
		                            $this->id
		                            );

	}


	public function send($msg,$channel='ics_channel',$event='ics_event')
	{
		$this->pusher->trigger($channel,$event,$msg);
	}


	public function sentToChannel($channel,$msg)
	{
		$this->send($msg,$channel,'ics_event');
	}


	public function getAppId()
	{
		return $this->id;
	}

	public function getKey()
	{
		return $this->key;
	}

	public function getSecret()
	{
		return $this->secret;
	}

	protected function getSetting($key)
	{
		return IcsConfig::get('pusher.'.$key);
	}

	/**
	*
	* Mendapatkan Setting Pusher dari Config
	*
	**/

	protected function settings(){
			$settings = Config::get('ics::pusher');
			$this->id = $settings['id'];
			$this->key = $settings['key'];
			$this->secret = $settings['secret'];
	}

	public function about()
	{
		$this->sentToChannel('my_about','hi im about '.time());
		return $this->about;
	}

	public function getConfig(){
		return (Config::get('ics::pusher'));
	}
}
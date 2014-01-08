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
	/**
	 * @var \Pusher
	 */
	protected $pusher;
	/**
	 * @var
	 */
	protected $id;
	/**
	 * @var
	 */
	protected $secret;
	/**
	 * @var
	 */
	protected $key;
	/**
	 * @var string
	 */
	protected $about = 'Pusher Message System';

	/**
	 *
	 */
	function __construct()
	{
		$this->settings();
		$this->pusher = new CorePusher(
			$this->key,
			$this->secret,
			$this->id
		);

	}


	/**
	 * @param        $msg
	 * @param string $channel
	 * @param string $event
	 */
	public function send($msg, $channel = 'ics_channel', $event = 'ics_event')
	{
		$this->pusher->trigger($channel, $event, $msg);
	}


	/**
	 * @param $channel
	 * @param $msg
	 */
	public function sentToChannel($channel, $msg)
	{
		$this->send($msg, $channel, 'ics_event');
	}


	/**
	 * @return mixed
	 */
	public function getAppId()
	{
		return $this->id;
	}

	/**
	 * @return mixed
	 */
	public function getKey()
	{
		return $this->key;
	}

	/**
	 * @return mixed
	 */
	public function getSecret()
	{
		return $this->secret;
	}

	/**
	 * @param $key
	 *
	 * @return mixed
	 */
	protected function getSetting($key)
	{
		return IcsConfig::get('pusher.' . $key);
	}

	/**
	 *
	 * Mendapatkan Setting Pusher dari Config
	 *
	 **/

	protected function settings()
	{
		$settings     = Config::get('ics::pusher');
		$this->id     = $settings[ 'id' ];
		$this->key    = $settings[ 'key' ];
		$this->secret = $settings[ 'secret' ];
	}

	/**
	 * @return string
	 */
	public function about()
	{
		$this->sentToChannel('my_about', 'hi im about ' . time());
		return $this->about;
	}

	/**
	 * @return mixed
	 */
	public function getConfig()
	{
		return ( Config::get('ics::pusher') );
	}
}
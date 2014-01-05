<?php namespace Emayk\Ics\Message\Pusher;
/**
* Pusher
*/
class Channel
{
	protected $data ;
	public function getSettings()
	{
		return array(
		             'channel' => 'ics'
		             )
	}
}
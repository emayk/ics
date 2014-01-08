<?php namespace Emayk\Ics\Message\Pusher;
/**
 * Pusher
 */
/**
 * Class Channel
 *
 * @package Emayk\Ics\Message\Pusher
 */
class Channel
{
	/**
	 * @var
	 */
	protected $data;

	/**
	 * @return array
	 */
	public function getSettings()
	{
		return array('channel' => 'ics');
	}
}
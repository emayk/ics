<?php namespace Emayk\Ics\Message;

use Emayk\Ics\Message\MessageInterface;
use Emayk\Ics\Message\Message;

/**
 * Message Array
 */
class MessageArray extends Message implements MessageInterface
{
	protected $about = 'Message Array System';

	public function send($channel, $event, $msg)
	{
		return array('channel' => $channel, 'event' => $event, 'msg' => $msg);
	}

	public function about()
	{
		return $this->about;
	}
}
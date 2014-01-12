<?php namespace Emayk\Ics\Message;

use Emayk\Ics\Message\MessageInterface;
use Emayk\Ics\Message\Message;

/**
 * Message Array
 */
class MessageArray extends Message implements MessageInterface
{
    /**
     * @var string
     */
    protected $about = 'Message Array System';

    /**
     * @param $channel
     * @param $event
     * @param $msg
     * @return array
     */
    public function send($channel, $event, $msg)
	{
		return array('channel' => $channel, 'event' => $event, 'msg' => $msg);
	}

    /**
     * @return string
     */
    public function about()
	{
		return $this->about;
	}
}
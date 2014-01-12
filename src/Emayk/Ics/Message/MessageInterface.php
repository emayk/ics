<?php namespace Emayk\Ics\Message;

/**
 * Interface MessageInterface
 * @package Emayk\Ics\Message
 */
interface MessageInterface
{
	/**
	 *
	 * Mengirimkan Pesan
	 *
	 **/
	public function send($channel, $event, $msg);
}
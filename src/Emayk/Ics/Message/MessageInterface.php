<?php namespace Emayk\Ics\Message;

interface MessageInterface
{
	/**
	 *
	 * Mengirimkan Pesan
	 *
	 **/
	public function send($channel, $event, $msg);
}
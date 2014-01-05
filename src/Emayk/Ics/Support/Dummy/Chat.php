<?php

namespace Emayk\Ics\Support\Dummy;

use \Ratchet\MessageComponentInterface;
use \Ratchet\ConnectionInterface;

class Chat implements MessageComponentInterface {
	 protected $clients;

	 public function __construct() {
			$this->clients = new \SplObjectStorage;
	 }

	 public function onOpen(ConnectionInterface $conn) {
			$this->clients->attach($conn);
	 }

	 public function onMessage(ConnectionInterface $from, $msg) {
			$this->sendLog($msg);

			foreach ($this->clients as $client) {
				 if ($from != $client) {
						$client->send($msg);
				 }
			}
	 }

	 protected function sendLog($msg){
		 return \Log::info($msg);
	 }

	 public function onClose(ConnectionInterface $conn) {
			$this->clients->detach($conn);
	 }

	 public function onError(ConnectionInterface $conn, \Exception $e) {
			$conn->close();
	 }
} 
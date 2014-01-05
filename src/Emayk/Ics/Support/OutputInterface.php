<?php namespace Emayk\Ics\Support;

interface OutputInterface {
	public function toArray($obj);
	public function msgSuccess(array $data);
}
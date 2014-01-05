<?php


namespace Emayk\Ics\Support\Dummy;


class Address implements  DataInterface{
	protected $faker;
	 function __construct ()
	 {
			$faker = new \Faker\Factory();
			$this->faker = $faker::create();
	 }

	 /**
		* @return mixed
		*/
	 public function getFaker ()
	 {
			return $this->faker;
	 }

	 public function render ()
	 {
			return $this->faker->address;
	 }

} 
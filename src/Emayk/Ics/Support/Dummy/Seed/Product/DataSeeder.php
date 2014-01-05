<?php
namespace Emayk\Ics\Support\Dummy\Seed\Product;
use \Seeder;
use \Faker;
class DataSeeder extends Seeder {
	 protected $namespace;
	 protected $faker;
	 public function  __construct ()
	 {
			$this->namespace = __NAMESPACE__;
			$this->faker = \Faker\Factory::create();
	 }

	 /**
		* @return \Faker\Generator
		*/
	 public function getFaker ()
	 {
			return $this->faker;
	 }

	 /**
		* @return string
		*/
	 public function getNamespace ()
	 {
			return $this->namespace;
	 }

	 /**
		* Run the database seeds.
		*
		* @return void
		*/
	 public function run()
	 {
			Eloquent::unguard();
			$this->seed('Product');
	 }

	 protected function seed($class)
	 {
			$class = $this->namespace.'\\'.$class;
			$this->call($class);
	 }
} 
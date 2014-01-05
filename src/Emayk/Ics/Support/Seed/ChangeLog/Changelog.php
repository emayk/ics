<?php
	 namespace Emayk\Ics\Support\Seed\ChangeLog;

	 use Carbon\Carbon;
	 use \Illuminate\Database\Seeder;
	 use \DB;

	 /**
		*
		* Class Changelog
		*
		* Catatan Penambahan Feature
		* @package Emayk\Ics\Support\Seed\ChangeLog
		*/
	 class Changelog extends Seeder
	 {
			/**
			 *
			 */
			public function run ()
			{
				 DB::table ('sys_changelog')->truncate ();
				 		$sys_changelog = $this->data ();
				 DB::table ('sys_changelog')->insert ($sys_changelog);
			}

			/**
			 * @return array
			 */
			protected function data ()
			{
				 $data = array ();
				 foreach ($this->desc () as $desc) {
						$data[] = array ('description' => $desc,
														 'created_at'  => $this->time (),
														 'updated_at'  => $this->time ()
						);
				 }

				 return $data;

			}

			/**
			 * @return Carbon
			 */
			protected function time ()
			{
				 return Carbon::create ();
			}

			/**
			 * @return array
			 */
			protected function desc ()
			{
				 return array (
						'Menambahkan Generator Data',
						'Menambahkan Beberapa Feature 2',
				 );
			}

			/**
			 *
			 */
			public static function generate ()
			{
				 return self::run ();
			}
	 }
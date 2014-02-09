<?php namespace Emayk\Ics\Repo\Menu;

use \Icsoutput;
use Master_menusTableSeeder;

class MenuEloquent implements MenuInterface
{
	 protected $menu;

	 function __construct (Menu $menu)
	 {
			$this->menu = $menu;
	 }

	 /**
		*
		* Mendapatkan Root Menu
		*
		**/
	 public function getRoot ()
	 {
			if ($this->menu->count () == 0) {
				 $this->seederData ();

			}

			/**
			 * todo : sementara di trigger dari load menu
			 *
			 * harusnya disimpan saat applikasi boot.
			 */
//
//			if (\DB::table ('sys_changelog')->count () == 0) {
//				 $changelog = new \Emayk\Ics\Support\Seed\ChangeLog\Changelog();
//				 $changelog->run ();
//			}

			return Icsoutput::json ($this->menu->build ());
	 }

	 protected function seederData ()
	 {
			$seed = new Master_menusTableSeeder();
			$seed->run ();
	 }

	 /**
		*
		* Mendapatkan Menu berdasarkan ID
		*
		**/

	 public function getBy ($id)
	 {
			$menu = $this->menu->find ($id);

			return Icsoutput::json ($menu);
	 }

	 /**
		*
		* Membuat Menu
		*
		**/
	 public function create (array $data)
	 {
			//todo : menambahkan menu
	 }

}

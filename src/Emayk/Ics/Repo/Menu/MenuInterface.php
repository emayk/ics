<?php namespace Emayk\Ics\Repo\Menu;
interface MenuInterface {
		/**
		*
		* Mendapatkan Root Menu
		*
		**/
		public function getRoot();
		/**
		*
		* Mendapatkan Menu berdasarkan ID
		*
		**/

		public function getBy($id);
		/**
		*
		* Membuat Menu
		*
		**/
		public function create(array $data);
}
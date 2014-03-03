<?php
/**
 * Copyright (C) 2013  Emay Komarudin
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * @author Emay Komarudin
 *
 **/


namespace Emayk\Ics\Repo\Transaction\Prints;


use Emayk\Ics\Models\BaseModel;


/**
 * Class Eloquent
 *
 * @package Emayk\Ics\Repo\Transaction\Prints
 */
class Eloquent extends BaseModel
{
	/**
	 * @var string
	 */
	protected $table = 'sys_print_doc';
	/**
	 * @var array
	 */
	protected $guarded = [];
	/**
	 * @param $id
	 * @param $key
	 * @param $number
	 *
	 * @return string
	 */
//	public function templateDocument($id, $key, $number)
//	{
//		/**
//		 * Check ID
//		 */
//		$record = $this->whereTrxkey($key);
//		if ($record->count() > 0) {
//			$template = $record->get()->templateblade;
//			if (empty( $template )) {
//				return null;
//			}
//			return $template;
//		} else {
//			return null;
//		}
//	}

	/**
	 * @param string $key
	 * @param int    $id
	 * @param string $number
	 *
	 * @param        $preview
	 *
	 * @return string File Blade
	 */
	public function document($key = '', $id = 0, $number = '',$preview = true)
	{
//		$object = $this->getObjectByKey($key);
		$object = $this->oPrints()->getObjectByKey($key);
		return $object->prints($id, $number,$preview);
	}

	protected function oPrints()
	{
		return new Prints();
	}

	/**
	 * @param $key
	 *
	 * @return Eloquent|Receive\Product
	 */
//	protected function getObjectByKey($key)
//	{
//		switch ($key) {
//			case 'bpb' :
//				$o = $this->getProductReceive();
//				break;
//			default:
//				$o = $this;
//		}
//		return $o;
//	}

	/**
	 * @return Receive\Product
	 */
//	protected function  getProductReceive()
//	{
//		return new Receive\Product();
//	}

	/**
	 * Mengirimkan Document Null
	 *
	 * @return string
	 */
//	protected function  documentNull()
//	{
//		return $this->getFileBlade('Empty');
//
//	}

	/**
	 * @param $file
	 *
	 * @return string
	 */
//	protected function getFileBlade($file)
//	{
//		return $this->getNameWorkshope() . '::Print.' . $file;
//	}

	/**
	 * @param       $fileBlade
	 * @param array $data
	 *
	 * @return \Illuminate\View\View
	 */
//	public function generateView($fileBlade, array $data)
//	{
//		return View::make($this->getFileBlade($fileBlade), $data);
//	}

	/**
	 * Print Document
	 * @param      $id ID receive
	 * @param      $number Nomor Transaksi
	 * @param bool $preview Mode Preview
	 *
	 * @return \Illuminate\View\View
	 */
//	public function prints($id,$number,$preview = true)
//	{
//		$data = 'Null';
//		$idk = $id;
//		$number = $number;
//		return $this->generateView('Empty', [$data]);
//	}
}

 
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


use Emayk\Ics\Controllers\BaseLogic;
use View;

class Prints extends BaseLogic
{
	protected $nameWorkshope = 'ics';

	/**
	 * @return string
	 */
	public function getNameWorkshope()
	{
		return $this->nameWorkshope;
	}

	/**
	 * @param string $key
	 * @param int    $id
	 * @param string $number
	 *
	 * @param        $preview
	 *
	 * @return string File Blade
	 */
	public function document($key = '', $id = 0, $number = '', $preview = true)
	{
		$object = $this->getObjectByKey($key);
		return $object->prints($id, $number, $preview);
	}

	/**
	 * @param $key
	 *
	 * @return Eloquent|Receive\Product
	 */
	public function getObjectByKey($key)
	{
		switch ($key) {
			/**
			 * Cetak Resume Bukti Penerimaan barang
			 *
			 */
			case 'bpb' :
				$o = $this->getProductReceive();
				break;
			/**
			 * Cetak PO
			 */
			case 'po' :
				$o = $this->getPurchaseOrder();
				break;
			/**
			 * Cetak Item History
			 * Barang yang diterima
			 */
			case 'bpbitemhistory' :
				$o = new Receive\ItemHistory();
				break;
			default:
				$o = $this;
		}
		return $o;
	}

	/**
	 * @return Receive\Product
	 */
	protected function  getProductReceive()
	{
		return new Receive\Product();
	}

	protected function getPurchaseOrder(){
		return new Purchase\Order();
	}
	/**
	 * Mengirimkan Document Null
	 *
	 * @return string
	 */
	protected function  documentNull()
	{
		return $this->getFileBlade('Empty');

	}

	/**
	 * @param $file
	 *
	 * @return string
	 */
	protected function getFileBlade($file)
	{
		return $this->getNameWorkshope() . '::Print.' . $file;
	}

	/**
	 * @param       $fileBlade
	 * @param array $data
	 *
	 * @return \Illuminate\View\View
	 */
	public function generateView($fileBlade, array $data)
	{
		return View::make($this->getFileBlade($fileBlade), $data);
	}

	/**
	 * Print Document
	 *
	 * @param      $id      int receive
	 * @param      $number  String Transaksi
	 * @param bool $preview Mode Preview
	 *
	 * @return \Illuminate\View\View
	 */
	public function prints($id, $number, $preview = true)
	{
		$data   = 'Null';
		$idk    = $id;
		$number = $number;
		return $this->generateView('Empty', [$data]);
	}
}

 
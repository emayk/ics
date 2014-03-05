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


namespace Emayk\Ics\Repo\Transaction\Prints\Receive;

use Emayk\Ics\Repo\Factory\Product\Eloquent as ModelProduct;
use Emayk\Ics\Repo\Transaction\Prints\Prints;
use Emayk\Ics\Repo\Transaction\Receive\Product\History;
use Response;

/**
 * Class ItemHistory
 *
 * @package Emayk\Ics\Repo\Transaction\Prints\Receive
 *
 * @startuml
 * title Hierarcy Class Print Item History
 * BaseController <|-- BaseInput
 * BaseInput <|-- BaseLogic
 * BaseLogic <|-- Prints
 * Prints <|-- ItemHistory
 *
 * @enduml
 */
class ItemHistory extends Prints
{
	protected $key = 'itemhistory';

	public function prints($id, $number, $preview = true)
	{

		/**
		 * UML
		 *
		 * @startuml
		 * (*) --> Checking Record
		 * if (ada) then
		 * --> Code 404
		 * --> [Tidak] Sent to Client
		 * else
		 * note right: Record ada
		 * --> Mode Preview
		 * endif
		 *
		 *
		 * if isPreview then
		 * --> Code 200
		 * --> [Ya] Sent to Client
		 * else
		 * if print>2x then
		 * note left
		 *    Jika Sudah diprint
		 *    sebelumnya lebih 2x
		 * endnote
		 * --> Code 500
		 * --> [Ya] Sent to Client
		 * else
		 * --> [Tidak] Proses Tambah History
		 * --> Tambah Stock Product History
		 * note right
		 *    Tambahkan Stock
		 *    Product History
		 * endnote
		 * --> Update Total Stock
		 * note right
		 *    Tambahkan Stock
		 * endnote
		 * --> Update Item History
		 * note right
		 *    Update record item
		 *    history
		 * endnote
		 * --> Update Barang & Harga
		 * note left
		 *  Update data barang
		 *  dan harga ke Management
		 * end note
		 * endif
		 * endif
		 *
		 * --> Sent to Client
		 * --> (*)
		 * @enduml
		 */

		/**
		 * Jika Bukan Preview
		 * Update Status Printed
		 */
		$itemhistoryObj = $this->getItemHistory();
		$record         = $itemhistoryObj->findOrFail($id);
		$order          = $record->item->receive->order;
		if ($preview == "false") {
			if ($record->cntprint > 2) {
				$out = ['success' => false, 'reason' => 'Sudah diprint lebih dari 2x'];
				return Response::json($out, 500);
			}

			/**
			 * Lakukan Penambahan Stock dari Product_id yang didapatkan
			 */

			/*Jika sudah diprint tidak usah ditambahkan lagi*/
			if ($record->printed == 0)
				$this->processAddStockProduct($record);

			$record->setPrinted();
			$record->addCountPrint();
			$record->save();


		}
		return $this->generateView('Receive.ItemHistory', compact(
			'itemhistory',
			'record',
			'order'
		));
	}


	protected function getItemHistory()
	{
		return new History();
	}

	protected function getProduct()
	{
		return new ModelProduct();
	}

	protected function processAddStockProduct(
		\Emayk\Ics\Repo\Transaction\Receive\Product\History $recordItemHistory)
	{
		/*Menambahkan Product dari Item History*/

		$qtyIn     = $recordItemHistory->qty;
		$qtyrollIn = $recordItemHistory->qtyroll;
		$sjId      = $recordItemHistory->sj_id;

		$totalqty    = $recordItemHistory->getTotalQtyReceived(); //?
		$receivedate = $recordItemHistory->receivedate;
		$totalroll   = $recordItemHistory->getTotalRollReceived();
		$createby_id = $recordItemHistory->getReceiveBy(); //
		$trxnumber   = $recordItemHistory->trxnumber;

		/**
		 * Jika Product Stock Belum ada
		 */
		$product = $recordItemHistory->product;
		if (is_null($product->stock)) {
			$totalqty  = 0;
			$totalroll = 0;
			$oStock    = new \Emayk\Ics\Repo\Factory\Product\Stock\Eloquent();
			$stock     = $oStock->add($product,
				$totalqty,
				$totalroll,
				$createby_id
			);
		} else {
			$stock = $recordItemHistory->product->stock;
		}


		$StockHistory = new \Emayk\Ics\Repo\Factory\Product\Stock\History();
		$refDoc       = $StockHistory->getRefDoc() . $trxnumber;
		$noRoll       = $StockHistory->getNextNoroll();

		$StockHistory->addrecord(
			$stock, $refDoc,
			$noRoll, $qtyIn,
			0, 0,
			$qtyrollIn,
			$recordItemHistory->qtyreceived,
			$recordItemHistory->qtyrollreceived,
			$receivedate,
			$createby_id, $sjId
		);

	}

	/**
	 * Update Prepare Payment
	 * Daftar Barang yang harus dibayar
	 * oleh bag keuangan
	 */


	/**
	 * Update Data barang dan harga
	 * di bagian Management.
	 * (Buat History Harga)
	 */
}

 
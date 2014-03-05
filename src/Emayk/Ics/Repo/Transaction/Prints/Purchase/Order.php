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


namespace Emayk\Ics\Repo\Transaction\Prints\Purchase;

use Emayk\Ics\Repo\Transaction\Prints\Prints;

/**
 * Class Order
 *
 * @package Emayk\Ics\Repo\Transaction\Prints\Purchase
 */
class Order extends Prints
{
	/**
	 * @var string
	 */
	protected $key = 'po';

	/**
	 * @param \Emayk\Ics\Repo\Transaction\Prints\ID    $id
	 * @param \Emayk\Ics\Repo\Transaction\Prints\Nomor $number
	 * @param bool                                     $preview
	 *
	 * @return \Illuminate\View\View
	 */
	public function prints($id, $number, $preview = true)
	{
		$order= $this->getOrder();
		$record  = $order->findOrFail($id);
		/**
		 * Jika Bukan Preview
		 * Update Status Printed
		 */
		/**
		 * Jika sudah pernah di print ,
		 * kasih template yang berbeda
		 */
		$fileview = 'Purchase.Order';

		if ($preview == "false") {
			/*Original*/
			/**
			 * Pindahkan Record Order Ke Waiting List Terima Barang
			 */
//			$order = new \Emayk\Ics\Repo\Transaction\Purchase\Order\Eloquent();
//			$order   = $this->getOrder();
			$printed = ( $record->printed == 1 );
			/*Update Database dengan record yang ditentukan*/
			if (!$printed) $record->printed = 1;
			$record->increment('cntprint');
			$record->save();
			/**
			 * Kirim Order ke Terima Barang
			 */
			$order->moveOrderToReceiveGood($record);
		}
		return $this->generateView($fileview, compact('record'));
	}

	public function getOrder()
	{
		return new \Emayk\Ics\Repo\Transaction\Purchase\Order\Eloquent();
	}

}

 
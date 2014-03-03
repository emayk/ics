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
class Order extends Prints {
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
		$record = new \stdClass();
		$record->id = $id;
		$record->number = $number;
		/**
		 * Jika Bukan Preview
		 * Update Status Printed
		 */
		if (!$preview) {
			/*Update Database dengan record yang ditentukan*/
		}
		return $this->generateView('Purchase.Order', compact('record'));
	}
}

 
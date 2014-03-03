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

//use \Emayk\Ics\Repo\Transaction\Prints\Eloquent;
use \Emayk\Ics\Repo\Transaction\Prints\Prints;

/**
 * Class Product
 *
 * @package Emayk\Ics\Repo\Transaction\Prints\Receive
 */
//class Product extends Eloquent
class Product extends Prints
{
	/**
	 * @var string
	 */
	public $key = 'bpb';

	/**
	 * Mendapatkan Object Product Receive
	 *
	 * @return \Emayk\Ics\Repo\Transaction\Receive\Product\Model
	 */
	protected function getReceive()
	{
		return new \Emayk\Ics\Repo\Transaction\Receive\Product\Model();
	}


	/**
	 * Melakukan Print atau Preview Print
	 *
	 * @param \Emayk\Ics\Repo\Transaction\Prints\ID    $id
	 * @param \Emayk\Ics\Repo\Transaction\Prints\Nomor $number
	 * @param bool                                     $preview
	 *
	 * @return \Illuminate\View\View
	 */
	public function prints($id, $number, $preview = true)
	{
		$receive = $this->getReceive();
		$record  = $receive->findOrFail($id);
		/**
		 * Jika Bukan Preview
		 * Update Status Printed
		 */
		if (!$preview) {
			/*Update Database dengan record yang ditentukan*/
		}
		return $this->generateView('Receive.Product', compact('record'));
	}
}

 
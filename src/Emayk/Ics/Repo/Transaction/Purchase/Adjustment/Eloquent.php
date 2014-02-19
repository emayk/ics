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



namespace Emayk\Ics\Repo\Transaction\Purchase\Adjustment;

use Emayk\Ics\Models\BaseModel;


/**
 * Class Eloquent
 *
 * @package Emayk\Ics\Repo\Transaction\Purchase\Adjustment
 */
class Eloquent extends BaseModel{
	/**
	 * @var array
	 */
	protected $guarded = array();
	/**
	 * @var string
	 */
	protected $table = 'trans_pr_adjustment';
	/**
	 * @var array
	 */
	public static $rules = array();
	/**
	 * @var array
	 */
	public $hidden = ['price'];
	/**
	 * @var array
	 */
	public $appends = [
		'productimg','productname'
	];


	/**
	 * Mendapatkan Transaksi Number
	 *
	 * @return mixed
	 */
	protected function getNumber(){
		return $this->trxnumber;
	}

	public function getSupplier()
	{
		return new Item\Supplier();
	}

	public function getContact()
	{
		return new Item\Contact();
	}
	public function getProduct()
	{
		return new Item\Product();
	}

	public function getWarehouse()
	{
		return new Item\Warehouse();
	}
}

 
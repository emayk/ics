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


namespace Emayk\Ics\Repo\Factory\Prefix;

use Emayk\Ics\Models\BaseModel;

class Eloquent extends BaseModel
{
	protected $table = 'master_prefix_doc';
	protected $ppn = 'PPN-';
	protected $nonppn = 'NonPPN-';

	public  function getPO()
	{
		/*@todo : ganti dengan nama value di db*/
		return 'PO-';
	}

	public function getPR()
	{
		return 'PR-';
	}

	/**
	 * @return string
	 */
	public function getPpn()
	{
		return $this->ppn;
	}

	/**
	 * @return string
	 */
	public function getNonppn()
	{
		return $this->nonppn;
	}

	public function receivegood(){
		return 'RG-';
	}

	public function stockcardhistory()
	{
		/**
		 * Stock History
		 */
		return $this->stockcard().'-History-';
	}

	public function stockcard()
	{
		/**
		 * Stock
		 */
		return 'StockPrd-';
	}
}

 
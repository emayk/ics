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


namespace Emayk\Ics\Repo\Transaction\Purchase\Order\Item;

use Emayk\Ics\Models\BaseModel;

class Eloquent extends BaseModel
{
	protected $guarded = array();
	protected $table = 'trans_order_details';
	protected $prefix = [
		'ppn'    => 'PpnPO-',
		'nonppn' => 'NonPPN-PO-'
	];
	public static $rules = array();

	public function order()
	{
		return $this->belongsTo('', 'order_id');
	}


	public function product()
	{
		return $this->belongsTo('', 'product_id');
	}

	public function approvalitem()
	{
		return $this->belongsTo('', 'apritem_id');
	}

}

 
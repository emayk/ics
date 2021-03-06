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
 * Model Structure Eloquent
 *
 **/
namespace Emayk\Ics\Repo\Transorders;

use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Transorders\Transorders'
 *
 * @property integer        $id
 * @property integer        $nodoc
 * @property integer        $type_id
 * @property integer        $supplier_id
 * @property integer        $tax_id
 * @property integer        $warehouse_id
 * @property integer        $paymenttype_id
 * @property integer        $cp_id
 * @property integer        $curr_id
 * @property string         $delivery_at
 * @property integer        $credit
 * @property integer        $rate
 * @property integer        $approve_id
 * @property string         $uuid
 * @property boolean        $status
 * @property integer        $createby_id
 * @property integer        $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class Transorders extends Model
{
	protected $guarded = array();
	protected $table = 'trans_orders';
	public static $rules = array();
	protected $prefixTmp = 'Trx-PO-';

	public function createPOtemp()
	{
		$tmp = new TransOrderTmp();
		$tmp = $tmp->create(['trxnumber' => $this->prefixTmp . time()]);
		return $tmp;
	}
}

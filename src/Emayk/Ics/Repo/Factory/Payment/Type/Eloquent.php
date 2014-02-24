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


namespace Emayk\Ics\Repo\Factory\Payment\Type;


use Emayk\Ics\Models\BaseModel;

class Eloquent extends BaseModel
{
	/**
	 * An Eloquent Model: 'Emayk\Ics\Repo\Paymenttype\Paymenttype'
	 *
	 * @property integer        $id
	 * @property string         $name
	 * @property string         $info
	 * @property string         $uuid
	 * @property integer        $createby_id
	 * @property integer        $lastupdateby_id
	 * @property \Carbon\Carbon $created_at
	 * @property \Carbon\Carbon $updated_at
	 */

	protected $guarded = array();
	protected $table = 'master_payment_type';
	public static $rules = array();

}

 
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


namespace Emayk\Ics\Repo\Transorderdetails;

use Illuminate\Database\Eloquent\Model;

class Tmp extends Model
{
	protected $guarded = array();
	protected $table = 'trans_tmp_orderitems';
	public static $rules = array();
	public $timestamps = false;

	public function createRecord($array)
	{
		return $this->create($array);
	}

	public function updateRecord($array)
	{
		return $this->save([
			'id' => $array[ 'id' ]
		]);
	}
}

 
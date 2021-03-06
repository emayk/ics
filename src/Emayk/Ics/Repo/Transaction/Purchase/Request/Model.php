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


namespace Emayk\Ics\Repo\Transaction\Purchase\Request;

use Emayk\Ics\Models\BaseModel;

class Model extends BaseModel
{
	protected $guarded = array();
	protected $table = 'trans_pr';
	public static $rules = array();
//	protected $with = ['items'];

	public function items()
	{
		return $this->hasMany('\Emayk\Ics\Repo\Transaction\Purchase\Request\item', 'prid');
	}

	public function getItem()
	{
		return new item();
	}

	public function scopeNew($query)
	{
		return $query->whereStatus(1);
	}

	public function getNew()
	{
		return $this->New();
	}
}

 
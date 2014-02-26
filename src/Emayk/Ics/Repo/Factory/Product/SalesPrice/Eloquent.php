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


namespace Emayk\Ics\Repo\Factory\Product\SalesPrice;

use \Emayk\Ics\Repo\Factory\Product\Detail\Eloquent as DetailEloquent;

class Eloquent extends DetailEloquent
{
	protected $hidden = [
		"color_id",
		"createby_id",
		"created_at",
		"currsp_id",
		"currspm_id",
		"grade_id",
//		"id",
		"lastupdateby_id",
		"product_id",
		"unit_id",
		"updated_at",
		"uuid",
		'parent_id',
		'parent_type',
		'salesprice',
		'salespricemin'
	];

	protected $appends = ['min', 'value'];

	public function getMinAttribute()
	{
		return $this->attributes[ 'min' ] = $this->salespricemin;
	}

	public function getValueAttribute()
	{
		return $this->attributes[ 'value' ] = $this->salesprice;
	}

	public function oProduct()
	{
		return new Product();

	}

}

 
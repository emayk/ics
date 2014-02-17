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

namespace Emayk\Ics\Repo\System\History\Product;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model as LaravelModel;

class Model extends LaravelModel
{
	protected $guarded = array();
	protected $table = 'sys_product_histories';
	public static $rules = array();


	public static function createlog(array $messages, $userid, $productid)
	{
		$msg = $messages[ 0 ];

		return static::create(
			[
				"msg"        => $msg,
				"product_id" => $productid,
				"user_id"    => $userid,
				"created_at" => new Carbon(),
				"updated_at" => new Carbon()
			]
		);
	}
}

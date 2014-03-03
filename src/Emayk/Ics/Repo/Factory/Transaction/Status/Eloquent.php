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



namespace Emayk\Ics\Repo\Factory\Transaction\Status;


use Emayk\Ics\Models\BaseModel;

class Eloquent extends BaseModel{
protected $table = 'master_pr_status';
	protected $guarded = [];

	public function receiveproduct()
	{
		return $this->hasMany('\Emayk\Ics\Repo\Transaction\Receive\Product\Item\Model','status');
	}

}

 
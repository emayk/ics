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

/**
 * Class Item
 *
 * @package Emayk\Ics\Repo\Transaction\Purchase\Request
 */
class Item extends BaseModel
{
	/**
	 * @var array
	 */
	protected $guarded = array();
	/**
	 * @var string
	 */
	protected $table = 'trans_pr_item';
	/**
	 * @var array
	 */
	public static $rules = array();

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function pr()
	{
		return $this->belongsTo('\Emayk\Ics\Transaction\Purchase\Request\item', 'prid');
	}

	/**
	 * @param $query
	 *
	 * @return mixed
	 */
	public function scopeNew($query)
	{
		return $query->whereStatus(1);
	}

	/**
	 * @return mixed
	 */
	public function getNew(){
		return $this->New();
	}

	/**
	 * @param $prId
	 *
	 * @return mixed
	 */
	public function getNewFindByPrId($prId){
		return $this->New()->wherePrid($prId);
	}

}

 
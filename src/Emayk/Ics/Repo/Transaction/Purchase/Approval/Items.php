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


namespace Emayk\Ics\Repo\Transaction\Purchase\Approval;


use Emayk\Ics\Models\BaseModel;

class Items extends BaseModel
{
	/**
	 * @var array
	 */
	protected $guarded = array();
	/**
	 * @var string
	 */
	protected $table = 'trans_pr_approve_item';
	/**
	 * @var array
	 */
	public static $rules = array();
	protected $appends = array('unitname', 'name', 'length', 'approved');
	protected $with = ['adjitem'];


	public function getApprovedAttribute()
	{
		return ( $this->status == 2 );
	}

	public function getNameAttribute()
	{
		return $this->attributes[ 'name' ] = $this->adjitem->product->name;
	}

	public function getLengthAttribute()
	{
		return $this->attributes[ 'length' ] = $this->qtyadj;
	}

	public function getUnitnameAttribute()
	{
		return $this->attributes[ 'unitname' ] = $this->adjitem->product->typename;
	}


	public function approve()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Transaction\Purchase\Approval\Model', 'aprid');
	}

	public function products()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Factory\Product\Model', 'product_id');
	}

	public function adjitem()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Item', 'adj_item');
	}

	public function adj()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Eloquent', 'adj_id');
	}

	public function scopeUnprocessed($q)
	{
		return $q->whereStatus(1);
	}
	public function scopeAgree($q)
	{
		return $q->whereStatus(2);
	}

	public function scopeDenied($q)
	{
		return $q->whereStatus(3);
	}

	public function scopePending($q)
	{
		return $q->whereStatus(4);
	}


	public function scopeNewAndPending($q)
	{
		return $q->New()->orWhere(function($q){
			return $q->whereStatus(4);
		});
	}


	public function scopeProcessed($q)
	{
		return $q->where('status','=',5);
	}

}


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
namespace Emayk\Ics\Repo\Transorderapproval;
use Illuminate\Database\Eloquent\Model;
/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Transorderapproval\Transorderapproval'
 *
 * @property integer $id
 * @property string $refs
 * @property integer $type_id
 * @property boolean $process
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class Transorderapproval extends Model {
	protected $guarded = array();
	protected $table = 'trans_order_approval';
	public static $rules = array();

	public function type()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Approvaltype\Approvaltype','type_id');
	}
}

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
namespace Emayk\Ics\Repo\Contactperson;
use Illuminate\Database\Eloquent\Model;
/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Contactperson\Contactperson'
 *
 * @property integer $id
 * @property string $name
 * @property string $info
 * @property integer $pos_id
 * @property integer $dept_id
 * @property string $phone
 * @property string $email
 * @property string $fax
 * @property integer $parent_id
 * @property string $parent_type
 * @property string $uuid
 * @property integer $createby_id
 * @property integer $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Emayk\Ics\Repo\Positions\Positions $position
 * @property-read \Emayk\Ics\Repo\Dept\Dept $departement
 */
class Contactperson extends Model {
	protected $guarded = array();
	protected $table = 'master_contactperson';
	public static $rules = array();

	 /**
		*
		* Mendapatkan Position Contact Person
		*
		* @return \Illuminate\Database\Eloquent\Relations\BelongsTo
		*/
	 public function position()
	 {
			return $this->belongsTo('Emayk\Ics\Repo\Positions\Positions','pos_id');
	 }

	 /**
		* Mendapatkan Departement Contact Person
		*
		* @return \Illuminate\Database\Eloquent\Relations\BelongsTo
		*/
	 public function departement()
	 {
			return $this->belongsTo('Emayk\Ics\Repo\Dept\Dept','dept_id');
	 }

	 public function parent()
	 {
			return $this->morphTo();
	 }


}

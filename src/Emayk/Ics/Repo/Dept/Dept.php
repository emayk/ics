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

namespace Emayk\Ics\Repo\Dept;


use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Dept\Dept'
 *
 * @property integer $id
 * @property string $name
 * @property string $info
 * @property string $uuid
 * @property integer $createby_id
 * @property integer $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\User[] $users
 * @property-read \Illuminate\Database\Eloquent\Collection|\User[] $buyers
 * @property-read \Illuminate\Database\Eloquent\Collection|\User[] $suppliers
 */
class Dept extends  Model{
    protected  $table = 'master_departements';
	 protected $guarded = array();
	 /**
		* @return \Illuminate\Database\Eloquent\Relations\HasMany
		*/
	 public function users(){
        return $this->hasMany('\Emayk\Ics\Repo\Users\Users','dept_id');
    }

	 /**
		* @return \Illuminate\Database\Eloquent\Relations\HasMany
		*/
	 public function buyers(){
        return $this->hasMany('\Emayk\Ics\Repo\Users\Users');
    }

	 /**
		* @return \Illuminate\Database\Eloquent\Relations\HasMany
		*/
	 public function suppliers(){
        return $this->hasMany('User');
    }
}
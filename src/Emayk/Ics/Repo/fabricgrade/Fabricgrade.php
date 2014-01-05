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
namespace Emayk\Ics\Repo\Fabricgrade;
use Illuminate\Database\Eloquent\Model;
/**
 * An Eloquent Model: 'Emayk\Ics\Repo\fabricgrade\fabricgrade'
 *
 * @property integer $id
 * @property string $name
 * @property string $info
 * @property string $uuid
 * @property integer $createby_id
 * @property integer $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class Fabricgrade extends Model {
	protected $guarded = array();
	protected $table = 'master_fabric_grade';
	public static $rules = array();

	 /**
		*
		* Mendapatkan Product - Product berdasarkan Grade Kain
		*
		* @return \Illuminate\Database\Eloquent\Relations\HasManyThrough
		*/
	 public function products(){
			return $this->hasManyThrough(
				 'Emayk\Ics\Repo\Products\Products', // Nama Table Product
				 'Emayk\Ics\Repo\Productdetails\Productdetails', // Nama Class Yang akan dilalui
				 'grade_id',
				 'id'
			);
	 }

	 /**
		* Mendapatkan Detail Product
		* Jika menggunakan fungsi products() , fungsi ini akan automatis didapatkan
		* @return \Illuminate\Database\Eloquent\Relations\HasMany
		*/
	 public function productdetail(){
			return $this->hasMany('Emayk\Ics\Repo\Productdetails\Productdetails','grade_kain');
	 }
}



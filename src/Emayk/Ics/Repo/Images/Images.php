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
namespace Emayk\Ics\Repo\Images;
use Illuminate\Database\Eloquent\Model;
/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Images\Images'
 *
 * @property integer $id
 * @property string $name
 * @property string $info
 * @property string $filename
 * @property string $filelocation
 * @property string $url
 * @property string $thumbfile
 * @property integer $imageable_id
 * @property string $imageable_type
 * @property string $uuid
 * @property integer $createby_id
 * @property integer $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\user[] $users
 * @property-read \Illuminate\Database\Eloquent\Collection|\user[] $buyers
 * @property-read \Illuminate\Database\Eloquent\Collection|\user[] $supplier
 * @property-read \Illuminate\Database\Eloquent\Collection|\user[] $profile
 * @property-read \Illuminate\Database\Eloquent\Collection|\user[] $location
 */
class Images extends Model {
	protected $guarded = array();
	protected $table = 'sys_images';
	public static $rules = array();

	 public function users()
	 {
//		todo : image users
//			return $this->hasMany('user','')
	 }

	 public function buyers()
	 {
//			return $this->hasMany('user','')
	 }

	 public function supplier()
	 {
//			return $this->hasMany('user','')
	 }

	 public function profile()
	 {
//			return $this->hasMany('user','')
	 }

	 public function location()
	 {
//			return $this->hasMany('user','')
	 }

	public function imageable(){
		 return $this->morphTo();
	}

}

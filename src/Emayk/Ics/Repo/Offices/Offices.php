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
namespace Emayk\Ics\Repo\Offices;
use Illuminate\Database\Eloquent\Model;
/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Offices\Offices'
 *
 * @property integer $id
 * @property string $address
 * @property integer $country_id
 * @property integer $province_id
 * @property integer $city_id
 * @property string $postcode
 * @property integer $type
 * @property integer $parent_id
 * @property string $parent_type
 * @property string $codeinternal
 * @property boolean $mainoffice
 * @property string $uuid
 * @property integer $createby_id
 * @property integer $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class Offices extends Model {
	protected $guarded = array();
	protected $table = 'master_offices';
	public static $rules = array();
    public $hidden = array('parent_type');

	 public function country()
	 {
//			todo : office by country
	 }

	 public function city()
	 {
//			todo : office by city
	 }

	 public function province()
	 {
//			todo : office by province
	 }

	 public function parent()
	 {
//			todo : office by province
	 }


	 public function createby()
	 {
//			todo : office by creator
	 }

	 public function updateby()
	 {
//			todo : office by creator
	 }

}

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
namespace Emayk\Ics\Repo\Locations;


use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Locations\Locations'
 *
 * @property integer        $id
 * @property string         $name
 * @property string         $info
 * @property integer        $level
 * @property integer        $parent_id
 * @property string         $parent_type
 * @property string         $uuid
 * @property integer        $createby_id
 * @property integer        $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class Locations extends Model
{
	protected $guarded = array();
	protected $table = 'master_locations';
	public static $rules = array();


	public static function recordExist($id)
	{
		if (is_array($id)) {
			foreach ($id as $rec) {
				if (self::where('id', $rec)->count() == 0) throw new \Exception( "Record Location Not Found with {$rec}" );
			}
		} else {
			if (self::where('id', $id)->count() == 0) throw new \Exception( "Record Location Not Found with {$id}" );
		}

		return true;
	}


	public static function generateMassiveLocation($resultIds = false)
	{
		$total = self::lists('id');
		if (count($total) > 1000) throw new \Exception( 'Data sudah lebih dari 1000 Record,Tidak Perlu Tambah Lagi' );
		$dummy_location = new \Emayk\Ics\Support\Dummy\Faker\Locations();
		$generate       = [];
		for ($location = 0; $location < 20; $location++) {
			$d_country = $dummy_location->country();
			$country   = self::create($d_country);
			$cIds [ ]  = $country->id;
			for ($pro = 0; $pro < rand(15, 10); $pro++) {
				$d_province = $dummy_location->province($country->id, $country->name);
				$province   = self::create($d_province);
				$pIds [ ]   = $province->id;
				for ($ci = 0; $ci < rand(4, 10); $ci++) {
					$d_city      = $dummy_location->city($province->id, $province->name);
					$city        = self::create($d_city);
					$generate[ ] = $city->id;
					$cityIds[ ]  = $city->id;
				}
			}
		}
		$locations = ['country_ids' => $cIds, 'province_ids' => $pIds, 'city_ids' => $cityIds];
		return ( $resultIds ) ? $locations : "Generate Location with " . count($generate) . " Records ";
	}


	public  function getLocationById($parentId, $level, $id)
	{
		$location = static::where('id', $id)
			->where('parent_id', $parentId)
			->where('level', $level);
		return $location;
	}

	public  static function  getLocationByName($parentId, $level, $name = 'indonesia')
	{
		$location = static::where('name', $name)
			->where('parent_id', $parentId)
			->where('level', $level);
		return $location;
	}

	public  static function  createLocation($name, $parent_id, $level)
	{
		$location = static::create(
			array_merge(
				array(
					'name'  => $name, 'info' => "Information {$name} ", 'parent_id' => $parent_id,
					'level' => $level, 'parent_type' => '\Emayk\Ics\Repo\Locations\Locations'
				),
				static::onlyOncefillerAttributes()
			));
		return $location;
	}

	/**
	 * @return array
	 */
	protected static function  onlyOncefillerAttributes()
	{
		return array(
			'uuid'            => uniqid('System'),
			'createby_id'     => 1,
			'lastupdateby_id' => 1,
			'created_at'      => Carbon::create(),
			'updated_at'      => Carbon::create(),
		);
	}

}

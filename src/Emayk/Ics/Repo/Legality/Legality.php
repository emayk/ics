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
namespace Emayk\Ics\Repo\Legality;

use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;
use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Legality\Legality'
 *
 * @property integer        $id
 * @property string         $name
 * @property string         $info
 * @property string         $uuid
 * @property integer        $createby_id
 * @property integer        $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class Legality extends Model
{
	/**
	 * @var array
	 */
	protected $guarded = array();
	/**
	 * @var string
	 */
	protected $table = 'master_legalities';
	/**
	 * @var string
	 */
	protected static $defaultName = 'PT';
	/**
	 * @var array
	 */
	public static $rules = array();

	/**
	 *
	 */
	public function office()
	{
//			todo : legality office
	}

	/**
	 *
	 */
	public function buyer()
	{
//			todo : legality buyer
	}

	/**
	 *
	 */
	public function supplier()
	{
//			todo : legality supplier
	}

	/**
	 * @param bool $resultIds
	 * @param int  $count
	 *
	 * @return array|string
	 * @throws \Exception
	 */
	public static function  generateMassiveLegality($resultIds = false, $count = 100)
	{
		$total = self::count();
		if ($total > 1000) {
			$msg = 'Data sudah lebih dari 1000 Record, Tidak Perlu Tambah Lagi';
			$lIds = array();
		}else{
			$lIds = array();
			if (!static::hasDefault()) $lIds [] = static::getIdsDefaultOrCreate();
			for ($l = 1; $l <= $count; $l++) {
				$legal   = self::createRecord(static::getFake()->getLegality()->legality());
				$lIds[ ] = $legal->id;
			}
			$msg = "Generate Legality with " . count($lIds) . " records";
		}
		return ( $resultIds ) ? $lIds : $msg;
	}

	/**
	 * @return AbstractGenerate
	 */
	protected static function getFake()
	{
		return new AbstractGenerate();
	}

	/**
	 * @param array $record
	 *
	 * @return Model|static
	 */
	protected static function createRecord(array $record)
	{
		return self::create($record);
	}

	/**
	 * Mendapatkan Ids Legality
	 * Jika tidak ada akan dibuat
	 *
	 * @param int $count
	 *
	 * @return array
	 */
	public static function getIdsOrGenerateDummyData($count = 100)
	{
		$ids = static::getListIds();
		if (!count($ids)) {
			$ids = self::generateMassiveLegality(true, $count);
		};
		return $ids;
	}

	/**
	 * @return mixed
	 */
	protected static function  getListIds()
	{
		return self::lists('id');
	}

	/**
	 * @param $query
	 * @param $name
	 *
	 * @return mixed
	 */
	public function scopeName($query, $name)
	{
		return $query->whereName($name);
	}

	/**
	 * @return string
	 */
	public static function getDefaultName()
	{
		return self::$defaultName;
	}

	/**
	 * @return mixed
	 */
	public static function  getIdsDefaultOrCreate()
	{
		if (!static::hasDefault()) {
				$newrecord = static::createRecord(static::getFake()->getLegality()->legality(static::$defaultName));
			  $id = $newrecord->id;
		} else {
			$id = static::getDefaultIds();
		}
		return $id;
	}

	/**
	 * @return bool
	 */
	protected static function hasDefault()
	{
		return ( static::Name(static::$defaultName)->count() > 0 );
	}

	/**
	 * @return mixed
	 */
	public static function getDefaultIds()
	{
		return static::Name(static::$defaultName)->pluck('id');
	}
}

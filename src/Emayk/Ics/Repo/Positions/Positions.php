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
namespace Emayk\Ics\Repo\Positions;

use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;
use Illuminate\Database\Eloquent\Model;
/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Positions\Positions'
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
use \Auth;

/**
 * Class Positions
 *
 * @package Emayk\Ics\Repo\Positions
 */
class Positions extends Model
{
	/**
	 * @var array
	 */
	protected $guarded = array();
	/**
	 * @var string
	 */
	protected $table = 'master_positions';
	/**
	 * @var array
	 */
	public static $rules = array();
	/**
	 * @var string
	 */
	protected static $defaultName = 'System';

	/**
	 * Mutator Create By
	 */
	public function setCreatebyIdAttribute($value)
	{
		$this->attributes[ 'createby_id' ] = $value;
	}

	/**
	 * Mutator Last Update By
	 */
	public function setLastupdatebyIdAttribute($value)
	{
		$this->attributes[ 'lastupdateby_id' ] = $value;
	}

	/**
	 *
	 */
	public function users()
	{
		// list user
	}

	/**
	 *
	 */
	public function buyers()
	{
		// TODO: list buyers
	}

	/**
	 *
	 */
	public function suppliers()
	{
		// todo: list suppliers
	}


	/**
	 * @param bool $resultIds
	 * @param int  $count
	 *
	 * @return array|string
	 */
	public static function generateMassiveDataDummy($resultIds = false, $count = 10)
	{
		$positions = static::getFake()->getPosition()->generatePositions($count);
		$ids = array();
		if (!static::hasDefault()) { $ids [] = static::getIdDefaultPositionOrCreate(); }
		foreach ($positions as $pos) {
			$p       = self::create($pos);
			$Ids [ ] = $p->id;
		}

		\Log::debug('Location Masih Kosong , Sudah diisi ' . count($Ids));
		return ( $resultIds ) ? $Ids : "Generate Position with " . count($Ids) . " records";
	}

	/**
	 * @param int $count
	 *
	 * @return array
	 */
	public static  function getIdsPositionOrCreateMassiveDummy($count = 10)
	{
		$posIds = static::lists('id');
		if (!count($posIds)) {
			$default = array(static::getIdDefaultPositionOrCreate() );
			$newRecords = Positions::generateMassiveDataDummy(true,$count);
			$posIds = array_merge($default,$newRecords);
		};
		return $posIds;
	}
	/**
	 * @return array
	 */
	public static function  generateSystemPosition()
	{
		return static::getFake()->getPosition()->createPosition(static::$defaultName);
	}

	/**
	 * @return bool
	 */
	protected static function  hasDefault()
{
	return (static::Name(static::$defaultName)->count() > 0);
}
	/**
	 * @return mixed
	 */
	public static function getIdDefaultPositionOrCreate()
	{
		$default = self::Name(static::$defaultName);
		if ($default->count()) {
			$id = $default->pluck('id');
		} else {
			/*Create*/
			$pos = static::create(
				static::generateSystemPosition()
			);
			$id  = $pos->id;
		}
		return $id;
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
	 * @return AbstractGenerate
	 */
	public static function getFake()
	{
		return new AbstractGenerate();
	}

}

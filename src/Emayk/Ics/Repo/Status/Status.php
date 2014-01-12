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
namespace Emayk\Ics\Repo\Status;

use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;
use Faker\Factory;
use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Status\Status'
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
class Status extends Model
{
	/**
	 * @var array
	 */
	protected $guarded = array();
	/**
	 * @var string
	 */
	protected $table = 'master_status';
	/**
	 * @var string
	 */
	protected static $defaultStatus = 'Active';
	/**
	 * @var array
	 */
	public static $rules = array();

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function users()
	{
		return $this->hasMany('\Emayk\Ics\Repo\Users\Users', 'status_id');
	}

	/**
	 * @param bool $resultsIds
	 *
	 * @return array|string
	 */
	public static function createDataStatus($resultsIds = false)
	{
		$statuses = [static::$defaultStatus, 'Non Active'];
		foreach ($statuses as $status) {
			$st        = static::create(
				array_merge(
					array('info' => "Information {$status}", 'name' => $status), static::getFake()->othersAttributesArray()
				));
			$stIds [ ] = $st->id;
		}

		return ( $resultsIds ) ? $stIds : "Generate Status with " . count($stIds) . " records";

	}


	/**
	 * @return array|string
	 */
	public static function getIdsOrCreate()
	{
		$ids = self::lists('id');
		if (!count($ids)) {
			$ids = static::createDataStatus(true);
		}
		return $ids;
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
	 * @return mixed
	 */
	public static function getIdDefaultStatusOrCreate()
	{
		$statusDefault = static::getDefaultStatus();
		if ($statusDefault->count()) {
			$id = $statusDefault->pluck('id');
		} else {
			/*Create*/
			$ids           = static::createDataStatus(true);
			$statusDefault = static::getDefaultStatus();
			$id            = $statusDefault->pluck('id');
		}
		return $id;
	}

	/**
	 * @return AbstractGenerate
	 */
	public static function getFake()
	{
		return new AbstractGenerate();
	}

	/**
	 * @return mixed
	 */
	public static function getDefaultStatus()
	{
		return static::Name(static::$defaultStatus);
	}
}

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
namespace Emayk\Ics\Repo\Units;

use Emayk\Ics\Repo\Unittypes\Unittypes;
use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;
use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Units\Units'
 *
 * @property integer        $id
 * @property string         $name
 * @property string         $info
 * @property integer        $type_id
 * @property string         $uuid
 * @property integer        $createby_id
 * @property integer        $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class Units extends Model
{
	/**
	 * @var array
	 */
	protected $guarded = array();
	/**
	 * @var string
	 */
	protected $table = 'master_units';
	/**
	 * @var array
	 */
	public static $rules = array();


	/**
	 * @return AbstractGenerate
	 */
	protected static function getFake()
	{
		return new AbstractGenerate();
	}

	/**
	 * @param $record
	 *
	 * @return Model|static
	 */
	protected static function  createRecord($record)
	{
		return static::create($record);
	}

	/**
	 * @return array
	 */
	public static function getIdsOrCreateSampleUnits()
	{
		$ids = static::lists('id');
		if (!count($ids)) {
			$unitTypeIds = Unittypes::getIdsOrCreate();
			$units       = array("meter", "kg", "yard", "roll");
			foreach ($units as $rec) {
				$typeId      = static::getFake()->getFake()->randomElement($unitTypeIds);
				$record      = static::createRecord(static::getFake()->createRecordUnit($rec, $typeId));
				$ids [ ] = $record->id;
			}
		};
		return $ids;
	}
}

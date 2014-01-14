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
namespace Emayk\Ics\Repo\Unittypes;

use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;
use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Unittypes\Unittypes'
 *
 * @property integer $id
 * @property string $name
 * @property string $info
 * @property string $uuid
 * @property integer $createby_id
 * @property integer $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\Emayk\Ics\Repo\Units\Units[] $units
 */
class Unittypes extends Model
{
	protected $guarded = array();
	protected $table = 'master_unit_type';
	public static $rules = array();

	public function units()
	{
		return $this->hasMany('Emayk\Ics\Repo\Units\Units', 'type_id');
	}

	protected static function getFake()
	{
		return new AbstractGenerate();
	}

	protected static function  createRecord(array $record)
	{
		return static::create($record);
	}

	public static function  getIdsOrCreate()
	{
		$ids = static::lists('id');
		if (!count($ids))
		{
			$records = static::getFake()->createRecordUnitType();
			foreach ($records as $rec)
			{
				$newRec = static::createRecord($rec);
				$ids [] = $newRec->id;
			}
		};
	return $ids;
	}
}

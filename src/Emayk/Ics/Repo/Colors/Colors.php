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
namespace Emayk\Ics\Repo\Colors;

use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;
use \Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Colors\Colors'
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
class Colors extends Model
{
    /**
     * @var array
     */
    protected $guarded = array();
    /**
     * @var string
     */
    protected $table = 'master_colors';
    /**
     * @var array
     */
    public static $rules = array();


    /**
     * @param bool $resultIds
     * @param int $count
     *
     * @return array|string
     */
    public static function generateColorSample($resultIds = false, $count = 100)
    {
        $colors = static::getFake()->getColor()->generateColorSample($count);
        foreach ($colors as $color) {
            $newrecord = static::createRecord($color);
            $ids [] = $newrecord->id;
        }
        return ($resultIds) ? $ids : "Generate Data " . count($ids) . " records";
    }

    /**
     * @param int $count
     *
     * @return array|string
     */
    public static function  getIdsOrCreate($count = 10)
    {
        $ids = static::lists('id');
        if (!count($ids)) {
            $ids = static::generateColorSample(true, $count);
        }
        return $ids;
    }

    /**
     * @param array $color
     *
     * @return Model|static
     */
    protected static function  createRecord(array $color)
    {
        return static::create($color);
    }

    /**
     * @return AbstractGenerate
     */
    protected static function getFake()
    {
        return new AbstractGenerate();
    }
}

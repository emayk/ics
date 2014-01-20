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
namespace Emayk\Ics\Repo\Fabrictype;

use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;
use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Fabrictype\Fabrictype'
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
class Fabrictype extends Model
{
	/**
	 * @var array
	 */
	protected $guarded = array();
	/**
	 * @var string
	 */
	protected $table = 'master_fabric_type';
	/**
	 * @var array
	 */
	public static $rules = array();
    /**
     * @var array
     */
    public $appends = ['createby','updater'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function creator()
    {
        return $this->belongsTo('\Emayk\Ics\Repo\Users\Users','createby_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function updater()
    {
        return $this->belongsTo('\Emayk\Ics\Repo\Users\Users','lastupdateby_id');
    }

    /**
     * @return mixed
     */
    public function getCreatebyAttribute()
    {
        return $this->attributes['createby'] = $this->creator()->pluck('username');
    }

    /**
     * @return mixed
     */
    public function getUpdaterAttribute()
    {
        return $this->attributes['updater'] = $this->updater()->pluck('username');
    }

	/**
	 *
	 */
	public function fabrics()
	{
//			todo : list fabric / kain
	}


	/**
	 * @param bool $resultIds
	 * @param int  $count
	 *
	 * @return array|string
	 * @throws \Exception
	 */
	public static function generateMassive($resultIds = false, $count = 100)
	{
		if (self::count() > 1000) throw new \Exception( 'Grade Fabric sudah lebih dari 1000 Record,Tidak Perlu Tambah Lagi' );
		$typeIds     = array();
		for ($ty = 1; $ty <= $count; $ty++) {
			$type       = self::create( static::getFake()->getFabric()->type() );
			$typeIds[ ] = $type->id;
		}

		return ( $resultIds ) ? $typeIds : "Generate fabric Type with " . count($typeIds) . " records";
	}

    /**
     * @return AbstractGenerate
     */
    protected static function  getFake()
	{
		return new AbstractGenerate();
	}

	/**
	 * @param int $count
	 *
	 * @internal param bool $resultIds
	 * @return array|string
	 */
	public static function getIdsOrCreateDummy($count = 10)
	{
		$ids = static::lists('id');
		if (!count($ids)) $ids = static::generateMassive(true, $count);
		return $ids;
	}

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function productType(){
        return $this->hasMany('\Emayk\Ics\Repo\Producttype\Producttype','fabrictype_id');
    }
}

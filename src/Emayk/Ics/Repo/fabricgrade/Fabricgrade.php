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
namespace Emayk\Ics\Repo\Fabricgrade;

use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\fabricgrade\fabricgrade'
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
class Fabricgrade extends Model
{
	/**
	 * @var array
	 */
	protected $guarded = array();
	/**
	 * @var string
	 */
	protected $table = 'master_fabric_grade';
	/**
	 * @var array
	 */
	public static $rules = array();

	/**
	 *
	 * Mendapatkan Product - Product berdasarkan Grade Kain
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasManyThrough
	 */
	public function products()
	{
		return $this->hasManyThrough(
			'Emayk\Ics\Repo\Products\Products', // Nama Table Product
			'Emayk\Ics\Repo\Productdetails\Productdetails', // Nama Class Yang akan dilalui
			'grade_id',
			'id'
		);
	}

	/**
	 * Mendapatkan Detail Product
	 * Jika menggunakan fungsi products() , fungsi ini akan automatis didapatkan
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function productdetail()
	{
		return $this->hasMany('Emayk\Ics\Repo\Productdetails\Productdetails', 'grade_kain');
	}

	/**
	 * Mengenerate Data Fabric Grade
	 * @param bool $resultsIds
	 * @param int  $count
	 *
	 * @return array|string
	 * @throws \Exception
	 */
	public static function generateMassive($resultsIds = false, $count = 100)
	{
		if (self::count() > 1000) throw new \Exception( 'Grade Fabric sudah lebih dari 1000 Record,Tidak Perlu Tambah Lagi' );
		$dummyFabric = new \Emayk\Ics\Support\Dummy\Faker\Fabric();
		$gradeIds    = array();
		for ($gr = 0; $gr < $count; $gr++) {
			$grade       = self::create($dummyFabric->grade());
			$gradeIds[ ] = $grade->id;
		}

		return ($resultsIds) ? $gradeIds : "Generate Data Fabrice Grade " . count($gradeIds) . " records";
	}

	public static function getIdsOrCreate($count = 10 )
	{
		$ids = static::lists('id');
		if (!count($ids) )
		{
			$ids = static::generateMassive(true,$count);
		}
		return $ids;
	}
}



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

namespace Emayk\Ics\Repo\Dept;


use Emayk\Ics\Support\Dummy\Faker\Departement;
use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Dept\Dept'
 *
 * @property integer $id
 * @property string $name
 * @property string $info
 * @property string $uuid
 * @property integer $createby_id
 * @property integer $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\User[] $users
 * @property-read \Illuminate\Database\Eloquent\Collection|\User[] $buyers
 * @property-read \Illuminate\Database\Eloquent\Collection|\User[] $suppliers
 */
class Dept extends  Model{
    protected  $table = 'master_departements';
	 protected $guarded = array();
	 /**
		* @return \Illuminate\Database\Eloquent\Relations\HasMany
		*/
	 public function users(){
        return $this->hasMany('\Emayk\Ics\Repo\Users\Users','dept_id');
    }

	 /**
		* @return \Illuminate\Database\Eloquent\Relations\HasMany
		*/
	 public function buyers(){
        return $this->hasMany('\Emayk\Ics\Repo\Users\Users');
    }

	 /**
		* @return \Illuminate\Database\Eloquent\Relations\HasMany
		*/
	 public function suppliers(){
        return $this->hasMany('User');
    }


	public static function generateMassive($resultIds = false,$count = 100)
	{
		if (self::count() > 1000) throw new \Exception( 'Departement Sudah Lebih dari 1000 Record,Tidak Perlu Tambah Lagi' );

		$depts     = array();
		$fakeDept = new Departement();

		for ($dep = 1; $dep <= $count; $dep++) {
			$d = self::create($fakeDept->dept());
			$depts [] = $d->id;
		}
		Log::debug('Departement Masih Kosong , Sudah diisi '.count($depts) );
		return ($resultIds) ? $depts : "Generate Departement with ". count($depts) . " records";
	}
}
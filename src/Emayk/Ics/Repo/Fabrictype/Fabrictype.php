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
class Fabrictype extends Model {
	protected $guarded = array();
	protected $table = 'master_fabric_type';
	public static $rules = array();

	 public function fabrics()
	 {
//			todo : list fabric / kain
	 }


	public static function generateMassive($resultIds = false,$count = 100)
	{
			if (self::count() > 1000) throw new \Exception( 'Grade Fabric sudah lebih dari 1000 Record,Tidak Perlu Tambah Lagi' );
			$dummyFabric = new \Emayk\Ics\Support\Dummy\Faker\Fabric();
			$typeIds     = array();
			for ($ty = 1; $ty <= $count; $ty++) {
				$type        = self::create($dummyFabric->type());
				$typeIds[ ]  = $type->id;
			}

			return ($resultIds) ? $typeIds : "Generate fabric Type with ". count($typeIds). " records";
	}
}

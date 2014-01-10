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
	protected $guarded = array();
	protected $table = 'master_legalities';
	public static $rules = array();

	public function office()
	{
//			todo : legality office
	}

	public function buyer()
	{
//			todo : legality buyer
	}

	public function supplier()
	{
//			todo : legality supplier
	}

	public static function  generateMassiveLegality($resultIds = false,$count = 100)
	{
		$dLegality = new \Emayk\Ics\Support\Dummy\Faker\Legality();
		$total     = self::count();
		if ($total > 1000) throw new \Exception( 'Data sudah lebih dari 1000 Record,Tidak Perlu Tambah Lagi' );

		$lIds = array();
		for ($l = 1; $l <= $count; $l++) {
			$legal   = self::create($dLegality->legality());
			$lIds[ ] = $legal->id;
		}

		return ($resultIds) ? $lIds :  "Generate Legality with ". count($lIds). " records";
	}

}

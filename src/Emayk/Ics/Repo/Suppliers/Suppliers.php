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
namespace Emayk\Ics\Repo\Suppliers;
use Illuminate\Database\Eloquent\Model;
/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Suppliers\Suppliers'
 *
 * @property integer $id
 * @property string $name
 * @property string $codepos
 * @property string $npwp
 * @property string $fax
 * @property string $email
 * @property float $plafon
 * @property integer $kredit
 * @property \Carbon\Carbon $deleted_at
 * @property string $address
 * @property string $rt
 * @property string $rw
 * @property string $phone
 * @property integer $status_id
 * @property integer $tipe_id
 * @property integer $legality_id
 * @property integer $typeprod_id
 * @property integer $country_id
 * @property integer $province_id
 * @property integer $city_id
 * @property string $uuid
 * @property integer $createby_id
 * @property integer $lastupdateby_id
 * @property string $codeinternal
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\Emayk\Ics\Repo\Products\Products[] $products
 */
class Suppliers extends Model {
	protected $guarded = array();
	protected $table = 'master_suppliers';
	public static $rules = array();

    public function products(){
        return $this->hasMany('Emayk\Ics\Repo\Products\Products');
    }
}

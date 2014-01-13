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
namespace Emayk\Ics\Repo\Login;
use Illuminate\Database\Eloquent\Model;
/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Login\Login'
 *
 * @property integer $id
 * @property string $username
 * @property string $fullname
 * @property string $email
 * @property integer $pos_id
 * @property integer $dept_id
 * @property integer $warehouse_id
 * @property integer $status_id
 * @property string $password
 * @property string $uuid
 * @property integer $createby_id
 * @property integer $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class Login extends Model {
	protected $guarded = array();
	protected $table = 'master_users';
	public static $rules = array();
}

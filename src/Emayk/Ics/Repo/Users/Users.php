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
namespace Emayk\Ics\Repo\Users;

use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;
use \Illuminate\Database\Eloquent\Model;
use \Auth;
use \DB;
use \Hash;
use \Emayk\Ics\Repo\Dept\Dept;
use \Emayk\Ics\Repo\Status\Status;
use \Emayk\Ics\Repo\Positions\Positions;
use \Emayk\Ics\Repo\Warehouse\Warehouse;
use \Emayk\Ics\Repo\Warehousecategory\Warehousecategory;
use \Emayk\Ics\Repo\Locations\Locations;
use \Illuminate\Auth\UserInterface;
use \Illuminate\Auth\Reminders\RemindableInterface;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Users\Users'
 *
 * @property integer        $id
 * @property string         $username
 * @property string         $fullname
 * @property string         $email
 * @property integer        $pos_id
 * @property integer        $dept_id
 * @property integer        $warehouse_id
 * @property integer        $status_id
 * @property string         $password
 * @property string         $uuid
 * @property integer        $createby_id
 * @property integer        $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */

class Users extends Model implements UserInterface, RemindableInterface
{
	/**
	 * @var array
	 */
	protected $guarded = array();
	/**
	 * @var string
	 */
	protected $table = 'master_users';
	/**
	 * @var array
	 */
	public static $rules = array();
	/**
	 * @var array
	 */
	protected static $defaultUserAdmin = array(
		'username' => 'admin',
		'password' => '123'
	);

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = array('password');

	/**
	 * @var array
	 */
	protected static $defaultLocation = array(
		'country'  => 'Indonesia',
		'province' => 'Jawa Barat',
		'city'     => 'Bandung'
	);


	/**
	 * Get the unique identifier for the user.
	 *
	 * @return mixed
	 */
	public function getAuthIdentifier()
	{
		return $this->getKey();
	}

	/**
	 * Get the password for the user.
	 *
	 * @return string
	 */
	public function getAuthPassword()
	{
		return $this->password;
	}

	/**
	 * Get the e-mail address where password reminders are sent.
	 *
	 * @return string
	 */
	public function getReminderEmail()
	{
		return $this->email;
	}

	/**
	 * @param $value
	 */
	public function setPasswordAttribute($value)
	{
		$this->attributes[ 'password' ] = Hash::make($value);
	}

	/**
	 *
	 * Mutator Status Id
	 *
	 * @param $value
	 *
	 * @return Model|static
	 */
	public function setStatusIdAttribute($value)
	{
		$this->attributes[ 'status_id' ] = ( $this->emptyStatus() ) ? $this->generateStatus() : $value;

	}


	/**
	 * Mutator departement ID
	 *
	 * @param $value
	 *
	 * @return bool|int|mixed
	 */
	public function setDeptIdAttribute($value)
	{
		$this->attributes[ 'dept_id' ] = ( $this->emptyDept() ) ? $this->generateDept() : $value;
	}

	/**
	 *
	 * Mutator Position
	 *
	 * @param $value
	 *
	 * @return int|mixed|null
	 */
	public function setPosIdAttribute($value)
	{
		return $this->attributes[ 'pos_id' ] = ( $this->emptyPosition() ) ? $this->generatePosition() : $value;;
	}

	/**
	 * @param $value
	 */
	public function setWarehouseIdAttribute($value)
	{
		$this->attributes[ 'warehouse_id' ] = ( $this->emptyWarehouse() ) ? $this->generateWarehouse() : $value;
	}

	/**
	 * @return int|mixed|null
	 */
	public function generatePosition()
	{
		if ($this->emptyPosition()) {
			$pos = Positions::create(
				array(
					'id'   => 1,
					'name' => 'System',
					'info' => 'System Position',
				)
			);

			return $pos->id;
		}
	}

	/**
	 *
	 * Generate Departement
	 *
	 * @return bool|int|mixed
	 */
	public function generateDept()
	{
		if ($this->emptyDept()) {
			$dept = Dept::create(array('id' => 1, 'name' => 'System', 'info' => 'System'));;
			return $dept->id;
		}
	}

	/**
	 * Generate Status User Jika Status Belum Ada.
	 *
	 * @return Model|static
	 */
	public function generateStatus()
	{
		if ($this->emptyStatus()) {
			Status::create(
				array_merge(
					array(
						'id' => 1, 'name' => 'Active', 'info' => 'Status Active',
					), static::onlyOncefillerAttributes()
				)
			);
			Status::create(
				array_merge(
					array(
						'id' => 2, 'name' => 'NonActive', 'info' => 'Status Non Active',
					), static::onlyOncefillerAttributes()
				)
			);
			return 1;
		}
	}


	/**
	 * Generate Data Warehouse Jika Belum Ada
	 *
	 * @return bool|int|mixed
	 */
	public function generateWarehouse()
	{
		/*
			* Warehouse Memerlukan Category
			*
			* maka sebelumnya dibuatkan dl
			* - Warehouse Category
			* - City
			* -
		*/
		if ($this->emptyWarehouse()) {
			DB::beginTransaction();
			$catwh = Warehousecategory::create(
				array(
					'id'   => 1,
					'name' => 'Pusat',
					'info' => 'Gudang Utama'
				)
			);

			$ptype = 'Emayk\Ics\Repo\Locations\Locations';
			$uid   = $this->uid();
//						$fake = $this->fake;
			$fake = Faker\Factory::create();
			$uuid = $fake->uuid;
			Locations::insert(
				array(
					array(
						'id'          => 1, 'name' => 'Indonesia', 'level' => 1,
						'parent_id'   => 0, 'parent_type' => $ptype, 'uuid' => $uuid,
						'createby_id' => $uid, 'lastupdateby_id' => $uid
					),
					array(
						'id'          => 2, 'name' => 'Jawa Barat', 'level' => 2,
						'parent_id'   => 1, 'parent_type' => $ptype, 'uuid' => $uuid,
						'createby_id' => $uid, 'lastupdateby_id' => $uid
					),
					array(
						'id'          => 3, 'name' => 'Bandung', 'level' => 3,
						'parent_id'   => 2, 'parent_type' => $ptype, 'uuid' => $uuid,
						'createby_id' => $uid, 'lastupdateby_id' => $uid
					),
				)
			);

			$cityId = 3;
			$wh     = Warehouse::create(
				array(
					'id'          => 1,
					'name'        => 'Gudang Utama',
					'address'     => $fake->streetAddress,
					'city_id'     => $cityId,
					'cat_id'      => $catwh->id,
					'uuid'        => $uuid,
					'createby_id' => $uid, 'lastupdateby_id' => $uid
				)
			);
			DB::commit();

			return $wh->id;
		}

		return false;
	}

	/**
	 * @return bool
	 */
	public function emptyDept()
	{
		return ( Dept::count() == 0 );
	}

	/**
	 * @return bool
	 */
	public function emptyStatus()
	{
		return ( Status::count() == 0 );
	}

	/**
	 *
	 * Menentukan Keberadaan Position/Jabatan
	 *
	 * @return bool
	 */
	protected function emptyPosition()
	{
		return ( Positions::count() == 0 );
	}

	/**
	 * Warehouse Empty ?
	 *
	 * @return bool
	 */
	protected function emptyWarehouse()
	{
		return ( Warehouse::count() == 0 );
	}

	/**
	 * @return int
	 */
	protected function uid()
	{
		return 1; //(Auth::guest ()) ? 1 : Auth::user ()->id;
	}

	/**
	 * @param $query
	 * @param $name
	 *
	 * @return mixed
	 */
	public function scopeUsername($query, $name)
	{
		return $query->whereUsername($name);
	}

	/**
	 * @return AbstractGenerate
	 */
	public static function  getFake()
	{
		return new AbstractGenerate();
	}

	/**
	 * @return Model|static
	 * @throws \Exception
	 */
	public static function generateUserAdmin()
	{
		$username  = static::$defaultUserAdmin[ 'username' ];
		$useradmin = self::Username($username);

		if ($useradmin->count()) {
			$msg = 'User Admin Sudah Dibuat';
		} else {
			$posId       = Positions::getIdDefaultPositionOrCreate();
			$deptId      = Dept::getIdDefaultDepartementOrCreate();
			$warehouseId = Warehouse::getDefaultWarehouseIdOrCreate();
			$statusId    = Status::getIdDefaultStatusOrCreate();
			$user        = self::create(
				array_merge(
					array(
						'username'     => static::$defaultUserAdmin[ 'username' ],
						'fullname'     => lcfirst(static::$defaultUserAdmin[ 'username' ]),
						'email'        => static::getFake()->getFake()->companyEmail,
						'pos_id'       => $posId,
						'dept_id'      => $deptId,
						'warehouse_id' => $warehouseId,
						'status_id'    => $statusId,
						'password'     => static::$defaultUserAdmin[ 'password' ],
					), static::getFake()->othersAttributesArray())
			);
			$msg = "Generate User Admin {$user->username} Successfully";
		}
		return $msg;
	}

}

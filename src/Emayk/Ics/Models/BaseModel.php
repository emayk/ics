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
 **/


namespace Emayk\Ics\Models;

use \Auth;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BaseModel
 *
 * @package Emayk\Ics\Models
 */
class BaseModel extends Model
{
	/**
	 * @return array
	 */
	public function getColumnsNames()
	{
		$connection = DB::connection();
		$connection->getSchemaBuilder();

		$grammar = $connection->getSchemaGrammar();
		$table   = $connection->getTablePrefix() . $this->table;
		$results = $connection->select($grammar->compileColumnExists($table));
		return array_unique($connection->getPostProcessor()->processColumnListing($results));
	}


	/**
	 * @return array
	 * @throws Exception
	 */
	public function getAllColumnsNamesv2()
	{
		switch (DB::connection()->getConfig('driver')) {
			case 'pgsql':
				$query       = "SELECT column_name FROM information_schema.columns WHERE table_name = '" . $this->table . "'";
				$column_name = 'column_name';
				$reverse     = true;
				break;

			case 'mysql':
				$query       = 'SHOW COLUMNS FROM ' . $this->table;
				$column_name = 'Field';
				$reverse     = false;
				break;

			case 'sqlsrv':
				$parts       = explode('.', $this->table);
				$num         = ( count($parts) - 1 );
				$table       = $parts[ $num ];
				$query       = "SELECT column_name FROM " . DB::connection()->getConfig('database') . ".INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'" . $table . "'";
				$column_name = 'column_name';
				$reverse     = false;
				break;

			default:
				$error = 'Database driver not supported: ' . DB::connection()->getConfig('driver');
				throw new Exception( $error );
				break;
		}

		$columns = array();

		foreach (DB::select($query) as $column) {
			$columns[ ] = $column->$column_name;
		}

		if ($reverse) {
			$columns = array_reverse($columns);
		}

		return $columns;
	}

	/*Kolom System */
	/**
	 * @var string
	 */
	public $colsystem = 'system';

	/**
	 * @param array $array
	 *
	 * @return Model|static
	 */
	public function createProtectedRecord(array $array)
	{
		$colsystem = array($this->colsystem => 1);
		$record    = array_merge($array, $colsystem);
		return $this->create($record);
	}

	/**
	 * Protected Record
	 *
	 * @return bool
	 */
	public function  hasProtectedRecord()
	{
		return ( $this->where($this->colsystem, '=', 1)->count() > 0 );
	}

	/**
	 * Mendapatkan Uid User Yang Login
	 *
	 * @return int
	 */
	public function getUid()
	{
		return ( Auth::user() ) ? Auth::user()->id : 1;
	}

	/**
	 * Membuat Uuid Simple dari Transaksi Number
	 *
	 * @param $trxnumber
	 *
	 * @return string
	 */
	public function createUuid($trxnumber)
	{
		return uniqid(str_replace('-', '_', $trxnumber));
	}

	public function getPrefix()
	{
		return new \Emayk\Ics\Repo\Factory\Prefix\Eloquent();
	}

	public function getPpnId()
	{
		/*ganti dengan PPN id di table master_tax*/
		return 1;
	}

	/**
	 * Mendapatkan Factory Model
	 *
	 * @return \Emayk\Ics\Repo\Factory\Eloquent
	 */
	public function getFactory()
	{
		return new \Emayk\Ics\Repo\Factory\Eloquent();
	}

	/**
	 * Mendapatkan Record yang dibuat hari ini
	 * @param $q
	 *
	 * @return mixed
	 */
	public function scopeCreateToday($q)
	{
		$date = date('Y-m-d');
		return $q->where('created_at', "LIKE", "%$date%");
	}


	public function oUser(){
		$user =  new \Emayk\Ics\Repo\Factory\User\Eloquent();
		return $user->findOrFail($this->getUid());
	}

	public function getUsername()
	{
		return $this->oUser()->username;
	}
	public function getUserFullname(){
		$fullname = $this->oUser()->fullname;
		return (is_null($fullname)) ? $this->getUsername() : $fullname;
	}
}
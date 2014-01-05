<?php
/**
 * Created by PhpStorm.
 * User: emayk
 * Date: 1/2/14
 * Time: 11:05 PM
 */

namespace Emayk\Ics\Models;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends  Model {

	 public function getColumnsNames()
	 {
			$connection = DB::connection();
			$connection->getSchemaBuilder();

			$grammar = $connection->getSchemaGrammar();
			$table = $connection->getTablePrefix().$this->table;
			$results = $connection->select($grammar->compileColumnExists($table));
			return array_unique($connection->getPostProcessor()->processColumnListing($results));
	 }


	 public function getAllColumnsNamesv2()
	 {
			switch (DB::connection()->getConfig('driver')) {
				 case 'pgsql':
						$query = "SELECT column_name FROM information_schema.columns WHERE table_name = '".$this->table."'";
						$column_name = 'column_name';
						$reverse = true;
						break;

				 case 'mysql':
						$query = 'SHOW COLUMNS FROM '.$this->table;
						$column_name = 'Field';
						$reverse = false;
						break;

				 case 'sqlsrv':
						$parts = explode('.', $this->table);
						$num = (count($parts) - 1);
						$table = $parts[$num];
						$query = "SELECT column_name FROM ".DB::connection()->getConfig('database').".INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'".$table."'";
						$column_name = 'column_name';
						$reverse = false;
						break;

				 default:
						$error = 'Database driver not supported: '.DB::connection()->getConfig('driver');
						throw new Exception($error);
						break;
			}

			$columns = array();

			foreach(DB::select($query) as $column)
			{
				 $columns[] = $column->$column_name;
			}

			if($reverse)
			{
				 $columns = array_reverse($columns);
			}

			return $columns;
	 }



} 
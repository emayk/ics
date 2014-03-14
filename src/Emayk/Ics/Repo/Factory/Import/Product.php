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


namespace Emayk\Ics\Repo\Factory\Import;


use Emayk\Ics\Models\BaseModel;


/**
 * Class Product
 *
 * @package Emayk\Ics\Repo\Factory\Import
 */
class Product extends BaseModel
{
	/**
	 * @var string
	 */
	protected $folder = '';
	/**
	 * @var array
	 */
	protected $guarded = [];

	/**
	 * @var
	 */
	protected $file;
	/**
	 * @var
	 */
	protected $location;
	/**
	 * @var string
	 */
	protected $table = 'import_product';
	protected $rowperinsert = 0;
	protected $datarecords = [];
	protected $awalData = 10;
	protected $indexColumnTerpilih = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	/**
	 * @param mixed $location
	 */
	public function setLocation($location)
	{
		$this->location = $location;
	}

	/**
	 * @return mixed
	 */
	public function getLocation()
	{
		return $this->location;
	}

	/**
	 * @param mixed $file
	 */
	public function setFile($file)
	{
		$this->file = $file;
	}

	/**
	 * @return mixed
	 */
	public function getFile()
	{
		return $this->file;
	}

	/**
	 * @param string $folder
	 */
	public function setFolder($folder)
	{
		$this->folder = $folder;
	}

	/**
	 * @return string
	 */
	public function getFolder()
	{
		return $this->folder;
	}

	/**
	 * @return Excel
	 */
	public function getExcel()
	{
		return new Excel();
	}

	/**
	 * @param      $fileExcel
	 *
	 * @param int  $start
	 * @param null $limit
	 *
	 * @return array
	 */
	public function getArrayFileExcel($fileExcel, $start = 0, $limit = null)
	{
		$this->truncate();
		$arr = $this->getExcel()->load($fileExcel);
		$arr = $arr->select($this->indexColumnTerpilih);
		$arr = $arr->toArray();
		/*Check Kolom*/
		$rowHeader = 9;
		foreach ($arr as $no => $kolom) {
			if ($no > $rowHeader) {
				$v                    = array_values($kolom);
				$this->datarecords[ ] = $v;
			}
		}
//		return $this->datarecords;
		return $this->processToDb();
	}

	protected function processToDb()
	{
		$limit     = 30;
		$cnt       = 0;
		$sleeptime = 3;
		$importId = uniqid('Test_');
//		foreach ($this->datarecords as $record) {
		$testcount = 100;
		for ($i = 1; $i <= $testcount; $i++) {
			$datas[ ] = [$i, "Polyester", "Woolpeach", "Woolpeach pls 58\"", "polos", 150, null, null, "Yards"];
		}
//		d($this->datarecords);
//		return $data;
//		foreach ($this->datarecords as $record) {

		foreach ($datas as $record) {
			if ($cnt == $limit) {
//				sleep($sleeptime);
				$cnt = 0;
			}
			$newRecord = $this->newRecord($record,$importId);
			$data[ ]   = $newRecord->id;
			\Log::info('Record', [$record]);
			$cnt++;
			\Log::info('Counter', [$cnt]);
		}
		return $data;
	}

	/**
	 * @param array  $data
	 *
	 * @param string $importId
	 *
	 * @return \Illuminate\Database\Eloquent\Model
	 */
	public function newRecord(array $data, $importId = '')
	{
		$code_internal = trim($data[ 0 ]);
		$catname       = strtolower(trim($data[ 1 ]));
		$name          = strtolower(trim($data[ 2 ]));
		$typename      = strtolower(trim($data[ 3 ]));
		$nodesign      = strtolower(trim($data[ 4 ]));
		$width         = is_null($data[ 5 ]) ? 0 : intval($data[ 5 ]);
		$weight        = is_null($data[ 6 ]) ? 0 : intval($data[ 6 ]);
		$unitname      = trim($data[ 7 ]);

//		return $this->firstOrCreate([
		return $this->create([
			"code_internal" => $code_internal,
			"catname"       => $catname,
			"name"          => $name,
			"typename"      => $typename,
			"nodesign"      => $nodesign,
			"width"         => $width,
			"weight"        => $weight,
			"unitname"      => $unitname,
			"status"        => $this->setStatus($data),
			"importId"      => $importId
		]);
	}

	/**
	 *
	 */
	protected function truncate()
	{
		\DB::table($this->table)->truncate();
	}

	/**
	 * @param $value
	 *
	 * @return string
	 */
	protected function trim($value)
	{
		return trim($value);
	}

	/**
	 * @param array $data
	 *
	 * @return bool
	 */
	protected function setStatus(array $data)
	{
		$code_internal = $data[ 0 ];
		$catname       = $data[ 1 ];
		$name          = $data[ 2 ];
		$typename      = $data[ 3 ];
		$nodesign      = $data[ 4 ];
		$width         = $data[ 5 ];
		$weight        = $data[ 6 ];
		$unitname      = $data[ 7 ];
		$success       = true;
		if (is_null($catname)) $success = false;
		if (is_null($name)) $success = false;
		if (is_null($typename)) $success = false;
		if (is_null($unitname)) $success = false;
		return $success;
	}
}

 
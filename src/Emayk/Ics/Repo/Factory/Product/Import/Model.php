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


namespace Emayk\Ics\Repo\Factory\Product\Import;

use Emayk\Ics\Models\BaseModel;
use Queue;
use DB;

class Model extends BaseModel
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
	protected $importId;
	protected $truncate = false;
	protected $rowheader = 9;
	protected $failStatuses = [];
	protected $successStatuses = [];

	/**
	 * @param mixed $truncate
	 */
	public function setTruncate($truncate)
	{
		$this->truncate = $truncate;
	}

	/**
	 * @return mixed
	 */
	public function getTruncate()
	{
		return $this->truncate;
	}

	/**
	 * @param mixed $importId
	 */
	public function setImportId($importId)
	{
		$this->importId = $importId;
	}

	/**
	 * @return mixed
	 */
	public function getImportId()
	{
		return $this->importId;
	}

	/**
	 * @var string
	 */
	protected $table = 'import_product';
	protected $rowperinsert = 0;
	protected $datarecords = [];
	protected $awalData = 10;
	protected $indexColumnTerpilih = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	protected $fileExcel;

	/**
	 * @param mixed $fileExcel
	 */
	public function setFileExcel($fileExcel)
	{
		$this->fileExcel = $fileExcel;
	}

	/**
	 * @return mixed
	 */
	public function getFileExcel()
	{
		return $this->fileExcel;
	}

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
	 * @internal param $fileExcel
	 *
	 * @internal param int $start
	 * @internal param null $limit
	 *
	 * @return array
	 */
	public function getArrayFileExcel()
	{
		if ($this->getTruncate()) {
			$this->tableTruncateFirst();
		}
		$arr = $this->getExcel()->load($this->getFileExcel());
		$arr = $arr->select($this->indexColumnTerpilih);
		$arr = $arr->toArray();
		/*Check Kolom*/
		foreach ($arr as $no => $kolom) {
			if ($no > $this->rowheader) {
				$v                    = array_values($kolom);
				$this->datarecords[ ] = $v;
			}
		}
//		return $this->datarecords;
		return $this->processToDb();
	}

	/**
	 * @param int $rowheader
	 */
	public function setRowheader($rowheader)
	{
		$this->rowheader = $rowheader;
	}

	/**
	 * @return int
	 */
	public function getRowheader()
	{
		return $this->rowheader;
	}

	protected function processToDb()
	{
		$limit     = 200;
		$cnt       = 0;
		$sleeptime = 3;
		$importId  = $this->getImportId();
		foreach ($this->datarecords as $record) {
			if ($cnt == $limit) {
				sleep($sleeptime);
				$cnt = 0;
			}
			$newRecord = $this->newRecord($record, $importId);
			$data[ ]   = $newRecord->id;
			$cnt++;
		}


		/**
		 * Lakukan Proses Pemindahan Ke Table Yang memiliki
		 * Import ID dan Status == 1 (berhasil)
		 */
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

		$code_internal = trim($data[ 1 ]);
		$catname       = strtolower(trim($data[ 2 ]));
		$name          = strtolower(trim($data[ 3 ]));
		$typename      = strtolower(trim($data[ 4 ]));
		$nodesign      = strtolower(trim($data[ 5 ]));
		$width         = is_null($data[ 6 ]) ? 0 : intval($data[ 6 ]);
		$weight        = is_null($data[ 7 ]) ? 0 : intval($data[ 7 ]);
		$unitname      = trim($data[ 8 ]);
		$totalLength   = 0; //trim($data[ 9 ]);
		$totalRoll     = 0; //trim($data[ 10 ]);
		$status        = $this->setStatus($data);

		$record =  $this->create([
			"code_internal" => $code_internal,
			"catname"       => $catname,
			"name"          => $name,
			"typename"      => $typename,
			"nodesign"      => $nodesign,
			"width"         => $width,
			"weight"        => $weight,
			"unitname"      => $unitname,
			"status"        => $status,
			"importId"      => $importId,
			"totallength"   => $totalLength,
			"totalroll"     => $totalRoll,
		]);

		if (!$status) {
			$this->failStatuses [] = $record->id;
		}else{
			$this->successStatuses [] = $record->id;
		}

		return $record;
	}

	/**
	 *
	 */
	protected function tableTruncateFirst()
	{
		DB::table($this->table)->truncate();
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
		$code_internal = $data[ 1 ];
		$catname       = $data[ 2 ];
		$name          = $data[ 3 ];
		$typename      = $data[ 4 ];
		$nodesign      = $data[ 5 ];
		$width         = $data[ 6 ];
		$weight        = $data[ 7 ];
		$unitname      = $data[ 8 ];
		$success       = true;
		if (is_null($catname)) $success = false;
		if (is_null($name)) $success = false;
		if (is_null($typename)) $success = false;
		if (is_null($unitname)) $success = false;
		return $success;
	}

	public function sentToQueue($importId, $fileExcel)
	{
		$this->setTruncate(true);
		$this->setFileExcel($fileExcel);
		$this->setImportId($importId);
		$this->getArrayFileExcel();

		\Log::info('List fail status',[$this->failStatuses]);
		\Log::info('List Success status',[$this->successStatuses]);

//		Queue::push('\Emayk\Ics\Queue\Import\Product', ['importId' => $importId, 'fileExcel' => $fileExcel]);
	}

	protected function moveRecordsImportToProductTable(array $listIds){
		foreach ($listIds as $id){

		}
	}
}

 
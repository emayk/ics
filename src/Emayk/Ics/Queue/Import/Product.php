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


namespace Emayk\Ics\Queue\Import;

use Log;

class Product
{
//sentToQueue


	public function fire($job, $data)
	{
//		array('importId' => $importId, 'fileExcel' => $fileExcel)
		Log::info('Import Product dengan Parameter', [$data]);
		$importId  = $data[ 'importId' ];
		$fileExcel = $data[ 'fileExcel' ];
		$model     = $this->getModelImport();
		$model->setFileExcel($fileExcel);
		$model->setImportId($importId);
		$model->setTruncate(true);
		$model->getArrayFileExcel();
		$job->delete();
	}

	protected function getModelImport()
	{
		return new \Emayk\Ics\Repo\Factory\Product\Import\Model();
	}
}

 
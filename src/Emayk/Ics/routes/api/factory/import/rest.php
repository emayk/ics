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

Route::group(['prefix' => 'import'], function () {
	Route::post('product', function () {
		$hasFile = Input::hasFile('product');
		if ($hasFile) {
			$file      = Input::file('product');
			$mime      = $file->getClientMimeType(); // excel : application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
			$fname     = $file->getClientOriginalName();
			$extention = $file->getClientOriginalExtension();
			$debug     = [
				'extention' => $extention,
				'isexcel'   => ( $extention == "xls" ),
				'fname'     => $fname,
				'mime'      => $mime
			];

			$fileExcel = ['xls', 'xlsx', 'csv'];
			$isExcel   = ( in_array($extention, $fileExcel) );
			if ($isExcel) {
			 $destination = Config::get('ics::path.tmp').'/'.date('d_m_y');

				$file->move($destination, $fname);
				return Response::json([
					'success' => true,
					'error'   => true,
					'file'    => $fname,
					'msg'     => 'File ' . $fname . ' akan segera diproses untuk diimport kedalam system',
					'ext'     => $extention
				]);
			} else {
				return Response::json([
					'success' => false,
					'error'   => true,
					'file'    => $file,
				]);
			}

//Done
		}

	});
});
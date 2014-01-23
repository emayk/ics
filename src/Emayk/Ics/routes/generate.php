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

Route::group(['prefix' => 'generate'], function () {
	/*Main Page*/
	Route::get('/', function () {
		if (Input::has('p')) {
			$p = Input::get('p');
			if ($p == 'mib') {
				return 'Welcome to Main Generate MIB';
			}
		};
	});
	/*User admin*/
	Route::get('useradmin', function () {
		$useradmin =  \Emayk\Ics\Repo\Users\Users::generateUserAdmin();
		return $useradmin;
	});
	/*Legalitas*/
	Route::get('legality', function () {
		$legality = new \Emayk\Ics\Repo\Legality\Legality();
		if ($legality::hasDefault()) {
			return 'Sudah ada default legality';
		} else {
			$idcreated = $legality->getIdsDefaultOrCreate();
			return 'Legalitas sudah digenerate dengan id ' . $idcreated;
		}
	});
	/*Type Supplier dan Buyer */
	Route::get('typesupbuy', function () {
		$type = new \Emayk\Ics\Repo\Typesuppliersbuyers\Typesuppliersbuyers();
		$ids  = $type->getIdDefaultTypeOrCreate();
		return "Type Supplier dan Buyer Sudah digenerate ...";
	});

});

 
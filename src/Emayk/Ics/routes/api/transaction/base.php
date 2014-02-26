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


Route::group(['prefix' => 'transaction'], function () {
	Route::get('/', function () {
		echo __LINE__ . ' Transaction';
	});

	/*==========  Register Resource Pengajuan Pembelian  ==========*/
	Route::resource('pr', 'Emayk\Ics\Repo\Transaction\Purchase\Request\Controller');
	Route::resource('prapprove', 'Emayk\Ics\Repo\Transaction\Purchase\Approval\Controller');
	Route::resource('pradjustment', 'Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Controller');
	/*Purchase*/
	Route::group(['prefix' => 'purchase'], function () {
		Route::resource('request', 'Emayk\Ics\Repo\Transaction\Purchase\Request\Controller');
		Route::resource('adjustment/items', '\Emayk\Ics\Repo\Transaction\Purchase\Adjustment\ItemController');
		Route::post('adjustment/process', ['before' => 'csrf','uses'=>'Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Controller@processToAproval']);
		Route::resource('adjustment', 'Emayk\Ics\Repo\Transaction\Purchase\Adjustment\Controller');
		Route::resource('approve', 'Emayk\Ics\Repo\Transaction\Purchase\Approval\Controller');
		Route::resource('order', '\Emayk\Ics\Repo\Transaction\Purchase\Order\Controller');
	});
//
});
 
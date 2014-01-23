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
 **/


Event::listen('product.refresh', function ($product) {
	$cache_total = \Cache::remember('count_products', 10, function () use ($product) {
		return $product->count();
	});
	$total       = $product->count();
	$page        = \Input::get('page');
	if ($total == $cache_total) {
		\Cache::remember('products' . $page, 10, function () use ($product) {
				$product = $product
					->orderBy('updated_at', 'DESC')
					->take(Input::get('limit', 1))
					->skip(Input::get('start', 0))->get();
				return $product;
			});

	} else {
		\Cache::forget('count_products');
		\Cache::forget('products' . $page);
		// Buat Baru
		\Cache::remember('products' . $page, 10, function () use ($product) {
				$product = $product
					->take(Input::get('limit', 1))
					->skip(Input::get('start', 1))->get();
				return $product;
			});
		\Cache::remember('count_products', 10, function () use ($product) {
			return $product->count();
		});
	}
});

Event::listen('user.login', function ($user) {
//
//	Event::fire('user.login', array(
//		array(
//			'msg'  => "{$fullname} {$msg}",
//			'data' => $user
//		)));

//	array(
//		'msg'  => "{$fullname} {$msg}",
//		'data' => "Input {$decode_username},{$decode_password}" )
//		));

	DB::table('sys_log')->insert(array(
		'message'     => $user[ 'msg' ],
		'description' => $user[ 'data' ],
		'created_at'  => \Carbon\Carbon::create(),
		'updated_at'  => \Carbon\Carbon::create()
	));

//		Log::info("user.activity", array(
//			'context' => Auth::getUser(),
//			'level' => 'user.activity',
//			'message' => "{$user}  Has Sucessfully Login",
//			'action' => 'wao'
//		) );

}, 1);

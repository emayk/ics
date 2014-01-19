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

/**
 * History Route
 */
Route::group(array('prefix' => 'history'), function () {
    Route::get('product', function () {
        $fake = \Faker\Factory::create();
        $page = Input::get('page', 1);
        $limit = Input::get('limit', 1);
        $start = Input::get('start', 1);
        $product_id = Input::get('product_id', 1);

//        $prodname = new stdClass();
//        $prodname->id = 1;
//        $prodname->name = 'product ' . $product_id;

        $out = \Cache::remember('product_id' . $product_id, 5, function () use ($fake, $product_id) {
                $out = [];
                for ($i = 1; $i <= rand(10, 200); $i++) {
                    $out[] = array(
                        'id' => $i,
                        'msg' => "[{$product_id} - {$i}] {$fake->text} "
                    );
                }
                return $out;
            });

        $total = count($out);
        return Response::json([
            'success' => true,
            'error' => false,
            'total' => $total,
            'results' => $out
        ]);
    });
});

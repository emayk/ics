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


namespace Emayk\Ics\Repo\Factory\Product\Hpp;


use Emayk\Ics\Models\BaseModel;

class Eloquent extends BaseModel
{
	protected $table = 'master_product_hpp';
	protected $guarded = [];

	public function product()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Factory\Product\Eloquent', 'product_id');
	}


	public function add(\Emayk\Ics\Repo\Factory\Product\Eloquent $product,
	                    $price, $pricemin)
	{
		return $this->create([
			'pricemin' => $pricemin, 'price' => $price, 'product_id' => $product->id
		]);
	}

	/**
	 * Membuat Record Hpp dari Product
	 * Jika Hpp Belum ada  secara massal.
	 *
	 */
	public function createMassalHppProduct()
	{
		$oproducts = new \Emayk\Ics\Repo\Factory\Product\Eloquent();
		$listIds   = $oproducts->lists('id');

		foreach ($listIds as $id) {
			$product = $oproducts->findOrFail($id);
			$hpp     = $product->hpp;
			if (is_null($hpp)) {
				$this->add($product, 0, 0);
			};
		}
	}


}

 
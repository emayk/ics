<?php


Event::listen('product.refresh', function($product)
{
	 $cache_total = \Cache::remember('count_products',10,function() use ($product){
			return $product->count();
	 });
		$total = $product->count();
	 $page = \Input::get('page');
	 if ($total == $cache_total){
			\Cache::remember('products'.$page,10,function() use($product) {
						$product = $product
							->take(Input::get('limit',1))
							->skip(Input::get('start',1))->get();
						return $product;
				 });

	 }else{
//			$products = $product
//				->take(Input::get('limit',1))
//				->skip(Input::get('start',1))->get();
			\Cache::forget('count_products');
			\Cache::forget('products'.$page);
			// Buat Baru
			\Cache::remember('products'.$page,10,function() use($product) {
						$product = $product
							->take(Input::get('limit',1))
							->skip(Input::get('start',1))->get();
						return $product;
				 });
			\Cache::remember('count_products',10,function() use ($product){
				 return $product->count();
			});
	 }
});

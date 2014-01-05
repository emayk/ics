<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateStockWarehouseProductTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('stock_warehouse_product', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('product_id');
			$table->integer('warehouse_id');
			$table->integer('stock_id');
			$table->string('noref', 255);
			$table->integer('count');
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('stock_warehouse_product');
	}

}

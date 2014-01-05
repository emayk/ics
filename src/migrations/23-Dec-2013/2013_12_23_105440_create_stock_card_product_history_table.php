<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateStockCardProductHistoryTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('stock_card_product_history', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('stock_id');
			$table->string('refdoc', 255);
			$table->string('noroll', 255);
			$table->integer('qty_in');
			$table->integer('qty_out');
			$table->integer('qty_balance');
			$table->string('uuid', 255);
			$table->integer('createby_id');
			$table->integer('lastupdateby_id');
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
		Schema::drop('stock_card_product_history');
	}

}

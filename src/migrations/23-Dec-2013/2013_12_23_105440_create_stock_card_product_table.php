<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateStockCardProductTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('stock_card_product', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('tipelokasi_id');
			$table->integer('product_id');
			$table->string('rollnumber', 255);
			$table->integer('lokasigudang_id');
			$table->integer('panjangkain');
			$table->date('onday');
			$table->integer('satuan_id');
			$table->integer('hargabeli');
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
		Schema::drop('stock_card_product');
	}

}

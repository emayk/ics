<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSysHistoryOrderTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('sys_history_order', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('trx_id');
			$table->integer('order_id');
			$table->string('description', 255);
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
		Schema::drop('sys_history_order');
	}

}

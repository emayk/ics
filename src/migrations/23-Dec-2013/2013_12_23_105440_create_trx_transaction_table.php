<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTrxTransactionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('trx_transaction', function(Blueprint $table) {
			$table->increments('id');
			$table->string('doc', 255);
			$table->integer('createby');
			$table->integer('updateby');
			$table->integer('parent_id');
			$table->string('parent_type', 255);
			$table->integer('count_items');
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
		Schema::drop('trx_transaction');
	}

}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTrxOrderTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('trx_order', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('nodoc');
			$table->integer('type_id');
			$table->integer('supplier_id');
			$table->integer('ppn_id');
			$table->integer('warehouse_id');
			$table->integer('paymenttype_id');
			$table->integer('cp_id');
			$table->integer('curr_id');
			$table->date('delivery_at');
			$table->integer('credit');
			$table->integer('kurs');
			$table->integer('approve_id');
			$table->string('uuid', 255);
			$table->boolean('status');
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
		Schema::drop('trx_order');
	}

}

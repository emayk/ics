<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMasterCategoriProductTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('master_categori_product', function(Blueprint $table) {
			$table->increments('id');
			$table->string('name', 255);
			$table->string('info', 255);
			// grade kain
			$table->integer('fabricgrade_id');
			$table->integer('parent_id');
			$table->string('parent_type', 255);
			$table->string('kodeinternal', 255);
			$table->string('uuid', 255);
			// user
			$table->integer('createby_id');
			// user
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
		Schema::drop('master_categori_product');
	}

}

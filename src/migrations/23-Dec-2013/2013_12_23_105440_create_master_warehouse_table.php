<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMasterWarehouseTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('master_warehouse', function(Blueprint $table) {
			$table->increments('id');
			$table->string('name', 255);
			$table->string('address', 255);
			$table->string('city_id', 255);
			$table->integer('cat_id');
			$table->integer('officer_id');
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
		Schema::drop('master_warehouse');
	}

}

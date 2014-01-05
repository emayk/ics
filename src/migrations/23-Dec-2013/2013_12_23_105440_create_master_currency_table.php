<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMasterCurrencyTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('master_currency', function(Blueprint $table) {
			$table->increments('id');
			$table->string('name', 255);
			$table->string('shortname', 10);
			// location
			$table->integer('country_id');
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
		Schema::drop('master_currency');
	}

}

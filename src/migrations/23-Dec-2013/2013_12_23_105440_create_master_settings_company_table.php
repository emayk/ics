<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMasterSettingsCompanyTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('master_settings_company', function(Blueprint $table) {
			$table->increments('id');
			$table->string('name', 255);
			$table->string('address', 255);
			$table->integer('city_id');
			$table->string('phone', 255);
			$table->string('fax', 255);
			$table->integer('createby_id');
			$table->integer('lastupdateby_id');
			$table->string('uuid', 255);
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
		Schema::drop('master_settings_company');
	}

}

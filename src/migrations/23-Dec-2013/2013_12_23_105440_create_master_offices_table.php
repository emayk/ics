<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMasterOfficesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('master_offices', function(Blueprint $table) {
			$table->increments('id');
			$table->string('address', 255);
			$table->integer('country_id');
			$table->integer('province_id');
			$table->integer('city_id');
			$table->string('postcode', 255);
			// main or branch
			$table->integer('type');
			$table->integer('parent_id');
			$table->string('parent_type', 255);
			$table->string('codeinternal', 255);
			$table->boolean('mainoffice');
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
		Schema::drop('master_offices');
	}

}

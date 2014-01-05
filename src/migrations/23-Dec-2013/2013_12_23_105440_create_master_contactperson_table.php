<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMasterContactpersonTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('master_contactperson', function(Blueprint $table) {
			$table->increments('id');
			$table->string('name', 255);
			$table->string('info', 255);
			$table->integer('position_id');
			$table->integer('departement_id');
			$table->string('nohp', 30);
			$table->string('email', 30);
			$table->string('fax', 255);
			$table->integer('parent_id');
			$table->string('parent_type', 255);
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
		Schema::drop('master_contactperson');
	}

}

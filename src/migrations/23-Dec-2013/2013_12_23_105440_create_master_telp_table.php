<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMasterTelpTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('master_telp', function(Blueprint $table) {
			$table->increments('id');
			$table->string('telp', 255);
			$table->string('info', 255);
			$table->integer('parent_id');
			$table->string('parent_type', 255);
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
		Schema::drop('master_telp');
	}

}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateImagesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('sys_images', function(Blueprint $table) {
			$table->increments('id');
			$table->string('name', 255);
			$table->string('info', 255);
			$table->string('filename', 255);
			$table->string('location', 255);
			$table->string('url', 255);
			$table->string('thumbfile', 255);
			$table->integer('imageable_id');
			$table->string('imageable_type', 255);
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
		Schema::drop('sys_images');
	}

}

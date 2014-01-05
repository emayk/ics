<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateLogVisitorTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('sys_log_visitor', function(Blueprint $table) {
			$table->increments('id');
			$table->string('ip', 255);
			$table->string('location', 255);
			$table->string('current_page', 255);
			$table->string('userid', 255);
			$table->string('username', 255);
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
		Schema::drop('log_visitor');
	}

}

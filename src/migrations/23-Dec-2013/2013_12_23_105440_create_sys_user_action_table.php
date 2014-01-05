<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSysUserActionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('sys_user_action', function(Blueprint $table) {
			$table->increments('id');
			$table->string('name', 255);
			$table->integer('counter');
			$table->integer('menu_id');
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
		Schema::drop('sys_user_action');
	}

}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSysUserHistoryTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('sys_user_history', function(Blueprint $table) {
			$table->increments('id');
			$table->string('message', 255);
			$table->integer('parent_id');
			$table->string('parent_type', 255);
			$table->text('info');
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
		Schema::drop('sys_user_history');
	}

}

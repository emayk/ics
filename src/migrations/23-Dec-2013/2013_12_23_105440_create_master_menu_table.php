<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMasterMenuTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('master_menu', function(Blueprint $table) {
			$table->increments('id');
			$table->string('text', 45);
			$table->string('iconCls', 15);
			$table->integer('parent_id');
			$table->string('className', 45);
			$table->string('qtip', 255);
			$table->string('qtitle', 255);
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
		Schema::drop('master_menu');
	}

}

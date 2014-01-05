<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMasterUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('master_users', function(Blueprint $table) {
			$table->increments('id');
			$table->string('username', 30);
			$table->string('fullname', 30);
			$table->string('email', 30);
			$table->integer('jabatan_id');
			$table->integer('departement_id');
			$table->integer('warehouse_id');
			$table->integer('status_id');
			$table->string('password', 255);
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
		Schema::drop('master_users');
	}

}

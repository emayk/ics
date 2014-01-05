<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMasterAccountBankTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('master_account_bank', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('bank_id');
			$table->string('number', 255);
			$table->string('name', 255);
			$table->integer('owner_id');
			$table->string('owner_type', 255);
			$table->integer('type_id');
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
		Schema::drop('master_account_bank');
	}

}

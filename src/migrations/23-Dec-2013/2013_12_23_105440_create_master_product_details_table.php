<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMasterProductDetailsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('master_product_details', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('product_id');
			$table->integer('warna_id');
			$table->integer('satuan_id');
			$table->integer('gradekain_id');
			$table->decimal('hargajual');
			$table->decimal('hargajualmin');
			$table->integer('currhj_id');
			$table->integer('currhjm_id');
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
		Schema::drop('master_product_details');
	}

}

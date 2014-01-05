<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMasterSupplierTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('master_supplier', function(Blueprint $table) {
			$table->increments('id');
			$table->string('name', 255);
			$table->string('codepos', 255);
			$table->string('npwp', 255);
			$table->string('fax', 255);
			$table->string('email', 255);
			$table->decimal('plafon');
			$table->integer('kredit');
			$table->datetime('deleted_at')->nullable();
			$table->string('alamat', 255);
			$table->string('rt', 255);
			$table->string('rw', 255);
			$table->string('phone', 255);
			$table->integer('status_id');
			$table->integer('tipe_id');
			$table->integer('legalitas_id');
			$table->integer('typeprod_id');
			$table->integer('negara_id');
			$table->integer('province_id');
			$table->integer('city_id');
			$table->string('uuid', 255);
			$table->integer('createby_id');
			$table->integer('lastupdateby_id');
			$table->string('codeinternal', 255);
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
		Schema::drop('master_supplier');
	}

}

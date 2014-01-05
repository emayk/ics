<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMasterProductsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('master_products', function(Blueprint $table) {
			$table->increments('id');
			$table->string('name', 255);
			$table->string('nodesign', 255);
			$table->string('kontruksi', 255);
			$table->integer('supplier_id');
			$table->integer('kategori_id');
			$table->integer('tipe_id');
			$table->string('berat', 255);
			$table->integer('beratsatuan_id');
			$table->integer('lebar');
			$table->integer('lebarsatuan_id');
			$table->string('kodeinternal', 255);
			$table->integer('parent_id');
			$table->string('parent_type', 255);
			$table->integer('gambar_id');
			$table->datetime('deleted_at')->nullable();
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
		Schema::drop('master_products');
	}

}

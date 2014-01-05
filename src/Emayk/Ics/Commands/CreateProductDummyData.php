<?php namespace Emayk\Ics\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use Illuminate\Database\Schema;

class CreateProductDummyData extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'ics:seed:product';
	protected $table = '';
	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Buat data Product dengan Records';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function fire()
	{
		//
	}

	protected function createTable()
	{

			'name'
			'nodesign',
			'kontruksi',
			'supplier_id',
			'kategori_id',
			'tipe_id',
			'berat',
			'beratsatuan_id',
			'lebar',
			'lebarsatuan_id',
			'kodeinternal',
			'parent_id',
			'parent_type',
			'gambar_id',
			'deleted_at',
			'uuid',
			'createby_id',
			'lastupdateby_id',
			'created_at',
			'updated_at',
	}
	/**
	 * Get the console command arguments.
	 *
	 * @return array
	 */
	protected function getArguments()
	{
		return array(
			array('example', InputArgument::REQUIRED, 'An example argument.'),
		);
	}

	/**
	 * Get the console command options.
	 *
	 * @return array
	 */
	protected function getOptions()
	{
		return array(
			array('example', null, InputOption::VALUE_OPTIONAL, 'An example option.', null),
		);
	}

}

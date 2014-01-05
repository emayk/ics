<?php namespace Emayk\Ics\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use \File;
class CreateMigrationCommand extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'ics:migration:create';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Buat Migration Table';

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
		$this->call('ics:about');
		$this->deleteDirectoryMigrationFirst();
		foreach ($this->tables() as $table) {$this->createModel($table); }
	}

	/**
	 * Get the console command arguments.
	 *
	 * @return array
	 */
	protected function getArguments()
	{
		return array(
			// array('', InputArgument::OPTIONAL, 'An example argument.'),
		);
	}
	protected function createModel($table)
	{
		if (!empty($table)) {
			$this->info('Process Create Table Migration for '. $table);
			$path = $this->makeMigrationPath();
			$this->call('migration-generate',
			            array('tables' => $table ,
			                  '--path' => $path
			                  )
			            );
		}
	}

	protected function deleteDirectoryMigrationFirst()
	{
		return $this->makeMigrationPath(true);
	}

	protected function makeMigrationPath($emptyFirst = false)
	{
 				$path = base_path('workbench/emayk/ics/src/migrations/');
 				$pathMigration = $path.date('d-M-Y');
 				if ( !File::exists( $pathMigration )){
	 					if (File::isWritable($path)) File::makeDirectory($pathMigration);
 				};

 				if ($emptyFirst){File::cleanDirectory($pathMigration); };
 				if (File::isDirectory($pathMigration)) {return $pathMigration; }
	}
	/**
	 * Get the console command options.
	 *
	 * @return array
	 */
	protected function getOptions()
	{
		return array(
			array('backup', null, InputOption::VALUE_OPTIONAL, 'Mode Backup', null),
		);
	}

	protected function tables()
	{
			return array(
			'images',
			'log_visitor',
			'master_account_bank',
			'master_approval_type',
			'master_bank',
			'master_buyers',
			'master_categori_product',
			'master_contactperson',
			'master_currency',
			'master_departement',
			'master_gradekain',
			'master_jabatan',
			'master_jeniskain',
			'master_legalitas',
			'master_location',
			'master_menu',
			'master_officer_user',
			'master_offices',
			'master_orders_type',
			'master_payment_type',
			'master_product_details',
			'master_products',
			'master_satuan',
			'master_satuan_type',
			'master_settings_company',
			'master_settings_program',
			'master_status',
			'master_status_Order',
			'master_supplier',
			'master_telp',
			'master_tipe_product',
			'master_tipe_supplier_buyer',
			'master_type_bank',
			'master_type_ppn',
			'master_users',
			'master_warehouse',
			'master_warehouse_category',
			'master_warna',
			'migrations',
			'payment_dp_kain',
			'payment_dp_umum',
			'permissions',
			'stock_card_product',
			'stock_card_product_history',
			'stock_warehouse_product',
			'sys_changelog',
			'sys_history_order',
			'sys_user_action',
			'sys_user_history',
			'trx_approval',
			'trx_order',
			'trx_order_detail',
			'trx_transaction'
			);
	}
}

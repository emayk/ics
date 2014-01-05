<?php namespace Emayk\Ics\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class CreateRepoCommand extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'ics:repo:create';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Membuat Structural Source Code Laravel';

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
		$this->process();
	}

	protected function process(){
		$this->comment('Membuat Controller');
	}
	/**
	 * Get the console command arguments.
	 *
	 * @return array
	 */
	protected function getArguments()
	{
		return array(
			 array('name', InputArgument::REQUIRED, 'Nama Structural Namespace Code'),
//			array('example', InputArgument::OPTIONAL, 'An example argument.'),
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
//			array('interface', null, InputOption::VALUE_OPTIONAL, 'An example option.', null),
		);
	}

}

<?php namespace Emayk\Ics\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class CreateControllerCommand extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'ics:create:controller';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Buat Controller Ics';
	// protected $filename;

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
		$controller = $this->argument('controller');
		// $is_dir =  \File::isDirectory($this->defaultPath());
		$this->createController($controller);
	}
	protected function fileExist($file)
	{
		$f = $this->defaultPath().'/'.$file;
		return  \File::exists($f);
	}
	/**

		TODO:
		- Menentukan Apakah Path Yang dimasukan valid
		-

	**/
	public function createController($controller)
	{
		$filename = $this->defaultPath().'/'.$controller.'Controller.php';
		if (\File::exists($filename)){
				$this->error('File Sudah Ada, Buat Controller Gagal');
		}else{
		$this->info('[Begin] Create Controller '.$controller);
		$this->call('generate:controller',
			            array('name' => $controller.'Controller' ,
			                  '--path' => $this->defaultPath(),
			                  '--template' => $this->templatefile()
			                  )
			            );
		$this->info('[Done] Create Controller '. $controller);
		}
	}

	/**
	 * Get the console command arguments.
	 *
	 * @return array
	 */
	protected function getArguments()
	{
		return array(
			array('controller', InputArgument::REQUIRED, 'Name Of Controller'),
		);
	}

	protected function defaultPath()
	{
		return base_path('workbench/emayk/ics/src/Emayk/Ics/Controllers');
	}

	protected function templatefile()
	{
		return base_path('workbench/emayk/ics/src/Emayk/Ics/Support/Templates/Generator/Controller.txt');
	}
	/**
	 * Get the console command options.
	 *
	 * @return array
	 */
	protected function getOptions()
	{
		$defaultPath = $this->defaultPath();
		return array(
			// array('path', null, InputOption::VALUE_OPTIONAL, 'Path Location Generate Model default '.$defaultPath, null),
		);
	}

}

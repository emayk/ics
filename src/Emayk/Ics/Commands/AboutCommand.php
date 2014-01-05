<?php namespace Emayk\Ics\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class AboutCommand extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'ics:about';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Integrated Central System';

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
			$this->about();
	}

	protected function about()
	{
		$this->info("=================================");
		$this->info("Integrated Central System");
		$this->info("=================================");
		$this->info('');
		$this->info("[".date('d M Y h:i:s')."] Create By Emay");
		$this->info("=================================");
				$chat = new \Emayk\Ics\Support\Dummy\Chat();
				$echoserver = new \Ratchet\Server\EchoServer();
				$app = new \Ratchet\App('localhost', 8080);
				$app->route('/chat', $chat);
				$app->route('/echo', $echoserver, array('*'));
				$app->run();
		$this->info("=================================");

	}
	/**
	 * Get the console command arguments.
	 *
	 * @return array
	 */
	protected function getArguments()
	{
		return array(
			array('path', InputArgument::OPTIONAL, 'Path to Generate.'),
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

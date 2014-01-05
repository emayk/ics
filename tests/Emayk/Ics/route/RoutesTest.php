<?php namespace Emayk\Ics\Test\Route;
use Emayk\Ics\IcsTestCase;
// use Orchestra\Testbench\TestCase;
// class ProductControllerTest extends TestCase {
class RouteTest extends IcsTestCase {

	/**
	*
	*/
	protected $root;
		function __construct()
		{
				$this->root = $this->getRoot();
		}
	/**
	 * A basic functional test example.
	 *
	 * @return void
	 */
	public function testApiRoot()
	{
		$root = $this->getRoot();
		$crawler = $this->client->request('GET', '/'.$root);
		$this->assertTrue($this->responseOk());
	}

	public function testLogin(){
		// $response = $this->call('POST', $this->getRoot().'/login.php');
		// $response = $this->call($method, $uri, $parameters, $files, $server, $content);
	}

	public function testHelp(){
		// $response = $this->action('GET', 'HomeController@index');

	}

	public function testControllerMenu()
	{
		$this->call('GET', '/'.$this->getRoot().'/api/menu');
		$this->assertTrue($this->responseOk());
        $this->action('GET', 'Emayk\Ics\Repo\Menu\MenuController@index');
	}
}
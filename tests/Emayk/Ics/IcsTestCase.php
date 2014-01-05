<?php namespace Emayk\Ics;
	/**
		* This file is part of ICS API by Emay Komarudin
		*
		* Licensed under the Apache License, Version 2.0 (the "License");
		* you may not use this file except in compliance with the License.
		* You may obtain a copy of the License at
		*
		* Unless required by applicable law or agreed to in writing, software
		* distributed under the License is distributed on an "AS IS" BASIS,
		* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
		* See the License for the specific language governing permissions and
		* limitations under the License.
		*
		* @author Emay Komarudin
		* @category Testing
	 */
use \Orchestra\Testbench\TestCase;
use \Config;
class IcsTestCase extends TestCase {

  protected $facades = ['view','message','output','view'];

	 protected function getPackageProviders()
    {
        return array('Emayk\\Ics\\IcsServiceProvider');
    }

     protected function getPackageAliases()
    {
        return array(
            'Icsconfig' => 'Emayk\\Ics\\Facades\\Config'
        );
    }

    protected function getAliasConfig(){
    	return array(
            'Icsconfig' => 'Emayk\Ics\Facades\Config'
        );
    }

    protected function getAliasMessage(){
    	return array(
            'Icsmessage' => 'Emayk\Ics\Facades\Message'
        );
    }

    protected function getAliasOutput(){
    	return array(
            'Icsoutput' => 'Emayk\Ics\Facades\Output'
        );
    }

    protected function getAliasView(){
    	return array(
            'Icsview' => 'Emayk\Ics\Facades\View'
        );
    }

    protected function getAlias($facade = 'config',$prefix = 'ics' ){
	    	return array(
	            ucfirst($prefix).$facade => 'Emayk\Ics\Facades\\'.ucfirst($facade)
	        );
    }
    public function testAlias(){
        $alias = array('Icsconfig'=> 'Emayk\Ics\Facades\Config');
        $this->assertSame($alias,$this->getAlias('config'), 'Get Alias Beda');
    }

    protected function getBaseUrlIcs(){
        return 'ics';
    }

    protected function responseOk(){
        return $this->client->getResponse()->isOk();
    }

    protected function getRoot(){
        return $this->getBaseUrlIcs();
    }

    public function sendRequest($route,$metode = 'GET'){
        return $this->client->request($metode,$route);
    }


      /**
       * Setup the application environment.
       *
       * @param  \Illuminate\Foundation\Application  $app
       * @return void
       */
      protected function getEnvironmentSetUp($app)
      {
          $app['config']->set('database.default', 'mysql');
          $app['config']->set('database.connections.mysql', array(
            'driver'    => 'mysql',
            'host'      => 'localhost',
            'database'  => 'ics2',
            'username'  => 'ics2',
            'password'  => 'ics2',
            'charset'   => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix'    => '',
          ));


      }

  /**
       * Setup the test case.
       *
       * @return void
       */
      public function setUp()
      {
          parent::setUp();

         $this->start();
      }

      /**
       * Run extra setup code.
       *
       * @return void
       */
      protected function start()
      {
          // define more setup methods
     }

      /**
       * Tear down the test case.
       *
       * @return void
       */
      public function tearDown()
      {
          parent::tearDown();

         $this->finish();
      }

      /**
       * Run extra tear down code.
       *
       * @return void
       */
      protected function finish()
      {
          // define more tear down methods
      }
    protected  function  getApiUrl($api='/'){
        return $this->getRoot().'/api/'.$api;
    }
}
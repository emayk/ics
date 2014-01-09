<?php namespace Emayk\Ics;

			/**
			 * Copyright (C) 2013  Emay Komarudin
			 * This program is free software: you can redistribute it and/or modify
			 * it under the terms of the GNU General Public License as published by
			 * the Free Software Foundation, either version 3 of the License, or
			 * (at your option) any later version.
			 *
			 * This program is distributed in the hope that it will be useful,
			 * but WITHOUT ANY WARRANTY; without even the implied warranty of
			 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
			 * GNU General Public License for more details.
			 * You should have received a copy of the GNU General Public License
			 * along with this program. If not, see <http://www.gnu.org/licenses/>.
			 *
			 * @author Emay Komarudin
			 *
			 * Model Structure Eloquent
			 *
			 **/
	 /*===========================================
	=            Service Provide ICS            =
	===========================================*/
	 use Illuminate\Support\ServiceProvider;
	 use Illuminate\Foundation\AliasLoader;
	 use \Config as CoreConfig;
	 use \DB;
	 use Emayk\Ics\Support,
		 Emayk\Ics\Config,
		 Emayk\Ics\View,
		 Emayk\Ics\Commands,
		 Emayk\Ics\Export,
		 Emayk\Ics\Message,
		 Emayk\Ics\Support\Log,
		 Emayk\Ics\Extjs,
		 Emayk\Ics\Repo;

	 class IcsServiceProvider extends ServiceProvider
	 {

			/**
			 * Indicates if loading of the provider is deferred.
			 *
			 * @var bool
			 */
			protected $defer = false;
		  protected $version = 'v1.0.0.beta';

			/**
			 * Bootstrap the application events.
			 *
			 * @return void
			 */
			public function boot ()
			{
				 $this->package ('emayk/ics');
				 include __DIR__ . '/routes/root.php';
				 include __DIR__ . '/Service/helpers.php';
				 include __DIR__ . '/Service/Boot/BootServiceProvider.php';
				 include __DIR__ . '/Service/Register/RegisterEvent.php';
			}

			/**
			 * Register the service provider.
			 *
			 * @return void
			 */
			public function register ()
			{
				 $this->register_config ();
				 $this->register_view ();
				 $this->register_message ();
				 $this->register_menu ();
				 $this->register_output ();
				 $this->register_commands ();
				 require __DIR__ . '/Service/ServiceProvider.php';
				 require __DIR__ . '/Service/RegisterRepoInterface.php';
				 require __DIR__ . '/Service/ErrorHandling.php';
				 $this->register_export_dompdf ();
				 $this->register_exjs ();
			}

			/**
			 *
			 * Mendaftarkan Menu
			 *
			 **/


			protected function register_menu ()
			{

				 $this->app->bindIf ('Emayk\Ics\Repo\Menu\MenuInterface', function () {
						return (! $this->useEloquent ())
							? new Repo\Menu\MenuArray()
							: new Repo\Menu\MenuEloquent(new Repo\Menu\Menu());
				 });
			}

			protected function register_exjs ()
			{
				 $this->app->bindIf ('Emayk\Ics\Extjs\ExtjsDirectInterface', function () {
						return new Extjs\Extjsdirect();
				 });

				 $this->app['icsextjsdirect'] = $this->app->share (function ($app) {
						return new Extjs\Extjsdirectx();
				 });
				 $this->setAliasIcs ('Extjsdirect', 'ExtjsDirect');

			}

			protected function register_output ()
			{
				 $this->app->bindIf ('Emayk\Ics\Support\OutInterface', function () {
						return new Support\Output();
				 });

				 $this->app['icsoutput'] = $this->app->share (function ($app) {
						return new Support\Output();
				 });
				 $this->setAliasIcs ('Icsoutput', 'Output');

			}

			protected function register_config ()
			{
				 $this->app->bindIf ('Emayk\Ics\Config\ConfigInterface', function () {
						return new Config\Config();
				 });
				 $this->app['icsconfig'] = $this->app->share (function ($app) {
						return new Config\Config();
				 });
				 $this->setAliasIcs ('Icsconfig', 'Config');
			}

			protected function register_export_dompdf ()
			{
				 // $this->register_bindIf('Emayk\Ics\Export\Pdf\PdfInterface','Export\Pdf\DomPdf');
				 // $this->app['icspdf'] = $this->app->share(function($app) {return new Export\Pdf\DomPdf(); });
				 $this->setAliasIcs ('Icspdf', 'Pdf');
			}


			protected function isEmpty ($str)
			{
				 return (empty($str));
			}

			protected function register_view ()
			{
				 $this->registerClassToContainer (
						'Emayk\Ics\View\ViewInterface',
						'Emayk\Ics\View\View',
						true,
						'ICSVIEW',
						'View'
				 );
			}

			protected function sendClassToContainerShare ($name, $class)
			{
				 return $this->register_share ($name, $class);
			}

			protected function register_message ()
			{
				 $this->registerClassToContainer (
						'Emayk\Ics\Message\MessageInterface',
						$this->getMessageTypeSystem (),
						true,
						'icsmessage',
						'Message'
				 );
			}

			protected function getMessageTypeSystem ()
			{
				 return ($this->isMessageTypeArray ())
					 ? 'Emayk\Ics\Message\MessageArray'
					 : 'Emayk\Ics\Message\Pusher\Pusher';

			}

			public function setMessageType ()
			{
				 /**
					*
					* TODO:
					* - Hanya Mendukung Pusher dan Array
					* - Validasikan Jika Type Message array atau Pusher
					**/
				 return ($this->isMessageTypeArray ()) ? new Message\MessageArray() : new Message\Pusher\Pusher();
			}

			protected function isMessageTypeArray ()
			{

				 return (CoreConfig::get ('ics::messageType') == 'array');
			}

			protected function useEloquent ()
			{
				 return true;
			}

			protected function setAliasIcs ($alias, $Facade)
			{

				 $this->app->booting (function () use ($alias, $Facade) {
						$loader = AliasLoader::getInstance ();
						$loader->alias ($alias, 'Emayk\Ics\Facades\\' . $Facade);
				 });
			}

			protected function register_share ($name, $concrete)
			{
				 $this->app[$name] = $this->app->share (function ($app) use ($concrete) {
						return new $concrete();
				 });
			}

			protected function registerInterfaceToClass ($interface, $class)
			{
				 return $this->register_bindIf ($interface, $class);
			}


			protected function register_bindIf ($interface, $concrete)
			{
				 $this->app->bindIf ($interface, function () use ($concrete) {
						return new $concrete();
				 });

			}

			/**
			 *
			 * Mendaptarkan Class Ke Container
			 * Mode Share
			 *
			 * @param  string  $interface Namespace Class Interface
			 * @param  string  $class     Class Binding dari Interface
			 * @param  boolean $setAlias  Mode Buat Alias
			 * @param string   $nameAlias Nama Alias Yang akan digunakan
			 * @param string   $facade    nama Facade yang digunakan dari class alias
			 *
			 **/

			protected function registerClassToContainer ($interface, $class, $setAlias = false, $nameAlias = '', $facade = '')
			{
				 $this->registerInterfaceToClass ($interface, $class);
//		 $objClass = strtolower($class);
				 if ($setAlias) {
						if (! empty($nameAlias)) {
							 if (! empty($facade)) {
									$this->sendClassToContainerShare (strtolower ($nameAlias), $class);
									$this->setAliasIcs (ucfirst (strtolower ($nameAlias)), $facade);
							 }
						}
				 }
			}

			/*==========  Commands  ==========*/
			/**
			 *
			 * Register Command About
			 *
			 **/

			public function register_commands ()
			{
				 require __DIR__ . '/Service/RegisterCommand.php';
			}

			/**
			 * Get the services provided by the provider.
			 *
			 * @return array
			 */
			public function provides ()
			{
				 return array (
						'icsconfig',
						'icsview',
						'icsmessage',
						'icspdf'
				 );
			}

			protected function logSystem()
			{
				 $logtable = 'sys_log';
				 if (!\Schema::hasTable($logtable))
				 {
						\Schema::create($logtable, function($table)
						{
							 $table->increments('id');
							 $table->string('message');
							 $table->mediumText('description');
							 $table->timestamps();
						});

				 }else{
							 if (!\Schema::hasColumn($logtable, 'message'))
							 {
									\Schema::table($logtable, function($table)
									{
										 $table->string('message')->after('id');
									});
							 }
				 }

			}

	 }


			/*-----  End of Service Provide ICS  ------*/

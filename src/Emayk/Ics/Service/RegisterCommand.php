<?php
/**
*
* Register Command
*
**/
use Emayk\Ics\Commands;
	$this->app['ics.about'] = $this->app->share(function($app)
			{
				return new  Commands\AboutCommand();
			});

		/*==========  Repo Command  ==========*/
		$this->app['ics.repo.create'] = $this->app->share(function($app)
			{
				return new Commands\CreateRepoCommand();
			});

		$this->app['ics.migration.create'] = $this->app->share(function($app)
			{
				return new Commands\CreateMigrationCommand();
			});

		$this->app['ics.create.controller'] = $this->app->share(function($app)
			{
				return new Commands\CreateControllerCommand();
			});

		$this->commands(
		                'ics.about',
		                'ics.repo.create',
		                'ics.migration.create',
		                'ics.create.controller'
	                );
<?php
use Emayk\Ics\Repo,
Emayk\Ics\Support ;

/**
*
* File ini Hanya mendaptarkan semua interface dan alias yang digunakan di applikasi ICS
*
* Tujuan :
* Hanya Untuk Lebih Rapi
*
**/

/*==========  Register Chrome Log  ==========*/
/**
*
* Register Log Chrome
*
**/


$used_log_chrome = \Config::get('app.debug');
 $this->app->bindIf('Emayk\Ics\Support\Log\LogInterface', function() use ($used_log_chrome)
        {
				    	// return new Support\Log\Chrome\Chrome($used_log_chrome);
				    	return new Support\Log\FirePhp();

        });

$this->app['icslogchrome'] = $this->app->share(function($app) use ($used_log_chrome)
			    {
				    	// return new Support\Log\Chrome\Chrome($used_log_chrome);
				    	return new Support\Log\FirePhp();
			    });

$this->setAliasIcs('Icslogchrome','LogChrome');
/*==========  /Register Chrome Log  ==========*/

/*==========  Register Markdown  ==========*/
App::bindIf('Emayk\Ics\Support\Markdown\MarkdownInterface',function($app){
		return new Support\Markdown\Markdown();
});
$this->app['icsmarkdown'] = $this->app->share(function($app) use ($used_log_chrome)
			    {
							return new Support\Markdown\Markdown();
			    });

$this->setAliasIcs('Icsmarkdown','Markdown');
/*==========  /Register Markdown  ==========*/
$this->setAliasIcs('Icsexcel','Excel');




//Buat Dummy Data
	 $this->app['icsfaker'] = $this->app->share(function($app)
	 {
//			return Faker\Factory::create();
			return new Support\Dummy\Dummy();
	 });

	 $this->setAliasIcs('Icsdummy','Dummy');

<?php

return Array(
	'appName' => 'Application of ICS (Integrated Central System)',
	'prefix_url' => 'ics',
	'programmer' => 'Emay Komarudin',
	'version' => 'v.1.0.beta',
	'debug' => true,
	'license' => 'CV.MIB',
	/**
	*
	* Menggunakan Type Message apa
	* pilihan : pusher, array
	**/

	'messageType' => 'pusher',
	'path' => array(
		'logger' => storage_path().'/logs'
	)

);
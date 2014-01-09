<?php

return Array(
	'appName' => 'Ics',
	'programmer' => 'Emay Komarudin',
	'version' => '',
	/**
	*
	* Menggunakan Type Message apa
	* pilihan : pusher, array
	**/

	'messageType' => 'pusher',
	'path' => array(
		'baseUrl' => 'ics',
		'logger' => storage_path().'/logs',
		/**
		 * Lokasi Framework Extjs 4.2
		 * relative dari public_path
		 * cth : '/extjs' => http://example.com/extjs
		 */
		'extjs' => '/extjs',
	)



);

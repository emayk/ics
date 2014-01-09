/**
*
* Controller changelog
*
* Programmer By Emay Komarudin.
* 2013
*
*
* Description Controller changelog
*
*
**/

Ext.define('App.controller.cchangelog',{
	extend: 'Ext.app.Controller',
	views: ['App.view.changelog.vchangelog'],
	models:['App.model.changelog.mchangelog'],
	stores:['App.store.changelog.schangelog'],
	init: function(){
		log('Controller cchangelog Loaded');
	}
});


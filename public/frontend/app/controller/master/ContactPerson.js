// Controller Menu
Ext.define('App.controller.master.ContactPerson',{
	extend: 'Ext.app.Controller',
	views:['master.contactperson.List'],
	models:['ContactPerson'],
	stores:['ContactPersons'],
	init: function(){
		 log(' ContactPerson Controller Init');

	},
	onLaunch: function(){
		// Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
	}
});

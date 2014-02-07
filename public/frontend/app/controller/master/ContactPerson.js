// Controller Menu
Ext.define('App.controller.master.ContactPerson',{
	extend: 'Ext.app.Controller',
	views:['App.view.master.contactperson.List'],
	models:['App.model.ContactPerson'],
	stores:['App.store.ContactPersons'],
	init: function(){
		 log(' ContactPerson Controller Init');
	},
	onLaunch: function(){
		// Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
	}
});

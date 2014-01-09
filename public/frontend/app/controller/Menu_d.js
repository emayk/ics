/**
*
* Controller Menu
*
**/

Ext.define('App.controller.Menu',{
	extend: 'Ext.app.Controller',
	views:[
	'menu.Master',
	'Tabs',
	// 'form.User',
	'grid.orders',
	'layout.Menuaccordion',
	'App.view.profile.tabChangePassword',
	'App.form.profile.ChangePassword'
	],
	stores:[
		'menu.Masters',
		'menu.Transactions',
		'menu.Profiles',
	],
	init: function(){
		 log('Menu Init');
	}
});

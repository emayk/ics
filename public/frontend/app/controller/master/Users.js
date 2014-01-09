Ext.define('App.controller.master.Users',{
	extend: 'Ext.app.Controller',
	views:[
		'master.user.List'
	],
	models:['User','Status'],
	stores:['Users','Status'],
	init: function() {
		log('User Controller Loaded');
	}
});

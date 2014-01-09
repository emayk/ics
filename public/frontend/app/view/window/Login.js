Ext.define('App.view.window.Login', {
	extend: 'Ext.window.Window',
	alias: 'widget.winLogin',
	requires:[
	'App.view.form.Login'
	],
	title: 'Please Login',
	height: 140,
	width: 300,
	layout: 'fit',
	items: [
	{xtype: 'formLogin'}
	]
});//.show();
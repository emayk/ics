/**
 *
 * Windows Bank Add
 *
 **/

Ext.define('App.view.master.bank.addWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.bankAddWindow',
	requires: [
		'App.view.master.bank.AddForm'
	],
	title: 'Bank Information',
	layout: 'fit',
	items: [
		{xtype: 'masterbankwindowedit'}
	]
});
 
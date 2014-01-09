
Ext.define('App.view.Orders.wizard.Orders',{
	extend : 'Ext.window.Window',
	alias : 'widget.winWizCreateOrder',
	modal: true,
	closable : false,
	autoScroll: true,
	bodyPadding : 2,
	layout: { type : 'fit' , align : 'stretch'},
	items: [
		{ xtype : 'wizardOrder'}
	],
})
Ext.define('App.view.setup.currency',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.wizard_setup_currency',
	itemId: 'page-currency',
	layout: { type: 'vbox'},

	items:[
		{xtype: 'container', html: '<h1>Page currency</h1>', flex: .1},
		{xtype: 'container', html: 'Content Help Here', flex: .8},
	],

	initComponent: function(){ this.callParent(); log('Page currency Wizard Loaded'); },

})
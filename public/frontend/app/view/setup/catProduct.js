Ext.define('App.view.setup.catProduct',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.wizard_setup_catproduct',
	itemId: 'page-catproduct',
	layout: { type: 'vbox'},

	items:[
		{xtype: 'container', html: '<h1>Page Category Product</h1>', flex: .1},
		{xtype: 'container', html: 'Content Help Here, Memerlukan JenisKain', flex: .8},
	],
	initComponent: function(){ this.callParent(); log('Page catproduct Wizard Loaded'); },

})
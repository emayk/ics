
Ext.define('App.view.setup.catWarehouse',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.wizard_setup_category_warehouse',
	itemId: 'page-catwarehous',
	layout: { type: 'vbox'},

	items:[
		{xtype: 'container', html: '<h1>Page Category Warehouse</h1>', flex: .1},
		{xtype: 'container', html: 'Content Help Here', flex: .8},
	],
	// buttons: [
	// 	{ text: 'Prev', handler: function () { prev_page(this,'page-welcome'); } },
	//     { text: 'Next', handler: function () { next_page(this,'page-finish'); } }
 //    ],
	initComponent: function(){ this.callParent(); log('Page Category Warehouse Wizard Loaded'); },

})
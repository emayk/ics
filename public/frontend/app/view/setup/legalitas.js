Ext.define('App.view.setup.legalitas',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.wizard_setup_legalitas',
	itemId: 'page-legalitas',
	layout: { type: 'vbox'},

	items:[
		{xtype: 'container', html: '<h1>Page legalitas</h1>', flex: .1},
		{xtype: 'container', html: 'Content Help Here', flex: .8},
	],
	// buttons: [
	//     { text: 'Prev', handler: function () { setup_prev_page(this,'page-unit'); } },
	//     { text: 'Next', handler: function () { setup_next_page(this,'page-departement'); } }
 //    ],
	initComponent: function(){ this.callParent(); log('Page legalitas Wizard Loaded'); },

})
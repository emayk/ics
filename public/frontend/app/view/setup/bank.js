Ext.define('App.view.setup.bank',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.wizard_setup_bank',
	itemId: 'page-bank',
	layout: { type: 'vbox'},

	items:[
		{xtype: 'container', html: '<h1>Page bank</h1>', flex: .1},
		{xtype: 'container', html: 'Content Help Here', flex: .8},
	],
	// buttons: [
	//     { text: 'Prev', handler: function () { setup_prev_page(this,'page-jabatan'); } },
	//     { text: 'Next', handler: function () { setup_next_page(this,'page-legalitas'); } }
 //    ],
	initComponent: function(){ this.callParent(); log('Welcome Setup Wizard Loaded'); },

})
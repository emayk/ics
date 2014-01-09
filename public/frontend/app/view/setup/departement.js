Ext.define('App.view.setup.departement',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.wizard_setup_departement',
	itemId: 'page-departement',
	layout: { type: 'vbox'},

	items:[
		{xtype: 'container', html: '<h1>Page Departement</h1>', flex: .1},
		{xtype: 'container', html: 'Content Help Here', flex: .8},
	],
	// buttons: [
	//     { text: 'Prev', handler: function () { setup_prev_page(this,'page-jabatan'); } },
	//     { text: 'Next', handler: function () { setup_next_page(this,'page-legalitas'); } }
 //    ],
	initComponent: function(){ this.callParent(); log('Welcome Setup Wizard Loaded'); },

})
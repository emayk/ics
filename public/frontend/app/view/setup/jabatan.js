Ext.define('App.view.setup.jabatan',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.wizard_setup_jabatan',
	itemId: 'page-jabatan',
	layout: { type: 'vbox'},

	items:[
		{xtype: 'container', html: '<h1>Page jabatan</h1>', flex: .1},
		{xtype: 'container', html: 'Content Help Here', flex: .8},
	],
	// buttons: [
	// 	{ text: 'Prev', handler: function () { prev_page(this,'page-welcome'); } },
	//     { text: 'Next', handler: function () { next_page(this,'page-finish'); } }
 //    ],
	initComponent: function(){ this.callParent(); log('Page jabatan Wizard Loaded'); },

})
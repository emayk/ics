Ext.define('App.view.setup.program',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.wizard_setup_program',
	itemId: 'page-program',
	layout: { type: 'vbox'},

	items:[
		{xtype: 'container', html: '<h1>Page program</h1>', flex: .1},
		{xtype: 'container', html: 'Content Help Here', flex: .8},
	],
	// buttons: [
	// 	{ text: 'Prev', handler: function () { setup_prev_page(this,'page-welcome'); } },
	//     { text: 'Next', handler: function () { setup_next_page(this,'page-unit'); } }
 //    ],
	initComponent: function(){ this.callParent(); log('Page program Wizard Loaded'); },

})
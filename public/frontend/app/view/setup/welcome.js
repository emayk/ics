Ext.define('App.view.setup.welcome',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.wizard_setup_welcome',
	itemId: 'page-welcome',
	layout: { type: 'vbox'},
	items:[
		{xtype: 'container', html: '<h1>Welcome Setup Wizard</h1>', flex: .1},
		{xtype: 'container', html: 'Content Help Here', flex: .8},
	],
	// buttons: [
	//     { text: 'Next', handler: function () { setup_next_page(this,'page-program'); } }
 //    ],
	initComponent: function(){ this.callParent(); log('Welcome Setup Wizard Loaded'); }
})
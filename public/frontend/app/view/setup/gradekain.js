Ext.define('App.view.setup.gradekain',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.wizard_setup_gradekain',
	itemId: 'page-gradekain',
	layout: { type: 'vbox'},

	items:[
		{xtype: 'container', html: '<h1>Page gradekain</h1>', flex: .1},
		{xtype: 'container', html: 'Content Help Here', flex: .8},
	],
	// buttons: [
	//     { text: 'Next', handler: function () {var wizard = this.up('#wizardsetup');wizard.getLayout().setActiveItem('page-legalitas'); } }
 //    ],
	initComponent: function(){ this.callParent(); log('Page gradekain Wizard Loaded'); },

})
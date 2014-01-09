Ext.define('App.view.setup.finish',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.wizard_setup_finish',
	itemId: 'page-finish',
	layout: { type: 'vbox'},

	items:[
		{xtype: 'container', html: '<h1>Page finish</h1>', flex: .1},
		{xtype: 'container', html: 'Content Help Here', flex: .8},
	],
	buttons: [
	    { text: 'Next', handler: function () {var wizard = this.up('#wizardsetup');
	    wizard.getLayout().setActiveItem(0);
	    var tab = Ext.getCmp('tab-home').remove();
	    Ext.getCmp('setup-move-next').setDisabled(false);
	    Ext.getCmp('setup-move-prev').setDisabled(true);
	     } }
    ],
	initComponent: function(){ this.callParent(); log('finish page Loaded'); },

})
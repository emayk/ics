Ext.define('App.view.vActionForm',{
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.vActionForm',
	items: [
			{ xtype : 'button', text: 'Help',iconCls : 'help', itemId : 'help' },'->',
    	{ xtype : 'button', text: 'Save',iconCls: 'close', itemId : 'save', formBind: true },
    	{ xtype : 'button', text: 'Cancel', iconCls: 'cancel', itemId : 'cancel' },
	]
});



Ext.define('App.view.profile.tabChangePassword',{
	extend : 'Ext.container.Container',
	// title: 'Change Password',
	alias: 'widget.tabChangePassword',
 	layout : 'fit',
 	items  : [ 
 		{ 
 			xtype: 'formUserChangePassword'
 		} 
	],

 	initComponent: function () {
 		this.callParent(arguments);
 	}
});



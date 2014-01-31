Ext.define('App.view.login.vPanel',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.panelLogin',
	height : hWinMax(),
	width: wWinMax(),
	items:[
				{ xtype: 'image', width: wWinMax(), height: hWinMax(), src: bgLogin(), flex: 1 },
	],
	initComponent: function  () {
		this.callParent(arguments);
	}
});
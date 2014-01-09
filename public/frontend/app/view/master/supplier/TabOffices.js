Ext.define('App.view.master.supplier.TabOffices',{
	extend : 'Ext.panel.Panel',
	title : 'Offices',
	requires: [
	'App.view.master.supplier.ListOffice',
	'App.view.master.supplier.ListPhones'
	],
	alias: 'widget.tabofficessupplier',

	layout: { type: 'hbox', align: 'stretch' },
	items:[
	{   xtype:'gridOfficesSupplier',flex: 2,html:'Grid Office', padding: '0 5 0 0', disabled: false },
	{	xtype:'gridPhonesSupplier',padding: '0 0 0 5', disabled: false,flex: 2},
	],
 	initComponent: function(){ this.callParent(); }
});
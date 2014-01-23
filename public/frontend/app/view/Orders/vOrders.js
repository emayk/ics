/**
 *
 * View Orders
 *
 * Programmer By Emay Komarudin.
 * 2013
 *
 * Main Panel
 *
 **/

Ext.define('App.view.Orders.vOrders', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.vOrders',
	requires: [
		'App.view.Orders.vOrderTabs'
	],
	layout: {
		type: 'fit', align: 'stretch'},
	items: [
		{ xtype: 'vOrderTabs' }
	],
	dockedItems: [
		{
			xtype: 'toolbar', flex: 1, dock: 'top',
			items: [
				{xtype: 'button', text: 'New Order', itemId: 'add', action: 'add', iconCls: 'add'},
				{xtype: 'button', text: 'Multi Order', itemId: 'multiadd', action: 'multiadd', iconCls: 'add'},
				// {xtype: 'button', text: 'Edit', itemId: 'edit', iconCls: 'edit', action: 'edit', disabled : true, },
				// {xtype: 'button', text: 'Delete', disabled : true, itemId: 'delete', iconCls: 'delete'}
			]
		}
	]
});

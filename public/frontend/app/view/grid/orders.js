/**
*
* Grid List Order's
*
**/

Ext.define('App.view.grid.orders',{
	extend : 'Ext.grid.Panel',
	title: 'Grid Order',
	alias: 'widget.gridOrders',
	columns: [
			{xtype: 'rownumberer'},
            { header: 'Name', dataIndex: 'name', flex: 1},
            // { header: 'Total', dataIndex: 'orders', flex: 1}
            // { header: 'Total', dataIndex: 'orderTotal', flex: 1}
		],
    // autoRefresh: true,
	autoScroll: true,
	store: 'Purchase',
	initComponent : function(){
		// Ext.getStore(this.store).load();
		log('Orders grid Active');
		this.callParent(arguments);
	}
});
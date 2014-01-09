/**
*
* View Orders
*
* Programmer By Emay Komarudin.
* 2013
*
* Menampilkan Semua Order
*
**/

Ext.define('App.view.Orders.vOrderItemsList', {
 extend: 'Ext.grid.Panel',
	alias: 'widget.vOrderItemsList',
	frame: true,
	columns:[
		{xtype: 'rownumberer'},
		{header: 'ID',dataIndex: 'id',flex: 1},
		{header: 'Document',dataIndex: 'nodoc',flex: 1}
	],
	autoScroll: true,
	store: 'App.store.Orders.sOrders',
   dockedItems: [
    {
        xtype: 'pagingtoolbar',
        dock:'bottom',
        store: 'App.store.Orders.sOrders',
        displayInfo: true
    }]

});
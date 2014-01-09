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

Ext.define('App.view.Orders.vOrderItemInfoGrid', {
 extend: 'Ext.grid.Panel',
	alias: 'widget.vOrderItemInfoGrid',
	frame: true,
	emptyText: 'Order Item Not Found',
	columns:[
		{xtype: 'rownumberer'},
		 { header : 'Id', dataIndex: 'id', flex:1},
		 // { header : '1', dataIndex: 'info', flex:1},
		 // { header : '1', dataIndex: 'lastupdateby_id', flex:1},
		 { header : 'Product', dataIndex: 'product_name', flex:1},
		 // { header : 'Picture', dataIndex: 'product_img', flex:1},
		 { header : 'Price', dataIndex: 'price', flex:1},
		 { header : 'Qty', dataIndex: 'qty', flex:1},
		 { header : 'Stock Id', dataIndex: 'stock_id', flex:1},
		 // { header : '1', dataIndex: 'updated_at', flex:1},
		 // { header : '1', dataIndex: 'uuid', flex:1},
		 // { header : '1', dataIndex: 'created_at', flex:1},
		// {header : 'createby_id', dataIndex:'createby_id', flex:1},
	],
	autoScroll: true,
	store: 'App.store.Orders.sOrderItemsInfo',
   dockedItems: [
    {
        xtype: 'pagingtoolbar',
        dock:'bottom',
        store: 'App.store.Orders.sOrderItemsInfo',
        displayInfo: true
    }]

});


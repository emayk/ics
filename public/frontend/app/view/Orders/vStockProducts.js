/**
*
* Stock Products
*
* Programmer By Emay Komarudin.
* 2013
*
* Menampilkan Semua Order
*
**/

Ext.define('App.view.Orders.vStockProducts', {
 extend: 'Ext.grid.Panel',
	alias: 'widget.vStockProducts',
	// frame: true,
	autoScroll: true,
	height : 200,
	columnLines : true,
	columns:[
		// {xtype: 'rownumberer'},
		// {header: 'ID',dataIndex: 'id',flex: 1},
		// {header: 'Document',dataIndex: 'nodoc',flex: 1}
			{header: 'ID', dataIndex : 'id', flex: 1},
			{header: 'Product', dataIndex : 'product_name', flex: 1},
			// {header: 'tipelokasi_id', dataIndex : 'tipelokasi_id', flex: 1},
			{header: 'Roll Number', dataIndex : 'rollnumber', flex: 1},
			{header: 'Panjang', dataIndex : 'panjangkain', flex: 1},
			{header: 'Type Storage', dataIndex : 'location_name', flex: 1},
			{header: 'Location Storage', dataIndex : 'warehouse_name', flex: 1},
	],
	autoScroll: true,
	store: 'App.store.Orders.sStockProducts',
   dockedItems: [
    {
        xtype: 'pagingtoolbar',
        dock:'bottom',
        store: 'App.store.Orders.sStockProducts',
        displayInfo: true
    }]

});
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

Ext.define('App.view.Orders.vOrderListClose', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.vOrderListClose',
	frame: true,
	emptyText: 'Empty Order Close',
	columns:[
		{xtype: 'rownumberer'},
		{header: 'Status', dataIndex: 'status',width: 35,
		renderer: function(value, metadata, record, rowIndex, colIndex, store) {if (value == 1) {metadata.css = 'status_open'; } else {metadata.css = 'status_close'; } metadata.attr = 'ext:qtip="' + (value) + '"'; return ''; } },
		{header: 'Approve', dataIndex: 'approve_id', width: 30,
			renderer: function(value, metadata, record, rowIndex, colIndex, store) {if (value > 0) {metadata.css = 'approve_yes'; } else {metadata.css = 'approve_no'; } metadata.attr = 'ext:qtip="' + (value) + '"'; return ''; }
		},
		{header: 'Document',dataIndex: 'nodoc'},
		{header: 'Type', dataIndex: 'type'},
		{header: 'Supplier', dataIndex: 'supplier'},
		{header: 'Ppn', dataIndex: 'ppn'},
		{header: 'Warehouse', dataIndex: 'warehouse'},
		{header: 'Payment', dataIndex: 'payment'},
		{header: 'Contact', dataIndex: 'contact'},
		{header: 'Currency', dataIndex: 'currency_name'},
		{header: 'Delivery', dataIndex: 'delivery_at'},
		{header: 'Credit', dataIndex: 'credit'},
		{header: 'Kurs', dataIndex: 'kurs'},

		{header: 'Uuid', dataIndex: 'uuid'},
		{header: 'Create By', dataIndex: 'creator'},
		{header: 'Update By', dataIndex: 'updater'},
		{header: 'Create At', dataIndex: 'created_at',renderer: Ext.util.Format.dateRenderer('d M Y') },
		{header: 'Updated At', dataIndex: 'updated_at',renderer: Ext.util.Format.dateRenderer('d M Y') }
	],
	autoScroll: true,
	store: 'App.store.Orders.sOrdersClose',
   dockedItems: [
    {
        xtype: 'pagingtoolbar',
        dock:'bottom',
        store: 'App.store.Orders.sOrdersClose',
        displayInfo: true
    }]

});
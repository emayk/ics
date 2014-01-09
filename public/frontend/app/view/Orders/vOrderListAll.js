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

Ext.define('App.view.Orders.vOrderListAll', {
 extend: 'Ext.grid.Panel',
	alias: 'widget.vOrderListAll',
	frame: true,
	columns:[
		{xtype: 'rownumberer'},
		{header: 'Config', xtype:'actioncolumn', width: 40, items: [
			{	itemId: 'edit', iconCls: 'action_edit', tooltip: 'Edit Order',
				handler: function(grid, rowIndex, colIndex, item, e) {this.fireEvent('itemclick', this, 'edit', grid, rowIndex, colIndex, item, e); }
      },
      {	itemId: 'delete', iconCls: 'action_delete', tooltip: 'Delete Order',
            	 handler: function(grid, rowIndex, colIndex, item, e) { this.fireEvent('itemclick', this, 'delete', grid, rowIndex, colIndex, item, e); }
      },

    	// {iconCls: 'action_delete', tooltip: 'Delete Order ', itemId: 'delete',
     //        handler: function(grid, rowIndex, colIndex) {
     //                        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function(btn,text){
     //                        if (btn == 'yes'){
     //                                var rec = grid.getStore().getAt(rowIndex);
     //                                grid.getStore().remove(rec);
     //                                grid.getStore().sync();
     //                                grid.getStore().load();
     //                                grid.getPlugin('pgOrderAll').doRefresh();
     //                        }
     //                        });
     //                }
     //        }
            ]
    },



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
		{header: 'Delivery', dataIndex: 'delivery_at',renderer: Ext.util.Format.dateRenderer('d M Y') },
		{header: 'Credit', dataIndex: 'credit'},
		{header: 'Kurs', dataIndex: 'kurs'},
		{header: 'Uuid', dataIndex: 'uuid'},
		{header: 'Create By', dataIndex: 'creator'},
		{header: 'Update By', dataIndex: 'updater'},
		{header: 'Create At', dataIndex: 'created_at',renderer: Ext.util.Format.dateRenderer('d M Y') },
		{header: 'Updated At', dataIndex: 'updated_at',renderer: Ext.util.Format.dateRenderer('d M Y') }
	],
	emptyText: 'Empty Order All',
	autoScroll: true,
	store: 'App.store.Orders.sOrdersAll',
   dockedItems: [
    {
        xtype: 'pagingtoolbar',
        dock:'bottom',
        store: 'App.store.Orders.sOrdersAll',
        pluginId: 'pgOrderAll',
        displayInfo: true
    }]

});
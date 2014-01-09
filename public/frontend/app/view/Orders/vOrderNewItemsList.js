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

Ext.define('App.view.Orders.vOrderNewItemsList', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.vOrderNewItemsList',
	autoScroll: true,
	store: 'App.store.Orders.sNewOrderItems',
	columns: [
				{ dataIndex: 'id', header : 'ID' },
				{ dataIndex: 'product_name', header : 'Product Name' },
				{ dataIndex: 'qty', header : 'Qty', editor: {xtype: 'numberfield', allowBlank: false } },
        {
            header: 'Action',
            xtype:'actioncolumn',
            flex: .4,
            items: [{
                iconCls : 'delete',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function(btn,text){
                            if (btn == 'yes'){
                                    var rec = grid.getStore().getAt(rowIndex);
                                    grid.getStore().remove(rec);
                                    grid.getStore().sync();
                                    grid.getStore().reload();
                            }
                            });
                    }
                }]
        }
	],
	selType: 'rowmodel',
	plugins: [Ext.create('Ext.grid.plugin.RowEditing', {clicksToEdit: 1 ,triggerEvent : 'celldblclick' }) ],
	dockedItems: [{xtype: 'pagingtoolbar', dock:'bottom', store: 'App.store.Orders.sNewOrderItems'}]
});
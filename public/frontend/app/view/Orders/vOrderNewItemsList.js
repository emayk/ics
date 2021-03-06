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
	defaults:{
		flex: 1
	},
	columns: [
		{
			xtype: 'rownumberer',
			text: '#'
		},
		{ dataIndex: 'productname', header: 'Product Name',flex: 2 },
		{ dataIndex: 'qty', header: 'Qty', editor: {xtype: 'numberfield', allowBlank: false } },
		{
			header: 'Action',
			xtype: 'actioncolumn',
			flex: .4,
			items: [
				{
					iconCls: 'delete',
					tooltip: 'Delete',
					handler: function (grid, rowIndex) {
						Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function (btn) {
							if (btn == 'yes') {
								var rec = grid.getStore().getAt(rowIndex);
								grid.getStore().remove(rec);
								grid.getStore().sync();
								grid.getStore().reload();
							}
						});
					}
				}
			]
		}
	],
	selType: 'rowmodel',
	plugins: [Ext.create('Ext.grid.plugin.RowEditing', { clicksToEdit: 1, triggerEvent: 'celldblclick' }) ],
	dockedItems: [
		{xtype: 'pagingtoolbar', dock: 'bottom', store: 'App.store.Orders.sNewOrderItems'}
	]
});
/**
 *
 * Grid Master Bank
 *
 */

Ext.define('App.view.master.bank.List', {
	extend: 'Ext.grid.Panel',
	title: 'Daftar',
	alias: 'widget.bankListGrid',
	columns: [
		{xtype: 'rownumberer'},
		{header: 'Name', dataIndex: 'name', flex: 1},
		{header: 'Singkatan', dataIndex: 'shortname', flex: 1},
		{header: 'Alamat', dataIndex: 'address', flex: 1},
		{header: 'Phone', dataIndex: 'notelp', flex: 1},
		{
			header: 'Action',
			xtype: 'actioncolumn',
			width: 40,
			items: [
				{
					iconCls: 'delete',
					tooltip: 'Delete',
					handler: function (grid, rowIndex, colIndex) {
						Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function (btn, text) {
							if (btn == 'yes') {
								var rec = grid.getStore().getAt(rowIndex);
								grid.getStore().remove(rec);
								grid.getStore().sync();
								grid.getStore().load();
							}
						});
					}
				}
			]
		}
	],
	autoScroll: true,
	store: 'App.store.Banks',
	initComponent: function () {
		var me = this;
		Ext.apply(me,{
			selModel: App.util.box.createSelectionModel(),
			dockedItems : [
			{
				xtype: 'toolbar',
				items: [
					{
						iconCls: 'add',
						itemId: 'add',
						text: 'Add',
						action: 'add'
					},
					{
						iconCls: 'delete',
						itemId: 'delete',
						text: 'Remove',
						action: 'delete'
					},
					'->',
					{
						iconCls: 'excel',
						itemId: 'import',
						text: 'Import',
						action: 'import',
						handler: function () {
							msgError('Belum Implementasi')
						}
					},
					{
						iconCls: 'excel',
						itemId: 'export',
						text: 'Export',
						action: 'import',
						handler: function () {
							msgError('Belum Implementasi')
						}
					},
					{
						iconCls: 'help',
						itemId: 'help',
						text: 'Help',
						action: 'help',
						handler: function () {
							msgError('Belum Implementasi')
						}
					}
				]
			},
			{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				store: 'App.store.Banks',
				displayInfo: true
			}
		]
		});
		me.callParent(arguments);

//		this.callParent(arguments);
	}
});
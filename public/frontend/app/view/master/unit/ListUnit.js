Ext.define('App.view.master.unit.ListUnit', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.gridAllunit',
	store: 'App.store.unit.Allunit',
	initComponent: function () {
		Ext.apply(this, {
			selModel: App.util.box.createSelectionModel(),
			columns: [
				{
					xtype: 'rownumberer'
				},
				{
					header: 'Nama',
					dataIndex: 'name',
					flex: 1,
					editor: { allowBlank: true }
				},
				{
					header: 'Informasi',
					dataIndex: 'info',
					flex: .7,
					editor: {
						allowBlank: true
					}
				},

				{
					header: 'Tipe',
					dataIndex: 'type_id',
					flex: .7,
					editor: {
						allowBlank: true,
						xtype: 'cbUnitType'
					},
					renderer: function (value, metaData, record, row, col, store, gridView) {
						return record.get('typename');
					}
				},
				{
					header: 'Action',
					xtype: 'actioncolumn',
					flex: .4,
					items: [
						{
							iconCls: 'delete',
							tooltip: 'Hapus',
							handler: function (grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								Ext.MessageBox.confirm('Confirm', 'Apakah Anda Yakin Akan Menghapus Record ?', function (btn, text) {
									var rec = grid.getStore().getAt(rowIndex);
									if (btn == 'yes') {
										rec.destroy({
											callback: function (recs,ops,success) {
												if (!ops.error) {
													App.util.box.info('Record Berhasil dihapus');
													grid.getStore().load();
												} else {
													App.util.box.error('Record Gagal dihapus');
													return false;
												}
											},
//											success: function (r, o) {
//												App.util.box.info('Record Berhasil dihapus');
//												grid.getStore().load();
//											},
											failure: function (r, o) {
												App.util.box.error('Record Gagal dihapus');
												return false;
											}
										})
//										grid.getStore().remove(rec);
//										grid.getStore().sync();
//										grid.getStore().load();
									}
								});
							}
						}
					]
				}
			],
			columnLines: true,
			selModel: 'rowmodel',
			/*==========  Plugins  ==========*/
			plugins: [
				Ext.create('Ext.grid.plugin.RowEditing', {
					clicksToEdit: !1,
					pluginId: 'ceAllUnits',
					clicksToMoveEditor: 1
				})
			],
			/*==========  DockedItems  ==========*/
			dockedItems: [
				{
					xtype: 'toolbar',
					items: [
						{
							action: 'add',
							text: 'Add', iconCls: 'add'
						},
						{
							action: 'remove',
							text: 'Remove', iconCls: 'delete',
							disabled: true
						}
					]
				},
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					store: 'App.store.unit.Allunit',
					displayInfo: true
				}
			]
		});
		this.callParent(arguments);
//		Ext.getStore(this.store).load();
	}
});
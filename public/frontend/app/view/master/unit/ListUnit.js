Ext.define('App.view.master.unit.ListUnit', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.gridAllunit',
	store: 'App.store.unit.Allunit',
	initComponent: function () {
		Ext.apply(this,{
			columns: [
				{
					xtype: 'rownumberer'
				},
				{
					header: 'Name',
					dataIndex: 'name',
					flex: 1,
					editor: { allowBlank: true }
				},
				{
					header: 'Information',
					dataIndex: 'info',
					flex: .7,
					editor: {
						allowBlank: true
					}
				},

				{
					header: 'Type',
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
//
//		{
//			header: 'Last Update By',
//			flex: 1,
//			dataIndex: 'updater'
//		},
//
//		{
//			header: 'Create By',
//			flex: 1,
//			dataIndex: 'creator'
//		},
				{
					header: 'Action',
					xtype: 'actioncolumn',
					flex: .4,
					items: [
						{
							// icon: '/assets/fugue/icons/cross-shield.png',
							iconCls: 'delete',
							tooltip: 'Delete',
							handler: function(grid, rowIndex, colIndex) {
								Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function(btn,text){
									if (btn == 'yes'){
										var rec = grid.getStore().getAt(rowIndex);
										grid.getStore().remove(rec);
										grid.getStore().sync();
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
							text: 'Add',iconCls:'add'
						},
						{
							action: 'remove',
							text: 'Remove',iconCls: 'delete',
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
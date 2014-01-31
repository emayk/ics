Ext.define('App.view.master.legalitas.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.masterlegalitasGridList',
    store: 'App.store.Legalitas',
    padding: 10,
    frame: true,
	initComponent: function(){
		var me = this;
		Ext.apply(me,{
			columns: [
				{
					xtype: 'rownumberer'
				},
				{
					header: 'Name',
					dataIndex: 'name',
					flex: 1,
					editor: { allowBlank: false }
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
					header: 'Action',
					xtype: 'actioncolumn',
					flex: .4,
					items: [
						{
							tooltip: 'Delete',
							iconCls: 'delete',
							handler: App.util.box.deleteSingleRecordFromGrid
						}
					]
				}
			],
			columnLines: true,
			selModel: App.util.box.createSelectionModel(),
			/*==========  Plugins  ==========*/
			plugins: [
				Ext.create('Ext.grid.plugin.RowEditing', {
					clicksToEdit: !1,
					pluginId: 'cellEditorLegalitas',
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
							iconCls: 'add',
							text: 'Add'
						},
						{
							action: 'remove',
							iconCls: 'delete',
							text: 'Remove',
							disabled: true
						},
						'->',
						{
							action: 'import',
							iconCls: 'excel',
							text: 'Import',
							handler : function() { msgError('Belum Implement');}
						},
						{
							action: 'export',
							iconCls: 'excel',
							text: 'Export',
							handler : function() { msgError('Belum Implement');}
						}
					]
				},
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					store: me.store,
					displayInfo: true
				}
			]
		});
		me.callParent(arguments);
	}

});
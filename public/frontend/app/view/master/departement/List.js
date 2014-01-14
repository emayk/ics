Ext.define('App.view.master.departement.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.departementGridList',
    store: 'App.store.Departements',
    columns: [
        {
            xtype: 'rownumberer',
            width: 30
        },
        // {
        //          text: 'ID',
        //          width: 40,
        //          sortable: true,
        //          dataIndex: 'id'
        //      	},
        {
            header: 'Name',
            dataIndex: 'name',
            flex: 1,
            // renderer : function(v){
            // 	return Ext.util.Format.uppercase(v);
            // },
            editor: { allowBlank: true },
        },
        {
            header: 'Information',
            dataIndex: 'info',
            flex: 1,
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
                    handler: function (grid, rowIndex, colIndex) {
                        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function (btn, text) {
                            if (btn == 'yes') {
                                var rec = grid.getStore().getAt(rowIndex);
                                grid.getStore().remove(rec);
                                grid.getStore().sync();
                                grid.getStore().load();
                                Ext.getCmp('pagingContactPerson').doRefresh();
                            }
                        });
                    }
                }
            ]
        }
    ],
    // columnLines: true,
    selModel: 'rowmodel',
    /*==========  Plugins  ==========*/
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: !1,
            pluginId: 'cellEditorDept',
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
                    text: 'Remove',
                    iconCls: 'delete',
                    disabled: true
                },
                '->',
                {
                    text: 'Import',
                    iconCls: 'excel',
                    itemId: 'import',
                    handler: function () {
                        msgError('Not Implement');
                    }
                },
                {
                    text: 'Export',
                    iconCls: 'excel',
                    itemId: 'export',
                    handler: function () {
                        msgError('Not Implement');
                    }
                },
                {
                    text: 'Help',
                    iconCls: 'Help',
                    handler: function () {
                        msgError('Not Implement');
                    }
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store: 'App.store.Departements',
            displayInfo: true
        }
    ]
//	initComponent : function(){
//		this.callParent(arguments);
//		Ext.getStore(this.store).load();
//	}
});
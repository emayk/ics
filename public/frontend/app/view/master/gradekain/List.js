Ext.define('App.view.master.gradekain.List', {
    extend: 'Ext.grid.Panel',
    title: 'List Grade Factory',
    alias: 'widget.gradekainGridList',
    store: 'App.store.Gradekains',
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
            flex: 1,
            dataIndex: 'info',
            editor: {
                allowBlank: true
            }
        },
        {
            header: 'UUID',
            flex: 1,
            dataIndex: 'uuid'
        },
        {
            header: 'Action',
            xtype: 'actioncolumn',
            flex: .4,
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
    columnLines: true,
    selModel: 'rowmodel',
    /*==========  Plugins  ==========*/
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: !1,
            pluginId: 'cellEditorGradeKain',
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
                },{
                    action: 'help',
                    iconCls: 'help',
                    text: 'Help',
                    handler : function() { msgError('Belum Implement');}
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store: 'App.store.Gradekains',
            displayInfo: true
        }
    ]
});

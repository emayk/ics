Ext.define('App.view.master.gudang.List', {
    extend: 'Ext.grid.Panel',
    title: 'List Warehouse',
    alias: 'widget.gudangGridList',
    store: 'App.store.Gudangs',
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
            header: 'Address',
            dataIndex: 'address',
            flex: 2,
            editor: {
                allowBlank: true
            }
        },

        {
            header: 'City',
            dataIndex: 'city_id',
            flex: 1,
            renderer: function (v, m, rec) {
                return rec.get('city');
            },
            editor: {
                fieldLabel: '',
                xtype: 'cbCities',
                pageSize: 10
            }
        },
        {
            header: 'Category',
            dataIndex: 'cat_id',
            renderer: function (v, m, rec) {
                return rec.get('category');
            },
            flex: 1,
            editor: {
                fieldLabel: '',
                xtype: 'cbWarehouseCat',
                pageSize: 10
            }
        },
//        {
//            header: 'UUID',
//            dataIndex: 'uuid',
//            flex: 2
//        },
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
            pluginId: 'cellEditorGudang',
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
                    text: 'Add',
                    itemId: 'add',
                    iconCls: 'add'
                },
                {
                    action: 'remove',
                    text: 'Remove',
                    itemId: 'remove',
                    iconCls: 'delete',
                    disabled: true
                },
                '->',
                {
                    itemId: 'import',
                    iconCls: 'excel',
                    text: 'Export',
                    handler: function () {
                        belumImplement();
                    }
                } ,
                {
                    itemId: 'export',
                    text: 'Export', iconCls: 'excel',
                    handler: function () {
                        belumImplement();
                    }
                },
                {
                    itemId: 'help',
                    text: 'Help', iconCls: 'help',
                    handler: function () {
                        belumImplement();
                    }
                }
            ]
        },

        {
            xtype: 'pagingtoolbar',
//            id: 'pagingGudang',
            dock: 'bottom',
            store: 'App.store.Gudangs',
            displayInfo: true
        }
    ]
});

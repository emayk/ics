/**
 * Daftar Type Order
 */
Ext.define('App.view.master.typeorder.List', {
    extend: 'Ext.grid.Panel',
    title: 'List',
    alias: 'widget.typeorderGridList',
    store: 'App.store.TypeOrders',
    columns: [
        {
            xtype: 'rownumberer'
        },
        {
            header: 'Name',
            dataIndex: 'name',
            editor: {
                allowBlank: false
            }
        },
        {
            header: 'Information',
            dataIndex: 'info',
            editor: {
                allowBlank: true
            }
        },
        {
            header: 'UUID',
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
            pluginId: 'cellEditorOrderType',
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
                    iconCls: 'add'
                },
                {
                    action: 'remove',
                    text: 'Remove',
                    iconCls: 'delete',
                    disabled: true
                },
                '->',
                {
                    action: 'import',
                    text: 'Import',
                    iconCls: 'excel',
                    handler: function(){ belumImplement(); }
                },
                {
                    action: 'export',
                    text: 'Export',
                    iconCls: 'excel',
                    handler: function(){ belumImplement(); }
                },
                {
                    action: 'help',
                    text: 'help',
                    iconCls: 'help',
                    handler: function(){ belumImplement(); }
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store: 'App.store.TypeOrders',
            displayInfo: true
        }
    ]
});
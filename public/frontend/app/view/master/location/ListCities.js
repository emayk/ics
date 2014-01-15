Ext.define('App.view.master.location.ListCities', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.listcitiesGP',
    emptyText: 'No Have Cities',
    requires: [
        'App.form.combobox.cbProvinces'
    ],

    store: 'App.store.Cities',
    columns: [
        {
            xtype: 'rownumberer',
            flex: .2
        },
        {
            header: 'Name',
            flex: 1,
            dataIndex: 'name',
            editor: { allowBlank: true }
        },
        {
            header: 'Province', flex: 1,
            dataIndex: 'parent_id',
            renderer: function (a, c, rec) {
                return rec.get('parent_name');
            },
            editor: {
                xtype: 'cbProvinces',
                fieldLabel: ''
            }
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
            header: 'UUID', flex: 1,
            dataIndex: 'uuid'

        },
        {
            header: 'Action',
            xtype: 'actioncolumn',
            flex: .4,
            items: [
                {
                    iconCls: 'delete',
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
            pluginId: 'cellEditorCities',
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
                }
            ]
        },

        {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store: 'App.store.Cities',
            displayInfo: true
        }
    ]
});
Ext.define('App.view.master.office.ListHead', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.listheadGP',
    store: 'App.store.Headoffices',
    columns: [
        {
            header: ' No ',
            xtype: 'rownumberer',
            flex: .3
        },
        {
            header: 'Type', flex: 1,
            dataIndex: 'type',
            renderer: function (v) {
                return (v == 1) ? 'Buyer' : 'Supplier';
            }
        },
        {
            header: 'Address', flex: 1,
            dataIndex: 'address'
        },

        {
            header: 'Country', flex: 1,
            dataIndex: 'country_id'

        },
        {
            header: 'Province', flex: 1,
            dataIndex: 'province_id'

        },
        {
            header: 'City', flex: 1,
            dataIndex: 'city_id'

        },
        {
            header: 'Pos Code', flex: 1,
            dataIndex: 'postcode'
        },
        {
            header: 'Main',
            dataIndex: 'mainoffice',
            renderer: function (v) {
                return (v == 1) ? 'Yes' : 'No';
            }
        },
        {
            header: 'Action',
            xtype: 'actioncolumn',
            flex: .4,
            // tdCls:'delete',
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
//    plugins: [
//        Ext.create('Ext.grid.plugin.RowEditing', {
//            clicksToEdit: !1,
//            pluginId: 'cellEditorCities',
//            clicksToMoveEditor: 1
//        })
//    ],
    /*==========  DockedItems  ==========*/
    dockedItems: [
        {
            xtype: 'toolbar',
            items: [
                {
                    action: 'add',
                    text: 'Add'
                },
                {
                    action: 'remove',
                    text: 'Remove',
                    disabled: true
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store: 'App.store.Headoffices',
            displayInfo: true
        }
    ],
//    initComponent: function () {
//
////        Ext.getStore('Countries').load();
////        Ext.getStore('Cities').load();
////        Ext.getStore('Provinces').load();
////        Ext.getStore(this.store).load();
////        this.callParent(arguments);
//
//    }
});
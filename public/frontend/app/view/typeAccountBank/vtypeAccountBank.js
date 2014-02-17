/**
 * View typeAccountBank
 *
 * Copyright (C) 2013  Emay Komarudin
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * @author Emay Komarudin
 *
 *
 *
 **/
Ext.define('App.view.typeAccountBank.vtypeAccountBank', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.apptypeAccountBankvtypeAccountBank',
    store: 'App.store.typeAccountBank.stypeAccountBank',
    initComponent: function () {
        Ext.apply(this, {
            layout: { type: 'fit', align: 'stretch'},
            items: [
                {
                    xtype: 'grid',
                    itemId: 'typeaccountbank',
                    padding: 10,
                    frame: true,
                    flex: 1,
                    store: this.store,
                    columns: [
                        {
                            xtype: 'rownumberer',
                            text: '#'
                        },
                        {text: "Name", dataIndex: "name", flex: 2, editor: {
                            allowBlank: false
                        }},
                        {text: "Description", dataIndex: "info", flex: 2, editor: {
                            allowBlank: true
                        }},
                        {
                            header: 'Action',
                            xtype: 'actioncolumn',
                            flex: .4,
                            items: [
                                {
                                    iconCls: 'delete',
                                    tooltip: 'Delete',
                                    handler: function (grid, rowIndex, colIndex) {
                                        Ext.MessageBox.confirm('Konfirmasi', 'Anda Yakin Akan Menghapus Record ?', function (btn, text) {
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
                    selModel: App.util.box.createSelectionModel(),
                    /*==========  Plugins  ==========*/
                    plugins: [
                        Ext.create('Ext.grid.plugin.RowEditing', {
                            clicksToEdit: !1,
                            pluginId: 'cellEditorTypeAccountBank',
                            clicksToMoveEditor: 1
                        })
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            items: [
                                {
                                    text: 'Add',
                                    iconCls: 'add',
                                    itemId: 'add',
                                    action: 'add'
                                },
                                {
                                    text: 'Remove',
                                    iconCls: 'delete',
                                    itemId: 'remove',
                                    action: 'remove',
                                    disabled: true
                                },
                                '->',
                                {
                                    text: 'Import',
                                    iconCls: 'excel',
                                    itemId: 'import',
                                    handler: function () {
                                        belumImplement();
                                    }
                                },
                                {
                                    text: 'Export',
                                    iconCls: 'excel',
                                    itemId: 'export',
                                    handler: function () {
                                        belumImplement();
                                    }
                                },
                                {
                                    text: 'Help',
                                    iconCls: 'help',
                                    itemId: 'help',
                                    handler: function () {
                                        belumImplement();
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            store: this.store,
                            displayInfo: true

                        }
                    ]
                }
            ]

        });
        this.callParent(arguments);
    }
});

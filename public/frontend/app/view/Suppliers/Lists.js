/**
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
 **/

Ext.define('App.view.Suppliers.Lists', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.appSuppliersvSuppliersLists',
    store: 'App.store.Suppliers.sSuppliers',
    layout: { type: 'fit', align: 'stretch'},
    padding: 10,
    frame: true,
    columns: [
        {
            xtype: 'rownumberer'
        },
        {header: "Active", dataIndex: "status_id",renderer:function(v,a,rec){
            var color,text ;
            if (v ==1){
                text =  "Yes";color = "green";
            }else{
                text = "No";color = "red";
            }
            return '<span font-color="'+color+'">'+text+'</span>';
        }},
        {header: "name", dataIndex: "name"},
        {header: "id", dataIndex: "id"},
        {header: "codepos", dataIndex: "codepos"},
        {header: "npwp", dataIndex: "npwp"},
        {header: "phone", dataIndex: "phone"},
        {header: "email", dataIndex: "email"},
        {header: "fax", dataIndex: "fax"},
        {header: "plafon", dataIndex: "plafon"},
        {header: "kredit", dataIndex: "kredit"},
        {header: "address", dataIndex: "address"},
        {header: "rt", dataIndex: "rt"},
        {header: "rw", dataIndex: "rw"},
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            items: [
                {
                    text: 'Add',
                    action: 'add',
                    iconCls: 'add'
                },
                {
                    text: 'Remove',
                    action: 'remove',
                    iconCls: 'delete'
                },
                '->',
                {
                    text: 'Import',
                    action: 'import',
                    iconCls: 'excel',
                    handler: function () {
                        belumImplement();
                    }
                },
                {
                    text: 'Export',
                    action: 'export',
                    iconCls: 'excel',
                    handler: function () {
                        belumImplement();
                    }
                },
                {
                    text: 'Help',
                    action: 'help',
                    iconCls: 'help',
                    handler: function () {
                        belumImplement();
                    }
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: 'App.store.Suppliers.sSuppliers',
            dock: 'bottom',
            displayInfo: true
        }
    ]
});



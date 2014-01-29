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
        {header:translations.fields.name, dataIndex: "name"},
//	    {header:translations.fields.id, dataIndex: "id"},
        {header: translations.postcode, dataIndex: "codepos"},
        {header: translations.npwp, dataIndex: "npwp"},
        {header: translations.phonenumber, dataIndex: "phone"},
        {header: translations.email, dataIndex: "email"},
        {header: translations.fax, dataIndex: "fax"},
        {header: translations.supplier.plafon, dataIndex: "plafon"},
        {header: translations.supplier.credit, dataIndex: "kredit"},
        {header: translations.address, dataIndex: "address",flex: 2}
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            items: [
                {
                    text: translations.add,
                    action: 'add',
                    iconCls: 'add'
                },
                {
                    text: translations.remove,
                    action: 'remove',
                    iconCls: 'delete'
                },
                '->',
                {
                    text: translations.import,
                    action: 'import',
                    iconCls: 'excel',
                    handler: function () {
                        belumImplement();
                    }
                },
                {
                    text: translations.export,
                    action: 'export',
                    iconCls: 'excel',
                    handler: function () {
                        belumImplement();
                    }
                },
                {
                    text: translations.help,
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



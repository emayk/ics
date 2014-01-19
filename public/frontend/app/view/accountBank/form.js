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



Ext.define('App.view.accountBank.form', {
    extend: 'Ext.form.Panel',
    flex: .3,
    alias: 'widget.appaccountBankform',
    itemId: 'formaccount',
    requires:[
        'App.form.combobox.cbBank'
    ],
    bodyPadding: 10,
    frame: true,
    title: 'Form Information ',
    margin: '0 0 0 5',
    layout: 'anchor',
    defaults:{
      anchor: '95%'
    },
    items: [
        { xtype: 'hiddenfield', name: 'owner_id', hidden: true},
        { xtype: 'hiddenfield', name: 'owner_type', hidden: true},
        {
            xtype: 'textfield',
            fieldLabel: 'Name',
            name: 'name',
            disabled : true
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Number',
            disabled : true,
            name: 'number'
        },
        {
            /*Combo box Bank*/
//            xtype: 'textfield',
            xtype: 'cbBank',
            fieldLabel: 'Bank',
            disabled : true,
            name: 'bank_id'
        },
        {
            /*Combobox Type Account */
            xtype: 'cbTypeBank',
            fieldLabel: 'Type',
            disabled : true,
            name: 'type_id'
        }

    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'addnew',
                    iconCls: 'add',
                    tooltip: 'Add New Record'
                },
                '-',
                {
                    itemId: 'saverecord',
                    iconCls: 'save',
                    tooltip: 'Save Record'
                },
                '-',
                {
                    itemId: 'remove',
                    iconCls: 'delete',
                    tooltip: 'Delete Record'
                }
            ]
        }
    ]
});

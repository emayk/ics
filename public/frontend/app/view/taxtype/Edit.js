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

Ext.define('App.view.taxtype.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.apptaxtypevtaxtypeWindow',
    title: 'Window Properties ',
    width: 300,
    bodyPadding:3,
    height: 150,
    items: [
        {
            xtype: 'form',
            itemId: 'formtaxtype',
            layout: 'anchor',
            padding: 10,
            frame: true,
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel:'Name',
                    emptyText: 'Insert Name',
                    allowBlank: false,
                    minLengthText:2,
                    name: 'name',
                    anchor : '95%'
                },
                {
                    xtype: 'textfield',
                    name: 'info',
                    anchor : '95%',
                    fieldLabel:'Description',
                    emptyText: 'Insert Description'
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',dock: 'bottom',
            items: [
                {
                    text: 'Help',
                    itemId: 'help',
                    iconCls: 'help'
                },
                '->',
                {
                    text: 'Save',
                    itemId: 'save',
                    iconCls: 'save'
                },
                {
                    text: 'Cancel',
                    itemId: 'cancel',
                    iconCls: 'close'
                }
            ]
        }
    ]
});
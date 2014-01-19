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


Ext.define('App.view.products.formproductdetail', {
    extend: 'Ext.form.Panel',
    alias: 'widget.formproductdetail',
    frame: true,
    record: null,
    prodId: null,
    prodName: null,
    title: null,
    dockedItems: [
        { xtype: 'toolbar', dock: 'bottom',
            items: [
                {
                    text: 'Help',
                    itemId: 'help',
                    iconCls: 'help',
                    handler: function () {
                        belumImplement()
                    }
                },'->',
                {
                    text: 'Save',
                    itemId: 'save',
                    iconCls: 'save'
                }
            ]
        }
    ],
    initComponent: function () {
        Ext.apply(this, {
            items: [
                {
                    xtype: 'fieldset',
                    title : 'Form Detail Product ' + this.prodName,
                    items: [
                        { xtype: "displayfield", fieldLabel: "Name", name: "prodname", value: this.prodName},
                        { xtype: "textfield", fieldLabel: "id", name: "id", hidden: true},
                        { xtype: "textfield", fieldLabel: "product_id", name: "product_id", value: this.prodId},
                        { xtype: "textfield", fieldLabel: "color_id", name: "color_id"},
                        { xtype: "textfield", fieldLabel: "unit_id", name: "unit_id"},
                        { xtype: "textfield", fieldLabel: "grade_id", name: "grade_id"},
                        { xtype: "textfield", fieldLabel: "salesprice", name: "salesprice"},
                        { xtype: "textfield", fieldLabel: "salespricemin", name: "salespricemin"},
                        { xtype: "textfield", fieldLabel: "currsp_id", name: "currsp_id"},
                        { xtype: "textfield", fieldLabel: "currspm_id", name: "currspm_id"},
                        { xtype: "textfield", fieldLabel: "parent_id", name: "parent_id", value: this.prodId,hidden:true },
                        { xtype: "textfield", fieldLabel: "parent_type", name: "parent_type", value: 'product',hidden:true }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
})

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
    requires:[
        'App.form.combobox.cbUnitWeight',
        'App.form.combobox.cbUnitWidth',
        'App.form.combobox.cbColor',
        'App.form.combobox.cbUnits',
        'App.form.combobox.cbGradeKain',
        'App.form.combobox.cbcurrsp',
        'App.form.combobox.cbcurrspm',
//        'App.form.combobox.cbCurrencies'
    ],
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
	                itemId : 'fieldsetdetail',
                    title : 'Form Detail Product ' + this.prodName,
                    defaults:{
                        anchor : '95%'
                    },
                    items: [
                        { xtype: "displayfield", fieldLabel: "Name", name: "prodname", value: this.prodName},
                        { xtype: "hiddenfield", fieldLabel: "id", name: "id", hidden: true},
                        { xtype: "hiddenfield", fieldLabel: "product_id", name: "product_id", value: this.prodId},

                        { xtype: "cbcolor", fieldLabel: "Color", name: "color_id"},
                        { xtype: "cbunits", fieldLabel: "Unit", name: "unit_id"},
                        { xtype: "cbgradekain", fieldLabel: "Grade", name: "grade_id"},
                        {
                            xtype:'fieldcontainer',
                            fieldLabel:'Sales Price',
                            hiddenField: true,
                            layout: 'hbox', anchor: '95%',
                            items : [
                                { xtype: "textfield", fieldLabel: "", name: "salesprice", flex: .3 },
                                { xtype : 'splitter' },
                                { xtype: "cbcurrsp", fieldLabel: "", name: "currsp_id", flex: .6 }
                            ]
                        },

                        {
                            xtype:'fieldcontainer',
                            fieldLabel:'Sales Price Min ',
                            layout: 'hbox', anchor: '95%',
                            items : [
                                { xtype: "textfield", fieldLabel: "", name: "salespricemin", flex: .3 },
                                { xtype : 'splitter' },
                                { xtype: "cbcurrspm", fieldLabel: "", name: "currspm_id", flex: .6 }
                            ]
                        },
                        { xtype: "textfield", fieldLabel: "parent_id", name: "parent_id", value: this.prodId,hidden:true },
                        { xtype: "textfield", fieldLabel: "parent_type", name: "parent_type", value: 'product',hidden:true }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
})

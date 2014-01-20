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

Ext.define('App.view.products.productstocks', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.productgridstocks',
    requires: [
        'App.view.products.productstock',
        'App.view.products.gridProductStockHistory',
        'App.form.combobox.cbUnits'
    ],
    stockStore: null,
//    stockHistoryStore: null,
    storeStockHistory: null,
    record: null,
    prodName: null,
    prodId: null,
    title: 'Stock',
    itemId: 'panelStock',
    frame: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        Ext.apply(this, {

            items: [
                {
                    /**
                     * Grid Product Stock
                     */
                    xtype: 'gridproductstocks',
                    flex: .5,
                    stockStore: this.stockStore,
                    title: this.title,
                    itemId: 'gridStocks'
                },
                {
                    xtype: 'splitter'
                },
                {
                    xtype: 'container',
                    itemId: 'containerHistoryForm',
                    layout: { type: 'hbox', align: 'stretch'},
                    flex: .5,
                    items: [
                        {
                            /**
                             * Stock Product
                             */
                            xtype: 'gridProductStockHistory',
                            flex: .5,
                            title: 'History ' + this.prodName,
                            storeStockHistory: this.storeStockHistory,
                            itemId: 'gridStockHistory',
                            margin: '0 5 0 0'
                        },
                        {
                            /*Form Tambah Record Stock */
                            xtype: 'form',
                            itemId: 'formaddstock',
                            autoScroll: true,
                            margin: '0 0 0 5',
                            bodyPadding: 10,
                            frame: true,
                            defaults:{
                                anchor : '95%'
                            },
                            title: 'Add New Stock Product ' + this.prodName,
                            flex: .5,
                            items: [
                                { xtype: "displayfield", fieldLabel: "Product", name: "prodName", value: this.prodId + ' / ' + this.prodName},
                                { xtype: "hiddenfield", fieldLabel: "id", name: "id"},
                                { xtype: "hiddenfield", fieldLabel: "product_id", name: "product_id", value: this.prodId},
                                { xtype : "cbwarehouse",fieldLabel : "Warehouse", name: "wh_id"},
                                { xtype : "numberfield",fieldLabel : "lengthfabric", name: "lengthfabric"},
                                {
                                    fieldLabel : "Delivery At",
                                    name: "onday",
                                    xtype: 'datefield',
//                                    anchor: '100%',
                                    format: 'd.m.Y',
                                    submitFormat: 'Y-m-d'
                                },
                                { xtype : "cbunits",fieldLabel : "Units", name: "unit_id"}
                            ],
                            buttons: [
                                {
                                    text: 'Add New', iconCls: 'add', itemId: 'addstock'
                                },
                                {
                                    text: 'Reset', iconCls: 'refresh', itemId: 'resetstock'
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
});
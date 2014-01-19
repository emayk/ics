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
        'App.view.products.gridProductStockHistory'
    ],
    stockStore: null,
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
                            stockHistoryStore: null,
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
                            title: 'Add New Stock Product ' + this.prodName,
                            flex: .5,
                            items: [
                                { xtype: "displayfield", fieldLabel: "Product", name: "prodName", value: this.prodId + ' / ' + this.prodName},
                                { xtype: "textfield", fieldLabel: "id", name: "id"},
                                { xtype: "textfield", fieldLabel: "product_id", name: "product_id", value: this.prodId, readOnly: true },
                                { xtype : "textfield",fieldLabel : "wh_id", name: "wh_id"},
                                { xtype : "textfield",fieldLabel : "lengthfabric", name: "lengthfabric"},
                                { xtype : "textfield",fieldLabel : "onday", name: "onday"},
                                { xtype : "textfield",fieldLabel : "unit_id", name: "unit_id"}
                            ],
                            buttons: [
                                {
                                    text: 'save', iconCls: 'save', itemId: 'addstock'
                                },
                                {
                                    text: 'Reset', iconCls: 'refresh', itemId: 'reset'
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
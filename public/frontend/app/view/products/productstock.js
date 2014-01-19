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


Ext.define('App.view.products.productstock', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridproductstocks',
    stockStore: null,
    initComponent: function () {
        Ext.apply(this, {
            store: this.stockStore,
            columnLines: true,
            columnWidth: '95%',
            emptyText: 'Empty Stocks',
            defaults: {
                flex: 1
            },
            columns: [
                { header: 'id', dataIndex: 'id'},
                { header: 'total', dataIndex: 'total'},
                {
                    header: translations.field.warehouse,
                    dataIndex: 'catwh_id',
                    renderer: function (v, m, rec) {
                        return rec.getCatwh().get('name');
                    }
                },
                {
                    header: translations.field.length,
                    dataIndex: 'lengthfabric'
                },
                {
                    header: 'onday',
                    dataIndex: 'onday'
                },
                { header: 'product_id', dataIndex: 'product_id'
                },
                { header: 'wh_id', dataIndex: 'wh_id',
                    renderer: function (v, m, rec) {
                        return rec.getWh().get('name');
                    }
                },
                { header: 'unit_id', dataIndex: 'unit_id'
                },
                { header: 'uuid', dataIndex: 'uuid'
                },
                { header: 'lastupdateby_id', dataIndex: 'lastupdateby_id'
                },
                { header: 'createby_id', dataIndex: 'createby_id'},
                { header: 'updated_at', dataIndex: 'updated_at'},
                { header: 'created_at', dataIndex: 'created_at'}
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: this.stockStore,
                    dock: 'bottom',
                    itemId: 'pgproductstocks',
                    displayInfo: true
                }
            ]
        });
        this.callParent(arguments);
    }
});
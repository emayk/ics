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



Ext.define('App.view.products.gridProductStockHistory', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridProductStockHistory',
    storeStockHistory: null,
    initComponent: function () {
        Ext.apply(this, {
            store: this.storeStockHistory,
            columns: [
                {
                    xtype: 'rownumberer'
                },
//                { text : "id",dataIndex : "id" },
//                { text : "stock_id",dataIndex : "stock_id" },
                { text : "refdoc",dataIndex : "refdoc" },
                { text : "noroll",dataIndex : "noroll" },
                { text : "qty_in",dataIndex : "qty_in" },
                { text : "qty_out",dataIndex : "qty_out" },
                { text : "qty_balance",dataIndex : "qty_balance" }
//                { text : "createby_id",dataIndex : "createby_id" },
//                { text : "lastupdateby_id",dataIndex : "lastupdateby_id" },
//                { text : "created_at",dataIndex : "created_at" },
//                { text : "updated_at",dataIndex : "updated_at" }
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: this.storeStockHistory,
                    itemId: 'pgStockHistory',
                    dock: 'bottom'
                }
            ]
        });
        this.callParent(arguments);
    }
})
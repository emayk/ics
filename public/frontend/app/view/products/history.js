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
Ext.define('App.view.products.history', {
    extend: 'Ext.grid.Panel',
    storeHistory: null,
    record: null,
    alias: 'widget.productshistory',
    padding: 10,
    frame: true,
    prodId: null,
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            store: me.storeHistory,
            columns: [
                {
                    text: 'No',
                    xtype: 'rownumberer',
                    width: 50
                },
                {
                    dataIndex: 'msg',
                    text: 'Description',
                    flex: 5
                }
            ],
            dockedItems: [
                { xtype: 'pagingtoolbar', store: me.storeHistory, displayInfo: true, dock: 'bottom'}
            ]
        });
        this.callParent(arguments);
    }
});

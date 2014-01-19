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

Ext.define('App.view.accountBank.Lists', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.appaccountBankvaccountBankList',
    itemId: 'gridaccountbank',
    frame: true,
    margin: '0 5 0 0',
    storeAccount : null,
    columns: [
        {
            xtype: 'rownumberer',
            width: 50
        },
        {
            header: 'owner id',
            dataIndex: 'owner_id',
            flex: 2
        },   {
            header: 'Name',
            dataIndex: 'name',
            flex: 2
        },
        {
            header: 'Number',
            dataIndex: 'number',
            flex: 1
        },
        {
            header: 'Bank Name',
            dataIndex: 'bankname',
            flex: 2
        },
        {
            header: 'Bank Type',
            dataIndex: 'banktype',
            flex: 2
        }
    ],
    store: 'App.store.accountBank.saccountBank',

    initComponent: function(){
        Ext.apply(this,{
          store: this.storeAccount,
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    itemId: 'pgAccountBank',
                    store: this.storeAccount,
                    displayInfo: true
                }
            ]
        });
        this.callParent(arguments);
    }
});

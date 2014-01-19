/**
 * Part Of ICS
 *
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
 *
 *
 **/

Ext.define('App.controller.caccountBank', {
    extend: 'Ext.app.Controller',
    views: ['App.view.accountBank.vaccountBank'],
    models: ['App.model.accountBank.maccountBank'],
    stores: ['App.store.accountBank.saccountBank'],
    refs: [
        {
            ref: 'panel',
            selector: 'appaccountBankvaccountBank'
        },
        {
            ref: 'grid',
            selector: 'appaccountBankvaccountBank #gridlist'
        },
        {
            ref: 'formAccount',
            selector: 'appaccountBankvaccountBank #formaccount'
        }
    ],
    init: function () {
        var me = this;
        me.control({
            /*Panel*/
            "appaccountBankvaccountBank": {

            },
            /*Grid*/
            'appaccountBankvaccountBank #gridlist': {
                itemclick: me.showInfo
            },
            /*Form*/
            'appaccountBankvaccountBank #formaccount': {

            },
            'appaccountBankvaccountBank #formaccount': {

            },
            'appaccountBankvaccountBank #formaccount #add': {
                click: me.saveRecord
            },
            'appaccountBankvaccountBank #formaccount #remove': {
                click: me.removeRecord
            }
        });
    },
    showInfo: function (grid, record) {
        var me = this;
        me.getFormAccount().getForm().loadRecord(record);
    },
    removeRecord: function (btn) {
        var me = this, grid = me.getGrid(),
            store = grid.getStore(),
            selection = grid.getSelectionModel();

        Ext.each(selection.selected.items, function (record) {
            store.remove(record);
        });
        store.sync();

    },
    saveRecord: function (btn) {
        log(btn.text);
    },
    type: 'Buyers'
});


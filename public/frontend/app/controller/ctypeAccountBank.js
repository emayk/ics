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

Ext.define('App.controller.ctypeAccountBank',{
	extend: 'Ext.app.Controller',
	views: ['App.view.typeAccountBank.vtypeAccountBank'],
	models:['App.model.typeAccountBank.mtypeAccountBank'],
	stores:['App.store.typeAccountBank.stypeAccountBank'],
    refs: [
        {ref: 'grid', selector: 'apptypeAccountBankvtypeAccountBank grid'}
    ],
    init: function () {
        var me = this;
        me.control({
            'apptypeAccountBankvtypeAccountBank': {

            },

            /**
             * Grid Type Product
             */
            'apptypeAccountBankvtypeAccountBank grid': {
                render: me.gridrender,
                edit: me.processEdit,
                selectionchange: me.processSelectionChange
            },
            /**
             * Save Record
             */
            'apptypeAccountBankvtypeAccountBank grid button#add': {
                click: me.addRecordType
            },
            'apptypeAccountBankvtypeAccountBank grid button#remove': {
                click: me.removeRecordType
            },
            'apptypeAccountBankvtypeAccountBank grid button#import': {
                click: function (btn) {
                    log(btn.text + 'clicked');
                }
            },
            'apptypeAccountBankvtypeAccountBank grid button#export': {
                click: function (btn) {
                    log(btn.text + 'clicked');
                }
            },
            'apptypeAccountBankvtypeAccountBank grid button#help': {
                click: function (btn) {
                    log(btn.text + 'clicked');
                }
            }
        });
    },
    gridrender: function () {
        this.getGrid().getStore().load();
    },
    processEdit: function(editor, object){
        object.store.sync();
        this.getGrid().getView().refresh();
    },
    processSelectionChange: function (current, selections) {
        this.getGrid().down('button[action=remove]').setDisabled(selections.length == 0);
    },
    cntNewRecord : 1,
    addRecordType: function (button) {
        var me = this, grid = me.getGrid(),
            cnt = me.cntNewRecord,
            rowEditing = grid.getPlugin('cellEditorTypeAccountBank'),
            model = Ext.create('App.model.typeAccountBank.mtypeAccountBank',{
                name: 'New Type Account Bank ' + cnt
            });
        grid.getStore().insert(0, model);
        rowEditing.startEdit(0, 0);
        me.cntNewRecord++;
    },

    removeRecordType: function (button) {
        var me = this,
            selection = me.getGrid().getSelectionModel(),
            store = me.getGrid().getStore();

        Ext.each(selection.selected.items, function (dept) {
            me.getGrid().getStore().remove(dept);
        });
        store.sync();
    }
});


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

Ext.define('App.controller.ctaxtype', {
    extend: 'Ext.app.Controller',
    views: ['App.view.taxtype.vtaxtype', 'App.view.taxtype.Edit'],
    models: ['App.model.taxtype.mtaxtype'],
    stores: ['App.store.taxtype.staxtype'],
    refs: [
        {
            ref: 'grid',
            selector: 'apptaxtypevtaxtypeLists'
        },
        {
            ref: 'tabs',
            selector: 'apptaxtypevtaxtype'
        },
        {
            ref: 'winEdit',
            selector: 'apptaxtypevtaxtypeWindow'
        }
    ],
    cntNewRecord: 1,
    init: function () {
        var me = this;
        me.control({
            /*Begin*/
            'apptaxtypevtaxtype': {
            },
            'apptaxtypevtaxtypeLists': {
                render: function (grid) {
                    grid.getStore().load();
                },
                itemdblclick: me.showWindow
            },

            /*Add Record*/
            'apptaxtypevtaxtypeLists button#add': {
                click: me.addRecord
            },
            /*Remove Record*/
            'apptaxtypevtaxtypeLists button#remove': {
                click: me.removeRecord
            },
            /*Import*/
            'apptaxtypevtaxtypeLists button#import': {
                click: function (btn) {
                    log(btn.text + 'clicked');
                }
            },
            /*Import*/
            'apptaxtypevtaxtypeLists button#export': {
                click: function (btn) {
                    log(btn.text + 'clicked');
                }
            },
            /*Export*/
            'apptaxtypevtaxtypeLists button#help': {
                click: me.showHelp
            },
            /*Save Record*/
            'apptaxtypevtaxtypeWindow #save': {
                click: me.saveRecord
            },
            /*Close */
            'apptaxtypevtaxtypeWindow #cancel': {
                click: me.closeWindow
            } ,
               /*Help */
            'apptaxtypevtaxtypeWindow #help': {
                click: me.showHelp
            }
            /*End*/
        });
    },

    /**
     * Save Record Supplier
     * @param btn
     * @returns {boolean}
     */
    saveRecord: function (btn) {
        var me = this, win = btn.up('apptaxtypevtaxtypeWindow'),
            form = win.down('#formtaxtype').getForm(),
            record = form.getRecord(),
            values = form.getValues(),
            store = me.getGrid().getStore();

        if (!record) {
            var record = Ext.create('App.model.taxtype.mtaxtype');
            record.set(values);
            var valid = me.recordValidate(record);
            if (!valid) { msgError('Silahkan Perbaiki'); return false ; }
            store.add(record);
        } else {
            form.updateRecord(record);
        }
        store.sync();
        win.close();
    },
    recordValidate: function (model) {
        var error = model.validate();
        return  (error.length > 0 ) ? false : true;
    },
    addRecord: function (btn) {
        var me = this, cnt = me.cntNewRecord, win;

        if (!win) {
            var title = 'New Record ' + cnt,
                win = Ext.create('App.view.taxtype.Edit', {title: title, modal: true});
            win.show();
        }
        me.cntNewRecord++;
    },
    removeRecord: function (btn) {
        var me = this, grid = me.getGrid(),
            store = grid.getStore(),
            selection = grid.getSelectionModel();

        if (!selection.getSelection().length) {
            msgError('Silahkan Pilih dulu Record');
            return false;
        }
        ;

        Ext.each(selection.selected.items, function (record) {
            store.remove(record);
        });
        store.sync();
    },
    showWindow: function (grid, record) {
        /*Edit Info*/
        var me = this, win, title = 'Information ' + record.get('name');
        if (!win) {
            win = Ext.create('App.view.taxtype.Edit', {title: title, modal: true});
            win.down('form').getForm().loadRecord(record);
            win.show();
        }
    },
    showHelp: function (btn) {
        belumImplement();
    },
    closeWindow: function (btn) {
        btn.up('apptaxtypevtaxtypeWindow').close();
    }

})
;


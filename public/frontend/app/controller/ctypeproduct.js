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

Ext.define('App.controller.ctypeproduct', {
    extend: 'Ext.app.Controller',
    views: ['App.view.typeproduct.vtypeproduct',
        'App.form.combobox.cbFabricType'
    ],
    models: ['App.model.typeproduct.mtypeproduct'],
    stores: [
        'App.store.typeproduct.stypeproduct',
        'App.store.combo.cbFabricType'
    ],
    refs: [
        {ref: 'grid', selector: 'apptypeproductvtypeproduct grid#gridType'}
    ],
    init: function () {
        var me = this;
        me.control({
            'apptypeproductvtypeproduct': {

            },

            /**
             * Grid Type Product
             */
            'apptypeproductvtypeproduct grid#gridType': {
                render: me.gridTypeProductrender,
                edit: me.processEdit,
                selectionchange: me.processSelectionChange
            },
            /**
             * Save Record
             */
            'apptypeproductvtypeproduct grid#gridType button#add': {
                click: me.addRecordType
            },
            'apptypeproductvtypeproduct grid#gridType button#remove': {
                click: me.removeRecordType
            },
            'apptypeproductvtypeproduct grid#gridType button#import': {
                click: function (btn) {
                    log(btn.text + 'clicked');
                }
            },
            'apptypeproductvtypeproduct grid#gridType button#export': {
                click: function (btn) {
                    log(btn.text + 'clicked');
                }
            },
            'apptypeproductvtypeproduct grid#gridType button#help': {
                click: function (btn) {
                    log(btn.text + 'clicked');
                }
            }
        });
    },
    gridTypeProductrender: function () {
        this.getGrid().getStore().load();
    },
    processEdit: function(editor, object){
        object.store.sync();
         this.getGrid().getStore().reload();
    },
    processSelectionChange: function (current, selections) {
        this.getGrid().down('button[action=remove]').setDisabled(selections.length == 0);
    },
    cntNewRecord : 1,
    addRecordType: function (button) {
        var me = this, grid = me.getGrid(),
            cnt = me.cntNewRecord,
            rowEditing = grid.getPlugin('cellEditorTypeProduct'),
            model = Ext.create('App.model.typeproduct.mtypeproduct',{
                name: 'New Type Product ' + cnt
            });
        grid.getStore().insert(0, model);
        rowEditing.startEdit(0, 0);
        me.cntNewRecord++;
    },

    removeRecordType: function (button) {
        log('Remove' + button.text);

        var me = this,
            selection = me.getGrid().getSelectionModel(),
            store = me.getGrid().getStore();

        Ext.each(selection.selected.items, function (dept) {
            me.getGrid().getStore().remove(dept);
        });
        store.sync();
        store.load();
    }
});


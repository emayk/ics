/**
 *
 * Controller Satuan
 *
 **/

Ext.define('App.controller.master.ctlUnit', {
    extend: 'Ext.app.Controller',
    views: ['master.unit.ListUnit', 'App.form.combobox.cbUnitType'],
    models: ['unit.allUnit'],
    stores: ['unit.Allunit',
        'combo.cbUnitType'],
    refs: [
        {
            ref: 'gridUnits',
            selector: 'gridAllunit'
        }
    ],

    init: function () {
        log(' Unit Controller Init');
        var me = this;
        this.control({
            'gridAllunit': {
                edit: function (editor, object) {
                    object.store.save();
                    // this.getUnitAllunitStore().load();
                    me.refresh();
                    log('Save Process and refresh grid/store');
                },
                selectionchange: function (current, selections) {
                    var disabled = (selections.length == 0);
                    me.getGridUnits().down('button[action=remove]').setDisabled(disabled);
                    log('selection change : ' + disabled);
                }
            },
            'gridAllunit > toolbar > button[action=add]': {
                click: function (button) {
                    log('Add Unit');
                    me.getUnitAllunitStore().insert(0, me.getUnitAllUnitModel().create());
                    var rowEditing = grid.getPlugin('ceAllUnits');
                    rowEditing.startEdit(0, 0);

                }
            },
            'gridAllunit > toolbar > button[action=remove]': {
                click: function (button) {
                    var selection = me.getGridUnits().getSelectionModel();
                    Ext.each(selection.selected.items, function (unit) {
                        me.getUnitAllunitStore().remove(unit);
                    });
                    me.getUnitAllunitStore().sync();
                    me.getUnitAllunitStore().reload();
                    log('Remove Unit');
                }
            }
        });

        this.load_store();

    },
    load_store: function () {
        // this.'combo.cbUnitType'
        this.getComboCbUnitTypeStore().load();
    },
    refresh: function () {
        Ext.getCmp('pgUnits').moveFirst();
        // Ext.getCmp('pgUnits').doRefresh();
    }

});

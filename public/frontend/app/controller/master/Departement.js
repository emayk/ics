/**
 *
 * Controller Master Departement
 *
 * Menangani Semua berkenaan dengan master Departement
 */

Ext.define('App.controller.master.Departement', {
    extend: 'Ext.app.Controller',
    views: [
        'App.view.master.departement.List',
//        'App.view.master.departement.tabs'
    ],
    models: ['App.model.Departement'],
    stores: ['App.store.Departements'],
    refs: [
        {
            ref: 'grid',
            selector: 'departementGridList'
        },
//        {
//            ref: "tabs",
//            selector: "departementtabs"
//        }
    ],

    init: function () {
        this.control({
            /**
             * Update Record to Store
             */
            "departementGridList": {
                edit: function (editor, object) {
                    object.store.save();
                    this.getGrid().getStore().load();
                },
                /**
                 * Proses Select Change Departement
                 * @param current
                 * @param selections
                 */
                selectionchange: function (current, selections) {
                    this.getGrid().down('button[action=remove]').setDisabled(selections.length == 0);
                }
            },
            /**
             * Add Departement
             */
            "departementGridList > toolbar > button[action=add]": {
                click: function (button) {
                    var me = this, grid = me.getGrid(),
                        rowEditing = grid.getPlugin('cellEditorDept'),
                        model = Ext.create('App.model.Departement', {
                            name: 'New Departement ' + new Date()
                        });
                    grid.getStore().insert(0, model);
                    rowEditing.startEdit(0, 0);
                }
            },
            /**
             * Aksi Delete Departement
             */
            "departementGridList > toolbar > button[action=remove]": {
                click: function (button) {
                    var me = this,
                        selection = me.getGrid().getSelectionModel(),
                        store = me.getGrid().getStore();

                    Ext.each(selection.selected.items, function (dept) {
                        store.remove(dept);
                    });

                    store.sync();
                    store.load();

                }
            }
        });
    log('departement');
    }
});

/**
 *
 * Controller Color
 *
 * Programmer By Emay Komarudin.
 * 2013
 *
 **/

Ext.define('App.controller.master.Color', {
    extend: 'Ext.app.Controller',
    views: ['App.view.master.color.List'],
    models: ['App.model.Color'],
    stores: ['App.store.Colors'],
    refs: [
        {
            ref: 'grid',
            selector: 'colorGridList'
        }
    ],
    /**
     * Initialisasi Count Record Baru
     */
    newRecordCount: 1,
    init: function () {
        log('Color Controller Init');
        var me = this;
        me.control({

            'colorGridList': {
                /**
                 * Proses Edit Record
                 * @param editor
                 * @param object
                 */
                edit: function (editor, object) {
                    log('Save Process');
                    object.store.sync();
                    me.doRefresh();
                },
                /**
                 * Saat Render Grid
                 */
                render: function () {
                    this.getGrid().getStore().load();
                },
                /**
                 * Saat Record pilih berubah
                 * @param current
                 * @param selections
                 */
                selectionchange: function (current, selections) {
                    log('selection change');
                    this.getGrid().down('button[action=remove]').setDisabled(selections.length == 0);
                }
            },

            /**
             * Tombol Proses Tambah record
             */
            'colorGridList > toolbar > button[action=add]': {
                click: function (button) {
                    log('Add Color');
                    var grid = this.getGrid(),
                    rowEditing = grid.getPlugin('cellEditorColor'),
                    cnt = me.newRecordCount,
                    record = Ext.create('App.model.Color', {
                        name: 'New Color ' + cnt
                    });

                    grid.getStore().insert(0, record);
                    rowEditing.startEdit(0, 0);
                    me.newRecordCount++;
                }
            },

            /**
             * Proses Delete
             */
            'colorGridList > toolbar > button[action=remove]': {
                click: function (button) {
                    log('Remove Color');

                    var me = this,grid = me.getGrid();
                    var selection = grid.getSelectionModel();

                    Ext.each(selection.selected.items, function (dept) {
                        grid.getStore().remove(dept);
                    });

                    grid.getStore().sync();
                    this.doRefresh();
                }
            }
        });
    },
    doRefresh: function () {
        this.getGrid().getView().refresh();
    }

});

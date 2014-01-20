/**
 * Controller Type Order
 */
Ext.define('App.controller.master.TypeOrder', {
    extend: 'Ext.app.Controller',
    views: [
        'App.view.master.typeorder.List'
    ],
    models: ['App.model.TypeOrder'],
    stores: ['App.store.TypeOrders'],
    /**
     * Referensi
     */

    refs: [
        {
            ref: 'grid',
            selector: 'typeorderGridList'
        }
    ],
    init: function () {
        var me = this;
        me.control({
            /**
             * Grid Order Type
             */
            'typeorderGridList': {
                edit: me.processEdit,
                selectionchange: me.processSelectionChange
            },
            /**
             * Tombol Add
             */
            'typeorderGridList > toolbar > button[action=add]': {
                click: me.Addrow
            },
            /**
             * Tombol remove
             */
            'typeorderGridList > toolbar > button[action=remove]': {
                click: me.Removerow
            }

        });
//		 this.getTypeOrdersStore().load();
    },
    /**
     * Proses Edit
     * @param editor
     * @param object
     */
    processEdit: function (editor, object) {
        log('Save Process');
        object.store.save();
        this.RefreshRow();
    },
    /**
     * Selection Change
     * @param current
     * @param selections
     */
    processSelectionChange: function (current, selections) {
        var grid = this.getGrid();
        grid.down('button[action=remove]').setDisabled(selections.length == 0);
    },
    cntNewRecord: 1,
    /**
     * New record
     * @param button
     * @constructor
     */
    Addrow: function (button) {
        log('Add');
        var me = this, grid = me.getGrid(),
            cnt = me.cntNewRecord,
            model = Ext.create('App.model.TypeOrder', {
                name: 'Type Order ' +cnt
            });

        grid.getStore().insert(0, model);
        var rowEditing = grid.getPlugin('cellEditorOrderType');
        rowEditing.startEdit(0, 0);
        me.cntNewRecord++;
    },
    /**
     * Remove Record
     * @param button
     * @constructor
     */
    Removerow: function (button) {
        log('Remove');
        var me = this, grid = this.getGrid(),
            selection = grid.getSelectionModel();

        Ext.each(selection.selected.items, function (dept) {
            grid.getStore().remove(dept);
        });
        grid.getStore().sync();
        me.RefreshRow();
    },
    /**
     * Refresh Grid
     * @constructor
     */
    RefreshRow: function () {
        this.getGrid().getStore().reload();
    }

});
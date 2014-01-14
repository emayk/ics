/**
 * Controller Master Bank
 */
Ext.define('App.controller.master.Banks', {
    name: 'App.controller.master.Banks',
    extend: 'Ext.app.Controller',
    views: [
        'App.view.master.bank.List', //bankListGrid
        'App.view.master.bank.AddForm', //masterbankwindowedit
        'App.view.master.bank.addWindow' //bankAddWindow
    ],
    models: ['App.model.Bank'],
    stores: ['App.store.Banks'],
    refs: [
        { ref: 'bankGrid', selector: 'bankListGrid'},
        { ref: 'winForm', selector: 'masterbankwindowedit'},
        { ref: 'formBank', selector: 'masterbankwindowedit #formbank'},
        { ref: 'addWindow', selector: 'bankAddWindow'}

    ],
    init: function () {
        var me = this;
        log('Controller Banks Loaded');
        me.control({
            "bankListGrid": {
                itemdblclick: me.onDoubleClickItemBank,
                render: function (grid) {
                    grid.getStore().load();
                }
            },
            "masterbankwindowedit button[action=save]": { click: me.saveBank },
            "bankListGrid button[action=delete]": { click: me.deleteBank },
            "bankListGrid button[action=add]": { click: me.AddBank }
        });
    },
    /**
     * Tombol Add ditekan
     * untuk menambahkan Informasi Bank
     *
     * @param grid
     * @param record
     * @constructor
     */
    AddBank: function (grid, record) {
        var me = this, gridlist = me.getBankGrid(), winEdit;

        if (!winEdit) {
            var model = Ext.create('App.model.Bank', {
                name: 'New Bank '
            });

            winEdit = Ext.create('App.view.master.bank.AddForm', {
                title: 'New Bank '
            });
            var form = winEdit.down('form');
            form.loadRecord(model);

            winEdit.show();
        }
        ;
    },

    onDoubleClickItemBank: function (grid, record) {
        log('Windows Loaded to Edit Bank');
        var win;

        if (!win) {
            win = Ext.create('App.view.master.bank.AddForm', {
                title: 'Information of ' + record.get('name')
            });

            win.down('form').getForm().loadRecord(record);
            win.show();
        }

    },
    /**
     * Saat Tekan tombol Simpan/save
     * @param button
     */
    saveBank: function (button) {
        log('Proses Save Bank');
        var me = this,
            win = button.up('window'),
            form = win.down('form'),
            record = form.getRecord(),
            grid = me.getBankGrid(),
            store = grid.getStore(),
            values = form.getValues();

        record.set(values);
        record.save();
        store.load();
        win.close();
    },
    /**
     * Delete Bank
     * @param btn
     * @returns {boolean}
     */
    deleteBank: function (btn) {
        var me = this,
            grid = me.getBankGrid(),
            record = grid.getSelectionModel().getSelection()[0],
            store = grid.getStore();
        if (record === undefined) {
            msgError('Pilih Record Bank Dulu');
            return false;
        }

        store.remove(record);
        store.sync();
        log(store.count());
        /**
         * Jika Jumlah Store Sudah 0 pada page saat delete record
         */
        if (store.count() == 0) {
            store.loadPage(1);
        } else {
            store.load();
        }
    }


});
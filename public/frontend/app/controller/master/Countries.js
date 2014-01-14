/**
 * Controller Location
 *
 *
 * @todo
 * - saat pilih negara, provinse reload , city disable
 * - saat pilih province, city reload
 *
 */
Ext.define('App.controller.master.Countries', {
    extend: 'Ext.app.Controller',
    views: [
        /*Grids*/
        'App.view.master.location.tabs',
        'App.view.master.location.ListCountries',
        'App.view.master.location.ListProvinces',
        'App.view.master.location.ListCities',
        /*Form and Window */
        'App.view.master.location.winCountry',
        'App.view.master.location.frmCountry',

        /*Province*/
        'App.view.master.location.winProvince',
        'App.view.master.location.frmProvince',
        /*City*/
        'App.view.master.location.winCity',
        'App.view.master.location.frmCity',

        'App.store.combo.cbCountries'
    ],
    models: [
        'App.model.Country',
        'App.model.Province',
        'App.model.City'
    ],
    stores: [
        'App.store.Countries',
        'App.store.Provinces',
        'App.store.Cities',
        'App.store.combo.cbCountries'
    ],
    refs: [
        /*Grids*/
        { ref: 'gridCountry', selector: 'masterlocationtab #countries' },
        { ref: 'gridProvince', selector: 'masterlocationtab #provinces' },
        { ref: 'gridCity', selector: 'masterlocationtab #cities' },
        /*Buttons*/
        { ref: 'btnExportCountry', selector: 'masterlocationtab > toolbar #export' },
        { ref: 'btnImportCountry', selector: 'masterlocationtab > toolbar #import' },
        /*Country*/
        { ref: 'btnAddCountry', selector: 'masterlocationtab listcountriesGP > toolbar #add' },
        { ref: 'btnRemoveCountry', selector: 'masterlocationtab listcountriesGP > toolbar #remove' },
        /*Province*/
        { ref: 'btnAddProvince', selector: 'masterlocationtab listprovincesGP > toolbar #add' },
        { ref: 'btnRemoveProvince', selector: 'masterlocationtab listprovincesGP > toolbar #remove' },
        /*City*/
        { ref: 'btnAddCity', selector: 'masterlocationtab listcitiesGP > toolbar #add' },
        { ref: 'btnRemoveCity', selector: 'masterlocationtab listcitiesGP > toolbar #remove' }
    ],
    cnt: {
        newcountry: 1,
        newprovince: 1,
        newcity: 1
    },
    init: function () {
        log('Countries Controller Init');
        var me = this;
        me.control({
            "listcountriesGP": {
                edit: function (editor, object) {
                    log('Save Process');
                    object.store.save();
                    me.doRefresh();
                },
                itemclick: me.onCountriesrecordClick,
                render: me.renderGridCountry,

                selectionchange: function (grid, selections) {
                    var me = this, selected = selections.length > 0;
                    /**
                     * Disable Button remove Jika tida yang dipilih
                     */
                    me.getBtnRemoveCountry().setDisabled(!selected);
//                    me.onCountriesrecordClick(grid,selections[0]);
                },
                canceledit: me.onCancelEditingCountry
            },
            /**
             * Add Country
             */
            'listcountriesGP > toolbar > button[action=add]': {
                click: me.addCountryProcess
            },
            /**
             * Remove Country
             */
            'listcountriesGP > toolbar > button[action=remove]': {
                click: me.removeCountryProcess
            },
            /*Province*/

            'listprovincesGP': {
                itemclick: me.getRecordsCities,
                canceledit: me.onCancelEditingProvince
            },

            'listcitiesGP': {
                canceledit: me.onCancelEditingCity
            }

        });
    },
    onLaunch: function () {
        /**
         * Setup Store Listener
         */
        var me = this;
        me.setupCountryStoreListener();

        log('controller launcher countries');
    },

    /**
     * Setup Listenet Store Country
     */
    setupCountryStoreListener: function () {
        /**
         * Catatan :
         * @todo :
         * Untuk semua response
         * yang menentukan adalah error = true,
         * walaupun success = true,
         * extjs tidak akan mengeksekusi listener write (kalo success == false)
         * apalagi kalo code status != 200.
         */
        var me = this,
            storeCountries = me.getGridCountry().getStore(); //me.getAppStoreCountriesStore();
        storeCountries.on(
            /**
             * Ini akan selalu dijalankan saat proses edit
             */
            'update', function (store, record, operation, eOpts) {
                store.reload();
            }, this
        );
        /**
         * Ini fire saat proxy berubah data.
         */
        storeCountries.on(
            'datachanged', function (store, eOpts) {
                log('data changed bray');
            }, this
        );
        /**
         * masih tanda tanya :-)
         */
        storeCountries.on(
            'beforesync', function ( options, eOpts ) {
                log('before sync');
                log(options);
                log(eOpts);
            }, this
        );

        storeCountries.on(
            /**
             * Ini Tidak Akan Fire!
             * jika success dari proxy == false (success == false)
             * maka untuk mengatasinya
             * gunakan success = true, tapi dengan tambahan
             * error = true,
             * misal jsonnya
             * { success : true, error : false, reason : 'update fail' }
             *
             */
            'write', function (store, operation, eOpts) {
                var json = Ext.JSON.decode(operation.response.responseText),
                    error = json.error;
                if (error)
                {
                    /**
                     * Jika Error, tampilkan Message (reason)
                     * @type {string|String}
                     */
                    var reason = json.reason;
                    msgError(reason);
                };
            }, this
        );

    },

    finishedLoading: function () {
        log('write event ..just for test');
    },
    doRefresh: function (grid) {
        log(grid);
//        grid.getView().refresh();
    },
    onCancelEditingCountry: function () {
        var store = this.getGridCountry().getStore();
        store.each(function (record) {
            if (record.phantom) {
                store.remove(record);
                return false;
            }
        }, this);

    },
    onCancelEditingProvince: function () {
        var store = this.getGridProvince().getStore();
        store.each(function (record) {
            if (record.phantom) {
                store.remove(record);
                return false;
            }
        }, this);

    },
    onCancelEditingCity: function () {
        var store = this.getGridCity().getStore();
        store.each(function (record) {
            if (record.phantom) {
                store.remove(record);
                return false;
            }
        }, this);

    },
    /**
     * Saat Grid Country render
     * @param grid
     */
    renderGridCountry: function (grid) {
        grid.getStore().load();
    },
    /**
     * Tambah Negara
     * @param btn
     */
    addCountryProcess: function (btn) {
        /**
         * Showing Form Window
         * untuk tambah Negara
         */
        var me = this,
            cnt = me.cnt.newcountry,
            win;

        /**
         * Jika Belum ada , tampilkan
         */
        if (!win) {

            var record = Ext.create('App.model.Country', {
                name: 'New Country ' + cnt
            });

            win = Ext.create('App.view.master.location.winCountry', {
                title: 'Add New Country ',
                modal: true
            });

            win.show();
            win.down('form').getForm().loadRecord(record);
            me.cnt.newcountry++;
        }
    },
    /**
     * Remove Negara
     * @param button
     */
    removeCountryProcess: function (button) {
        var me = this, grid = me.getGridCountry(),
            store = grid.getStore(),
            selection = grid.getSelectionModel();

        Ext.each(selection.selected.items, function (record) {
            store.remove(record);
        });
        store.sync();
        me.doRefresh(grid);
    },
    /**
     * Saat Grid di click
     * Tampilkan Province
     *
     * @param grid
     * @param record
     * @param item
     * @param index
     * @param e
     * @param eOpts
     */
    onCountriesrecordClick: function (grid, record, item, index, e, eOpts) {
        /**
         * request to server , param level = 1
         * set proxy grid ke parameter level 1 dan country id yang dipilih
         * load grid province
         */
        var me = this,
            gridProvince = me.getGridProvince(),
            idCountry = record.get('id');

        /*Setup Grid Province to param idCountry*/
        var storeProvince = gridProvince.getStore(), provincerecords;
        storeProvince.clearFilter();
        storeProvince.clearData();
        storeProvince.getProxy().setExtraParam('parentId', idCountry);
        storeProvince.load({
            scope: this,
            callback: me.processRecordProvince
        });
        gridProvince.getView().refresh();
    },
    /**
     * Proses Record Province
     *
     * @param records
     * @param operation
     * @param success
     */
    processRecordProvince: function (records, operation, success) {
//        if (records.length > 0) {
//            /*Check Apakah ada Record Yang dipilih ? */
//            var me = this, selectedProvince = me.getGridProvince().getSelectionModel().getSelection();
//            if (selectedProvince.length) {
//                var recordProvince = selectedProvince[0];
//                var idProvince = recordProvince.get('id');
//                /*Jika Grid Province memiliki data*/
//                var gridCity = me.getGridCity(), storeCity = gridCity.getStore();
//                storeCity.clearFilter();
//                storeCity.getProxy().setExtraParam('parentId', idProvince);
//                storeCity.load();
//                gridCity.getView().refresh();
//            }
//
//        } else {
//            /*Jika Tidak Ada Disable Grid*/
//
//        }

    },
    /**
     * Mendapatkan Records City
     */
    getRecordsCities: function (grid, record, item, index, e, eOpts) {
        var me = this, idProvince = record.get('id'),
            grid = me.getGridCity(), store = grid.getStore();
        store.clearFilter();
        store.clearData();
        store.getProxy().setExtraParam('parentId', idProvince);
        store.load();
        grid.getView().refresh();
    }

});

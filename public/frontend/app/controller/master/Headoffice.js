Ext.define('App.controller.master.Headoffice', {
    extend: 'Ext.app.Controller',
    views: [
        'App.view.master.office.ListHead',
        'App.view.master.office.form.Add',
        'App.form.combobox.cbCountries',
        'App.form.combobox.cbProvinces',
        'App.form.combobox.cbCities'
    ],
    models: ['App.model.Headoffice'],
    stores: [
        'App.store.Headoffices',
        'App.store.cbProvinces',
        'App.store.Cbcountries',
        'App.store.ProvinceByCid',
        'App.store.CitiesByPid'
    ],

    refs: [
        {
            ref: 'grid',
            selector: 'listheadGP' },
        {
            ref: 'cbCountriesBox',
            selector: 'cbCountries'
        },
        {
            ref: 'cbProvincesBox',
            selector: 'cbProvinces'
        },
        {
            ref: 'cbCitiesBox',
            selector: 'cbCities'
        },
        {
            ref: 'winForm',
            selector: 'winFormHeadOffice'
        }
    ],

    init: function () {
        log('Controller Headoffice Loaded');
        var me = this;

        me.control({
            'listheadGP': {
                itemdblclick: me.processEditRecord
            },
            'listheadGP > toolbar > button[action=add]': {
                click: this.formAdd
            },
            /*==========  Event Form Edit  ==========*/
            'formHeadOffice button[action=save]': { click: this.processSave },

            'formHeadOffice button[action=cancel]': {
                click: me.closeWindowForm
            },
            /*==========  Form Combo Province  ==========*/
            'cbCountries': {
                select: this.onCountriesSelect
            },
            /*==========  Form Combo Country  ==========*/
            'cbProvinces': {
                select: this.onProvinceSelect
            },
            'cbCities': {
                select: this.onCitiesSelect
            }
        });


    },
    closeWindowForm: function (button) {
        var win = button.up('window');
        win.close();
    },
    formAdd: function (grid, record) {
        var me = this, win;
        if (!win) {
            win = Ext.create('App.view.master.office.form.Add', {
                modal: true,
                title: 'New Head Office'
            });
            win.show();
        }
    },

    processEditRecord: function (grid, record) {
        log(record);
        var me = this,
            win = Ext.create('App.view.master.office.form.Add', {
                title: 'Edit Record ' + record.get('id'),
                modal: true
            });

        var comboxCountry = win.down('#comboxcountry');
        var comboxProvince = win.down('#comboxprovince');
        var comboxCity = win.down('#comboxcity');

        win.down('[name=type]').setValue(record.get('type'));

        comboxCountry.getStore().load();
        comboxProvince.getStore().load({params: {'parent_id': comboxCountry.getValue() } });
        comboxCity.getStore().load({params: {'parent_id': record.get('province_id') } });
        win.down('form').getForm().loadRecord(record);
        win.show();
    },


    onCountriesSelect: function (obj) {
        console.log('Countries is selected');
        this.getCbProvincesBox().getStore().load(
            {params: {'parent_id': obj.getValue()} }
        );
        this.clearValueCombo(this.getCbProvincesBox());
        this.clearDisable(this.getCbCitiesBox());
    },
    onProvinceSelect: function (obj) {
        log('cbProvinces Selected Trigger');
        this.getCbCitiesBox().getStore().load({params: {'parent_id': obj.getValue()} });
        this.clearEnable(this.getCbCitiesBox());

    },
    onCitiesSelect: function (obj) {
        log('onCitiesSelect Selected Trigger');
        log(this.getCbProvincesBox().getValue());
    },
    clearValueCombo: function (combo) {
        combo.enable();
        combo.clearValue();
        combo.clearInvalid();
    },
    clearDisable: function (combo) {
        combo.clearValue();
        combo.clearInvalid();
        combo.disable();
    },
    clearEnable: function (combo) {
        combo.enable();
        combo.clearValue();
        combo.clearInvalid();
    },
    processSave: function (button) {
        /*==========  Buat Form Untuk Form Edit  ==========*/
        var win = button.up('window'),
            me = this,
            form = win.down('form'),
            record = form.getRecord(),
            values = form.getValues(),
            grid = me.getGrid(),
            store = grid.getStore();
        /*==========  update record  ==========*/


        var refresh = false;
        if (!record) {
            record = Ext.create('App.model.Headoffice');
            record.set(values);
            store.add(record);
            refresh = true;
        } else {
            record.set(values);
        }
        /*==========  synchronize the store after editing the record  ==========*/
        win.close();
        store.sync();
        if (refresh) {
            store.load();
        }
        grid.getView().refresh();
    }
});
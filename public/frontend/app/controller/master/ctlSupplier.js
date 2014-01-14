/**
 *
 * Controller Supplier
 *
 **/
//
var cnt = 0;
Ext.define('App.controller.master.ctlSupplier', {
    extend: 'Ext.app.Controller',
    requires: ['App.util.Util'],
    cntTab: 1,
    views: [
        'App.view.vActionForm',
        /*Grid Supplier*/
        'App.view.master.supplier.ListSupplier',
        'App.view.master.supplier.Tab',
        /*Tab Informasi Supplier*/
        'App.view.master.supplier.informasi',
        /*Grid Account Bank*/
        'App.view.master.supplier.ListRekeningBank',
        /*Grid Contact Supplier*/
        'App.view.master.supplier.ListContact',
        /*Grid Office Phones*/
        'App.view.master.supplier.ListPhones',
        /*Grid Offices Supplier*/
        'App.view.master.supplier.ListOffice',
        /*Tab Office*/
        'App.view.master.supplier.TabOffices',


        /*Forms*/
        /*Form Add/Edit Supplier */
        'App.view.master.supplier.formSupplier',
        /*Form Account Bank*/
        'App.view.master.supplier.formAccountBank',
        /*Window Account Bank*/
        'App.view.master.supplier.winAccountBank',
        /*Form Contact*/
        'App.view.master.supplier.formContact',
        'App.view.master.supplier.formOffice',
        'App.view.master.supplier.formPhone',
        'App.view.master.supplier.winPhone',
        'App.form.combobox.cbBank'

        /*chart*/
        // 'App.view.reports.panel',
        // 'App.view.reports.pie',
        // 'App.view.reports.column',

    ],

    models: [
        'App.model.supplier.mSupplier',
        'App.model.supplier.mSupplierP',
        'App.model.supplier.mAccountBank',
        'App.model.supplier.mContact',

        'App.model.supplier.mOffice',
        'App.model.supplier.mPhone',
        'App.model.supplier.mUser',

        'App.model.Departement',
        'App.model.Jabatan',
        'App.model.mUser'
    ],
    stores: [
        'App.store.help.sHelp',
        'App.store.supplier.sSuppliers',
        'App.store.supplier.sAccountbank',
        'App.store.supplier.sContacts',
        'App.store.supplier.sOffices',
        'App.store.supplier.sPhones',

        /*Combox Store*/
        'App.store.combo.cbCountries',
        'App.store.combo.cbProvinces',
        'App.store.combo.cbCities',
        'App.store.combo.cbTypeProduct',
        /*Form Contact*/
        'App.store.combo.cbDepartement',
        'App.store.combo.cbPosition',
        'App.store.combo.cbStatus',
        'App.store.combo.cbTypeProduct',
        'App.store.combo.cbTypeSupBuy',
        'App.store.combo.cbLegalitas',
        'App.store.combo.cbBank',
        'App.store.combo.cbTypeBank'

        // Chart
        // 'App.store.chart.sSales',


    ],

    refs: [
        { ref: 'mainPanel', selector: 'mainpanel'},
        { ref: 'tabSupplier', selector: 'tabSupplier'},
        {ref: 'taboffices', selector: 'tabofficessupplier'},
        /*==========  Information Grid  ==========*/
        {ref: 'grid', selector: 'gridSuppliers'},
        {ref: 'gridSupplier', selector: 'gridSuppliers'},
        {ref: 'gridinformasi', selector: 'infosupplierpanel'},
        {ref: 'gridrek', selector: 'gridrekening'},

        /*==========  Supplier  ==========*/
        /*==========  Form  ==========*/
        { ref: 'formSupplier', selector: 'formSupplier'},
        { ref: 'comboCbCountries', selector: 'formSupplier cbCountries'},
        { ref: 'comboCbProvinces', selector: 'formSupplier cbProvinces'},
        { ref: 'comboCbCities', selector: 'formSupplier cbCities'},
        { ref: 'cbLegalitas', selector: 'formSupplier cbLegalitas'},
        { ref: 'cancelSupplier', selector: 'formSupplier > button#cancel' },
        { ref: 'btnSaveSupplier', selector: 'formSupplier > button#save'},
        /*==========  Grid  ==========*/
        { ref: 'addSupplier', selector: 'gridSuppliers > toolbar > button#add' },
        { ref: 'btnEditSupplier', selector: 'gridSuppliers > toolbar > button#edit' },
        { ref: 'btnRemoveSupplier', selector: 'gridSuppliers > toolbar > button#remove' },
        /*==========  /Supplier  ==========*/

        /*==========  Account Bank  ==========*/
        /*==========  Grid  ==========*/
        {ref: 'gridRekening', selector: 'gridrekening'},
        { ref: 'btnAddAccountBank', selector: 'gridrekening > toolbar #add' },
        { ref: 'btnEditAccountBank', selector: 'gridrekening > toolbar #edit' },
        { ref: 'btnRemoveAccountBank', selector: 'gridrekening > toolbar #remove' },
        /*==========  Form  ==========*/
        {ref: 'formAccountBank', selector: 'formAccountBank'},
        {ref: 'formAccountBankSupId', selector: 'winAccountBank > formAccountBank  hiddenfield[name=dimiliki_id]'},
        {ref: 'formAccountBankSupName', selector: 'winAccountBank > formAccountBank  displayfield[name=supplier_name]'},
        {ref: 'formAccountBankSaveBtn', selector: 'formAccountBank button#save'},
        {ref: 'formAccountBankHelpBtn', selector: 'formAccountBank button#help'},
        {ref: 'formAccountBankCancelBtn', selector: 'formAccountBank button#cancel'},
        /*==========  /Account Bank  ==========*/


        /*==========  Contacts  ==========*/
        /*==========  Form Contact  ==========*/
        {ref: 'formContact', selector: 'formContact'},
        {ref: 'formContactBankSaveBtn', selector: 'formContact button#save'},
        {ref: 'formContactBankHelpBtn', selector: 'formContact button#help'},
        {ref: 'formContactBankCancelBtn', selector: 'formContact button#cancel'},
        {ref: 'formContactFieldSupplierId', selector: 'formContact  hiddenfield[name=parent_id]'},
        {ref: 'formContactFieldSupplierName', selector: 'formContact  displayfield[name=supplier_name]'},
        /*==========  Grid  ==========*/
        {ref: 'gridcontact', selector: 'gridsuppliercontactperson'},
        {ref: 'gridContacts', selector: 'gridsuppliercontactperson'},
        { ref: 'btnAddContact', selector: 'gridsuppliercontactperson > toolbar #add' },
        { ref: 'btnEditContact', selector: 'gridsuppliercontactperson > toolbar #edit' },
        { ref: 'btnRemoveContact', selector: 'gridsuppliercontactperson > toolbar #remove' },
        /*==========  /Contacts  ==========*/

        /*==========  Office  ==========*/
        /*grid*/
        {ref: 'gridOffices', selector: 'tabofficessupplier > gridOfficesSupplier'},
        {ref: 'gridOfficesBtnAdd', selector: 'tabofficessupplier > gridOfficesSupplier > vActionBtn #add'},
        {ref: 'gridOfficesBtnEdit', selector: 'tabofficessupplier > gridOfficesSupplier > vActionBtn #edit'},
        {ref: 'gridOfficesBtnRemove', selector: 'tabofficessupplier > gridOfficesSupplier > vActionBtn #remove'},
        {ref: 'formOffice', selector: 'formOffice'},
        { ref: 'formOfficeCbcon', selector: 'formOffice cbCountries'},
        { ref: 'formOfficeCbprov', selector: 'formOffice cbProvinces'},
        { ref: 'formOfficeCbcity', selector: 'formOffice cbCities'},
        /*Form*/
        /*==========  Phone Office  ==========*/
        /*grid phone office*/
        { ref: 'gridPhones', selector: 'tabofficessupplier > gridPhonesSupplier'},
        { ref: 'gridPhonesBtnAdd', selector: 'tabofficessupplier > gridPhonesSupplier > toolbar #add'},
        { ref: 'gridPhonesBtnEdit', selector: 'tabofficessupplier > gridPhonesSupplier > toolbar #edit'},
        { ref: 'gridPhonesBtnRemove', selector: 'tabofficessupplier > gridPhonesSupplier > toolbar #remove'},
        /*Form phone office*/
        { ref: 'formPhone', selector: 'formPhone'},
        { ref: 'winPhone', selector: 'winPhone'}

        /*==========  /Phone Office  ==========*/
        /*==========  /Office  ==========*/

    ],

    init: function () {
        var me = this;
        me.control({
            'tabSupplier': { render: me.onRender_tabSupplier },
            /*==========  Supplier  ==========*/
            /*==========  Grid  ==========*/
            'gridSuppliers': {itemdblclick: me.onGridDoubleClick, itemclick: me.onSupplierClick, selectionchange: me.onSelectionChangeGridSupplier },
            'gridOfficesSupplier': {/*Office Supplier*/ itemclick: me.onClick_GridOffice },
            'gridSuppliers > toolbar > button#add': {/*Tombol Tambah Supplier */ click: me.onGridSupplier_Add },
            'gridSuppliers > toolbar > button#edit': {/*Tombol Tambah Supplier */ click: me.onGridSupplier_Edit },
            'gridSuppliers > toolbar > button#remove': {/*Tombol Tambah Supplier */ click: me.onGridSupplier_Remove },
            'gridSuppliers > toolbar > button#wizard': {/*Tombol Tambah Supplier */ click: me.onGridSupplier_Wizard },
            /*==========  Form  ==========*/
            'tabSupplier > formSupplier': {render: me.onRenderFormSupplier},
            'tabSupplier > formSupplier > toolbar button#save': {click: me.onBtnsaveSupplierClick },
            // 'tabSupplier > formSupplier > toolbar button#save'  : {click : me.onBtnsaveSupplierClick },
            'tabSupplier > formSupplier > toolbar button#cancel': {click: me.onBtnCancelSupplierClick },
            'tabSupplier > formSupplier > toolbar button#help': {click: me.onBtnHelpSupplierClick },

            'formSupplier cbCountries': {change: me.onComboCountriesChange, select: me.onComboCountriesSelect },
            'formSupplier cbProvinces': {
                change: me.onComboProvinceChange,
                select: me.onComboProvinceSelect
            },
            /*==========  /Supplier  ==========*/

            /*==========  Account Bank  ==========*/
            'gridrekening': {selectionchange: me.onSelectionChangeGridRekening },
            'gridrekening > toolbar #add': {click: me.onButton_Add_AccountClick },
            'gridrekening > toolbar #edit': {click: me.onButton_Edit_AccountClick },
            'gridrekening > toolbar #remove': {click: me.onButton_remove_AccountClick },
            'formAccountBank': { render: me.onRender_FormAccountBank},
            'winAccountBank > formAccountBank button#save': { click: me.onButton_Save_FormAccountBankClick},

            'winAccountBank > formAccountBank button#cancel': { click: me.onButton_Cancel_FormAccountBankClick},
            'formAccountBank button#help': { click: me.onButton_Help_FormAccountBankClick},
            /*==========  /Account Bank  ==========*/

            /*==========  Contact  ==========*/
            'gridsuppliercontactperson': {/*Contact Person*/
                selectionchange: me.selectionchangeOnGridContact,
                itemdblclick: me.on_BtnEdit_FormContact  },
            // 'gridsuppliercontactperson > toolbar #remove' : { click : me.onAddContactBtnClick },
            'gridsuppliercontactperson > toolbar #add': { click: me.onAddContact_addBtn_click},
            'gridsuppliercontactperson > toolbar #remove': { click: me.onClick_Contact_btnRemove},
            'gridsuppliercontactperson > toolbar #edit': { click: me.on_BtnEdit_FormContact },
            'tabSupplier > formContact': { render: me.on_FormContactRender },
            'tabSupplier > formContact button#save': { click: me.on_BtnSave_FormContact },
            'tabSupplier > formContact button#cancel': { click: me.on_BtnCancel_FormContact },
            'formContact button#help': { click: me.on_BtnHelp_FormContact },

            /*==========  Office  ==========*/
            /*grid*/
            'gridOfficesSupplier': {
                render: me.render_grid_Supplier_offices,
                selectionchange: me.on_grid_office_supplier_change
            },
            'tabofficessupplier > gridOfficesSupplier > vActionBtn #add': {click: me.btn_add_Office_Supplier },
            'tabofficessupplier > gridOfficesSupplier > vActionBtn #edit': {click: me.btn_edit_Office_Supplier },
            'tabofficessupplier > gridOfficesSupplier > vActionBtn #remove': {click: me.btn_remove_Office_Supplier },
            /*Form*/
            'formOffice button#save': { click: me.btn_save_form_office },
            'formOffice button#edit': { click: me.btn_edit_form_office },
            'formOffice button#help': { click: me.btn_help_form_office },
            'formOffice cbCountries': {/*change : me.onComboCountriesChange,*/ select: me.onformOffice_ComboCountriesSelect },
            'formOffice cbProvinces': {/*change : me.onComboProvinceChange,*/ select: me.onformOffice_ComboProvinceSelect },

            /*==========  Phone Office  ==========*/
            /*grid phone office*/
            'gridPhonesSupplier': {
                render: me.render_grid_Supplier_office_phone,
                selectionchange: me.on_grid_phone_supplier_change },
            'gridPhonesSupplier > toolbar #add': { click: me.on_grid_phone_btn_add },
            'gridPhonesSupplier > toolbar #edit': { click: me.on_grid_phone_btn_edit },
            'gridPhonesSupplier > toolbar #remove': { click: me.on_grid_phone_btn_remove },
            /*Form phone office*/
            'formPhone': { render: me.on_formPhone_Render },
            'winPhone > formPhone button#save': { click: me.on_formPhone_btn_save },
            'winPhone > formPhone button#cancel': { click: me.on_winPhone_formPhone_btnCancel },
            'winPhone > formPhone button#help': { click: me.on_winPhone_formPhone_btnHelp }
            /*==========  /Phone Office  ==========*/
            /*==========  /Office  ==========*/

            /*Chart Test Function*/
            // 'reportsales menu#changeType menuitem' : { click:  me.onChangeTypeChart },
            // 'reportsales menu#download menuitem' : { click:  me.onDownloChartAs },


            /*End Control*/
        });


    },


    onButtonTest: function (btn) {
        log(btn.text + 'Clicked');

    },


    onChangeTypeChart: function (item, e, opt) {
        var panel = item.up('reportsales');
        if (item.itemId == 'pie') {
            panel.getLayout().setActiveItem(0);
        }
        if (item.itemId == 'column') {
            panel.getLayout().setActiveItem(1);
        }
    },
    onDownloChartAs: function (item, e, opt) {
        var chartPanel = item.up('reportsales');
        var chart = chartPanel.getLayout().getActiveItem();
        if (item.itemId == 'png') {
            Ext.MessageBox.confirm('Confirm Download', 'Apakah Anda Ingin Download sebagai Image', function (choice) {
                if (choice == 'yes') {
                    chart.save({ type: 'image/png' })
                }
                ;
            });
        }
        if (item.itemId == 'svg') {
            Ext.MessageBox.confirm('Confirm Download', 'Apakah Anda Ingin Download sebagai SVG', function (choice) {
                if (choice == 'yes') {
                    chart.save({ type: 'image/svg+xml' })
                }
                ;
            });
        }

        if (item.itemId == 'pdf') {
            msgError('Belum Implementasi, Next Feature ')
        }
        ;


    },
    onRender_tabSupplier: function () {
        /*disable semua grid*/
        //

    },
    /**
     *
     * Section Office Phones Supplier
     *
     **/
    section_Office_Phone_Supplier: function () {
    },
    on_grid_phone_supplier_change: function (grid, selections) {
        var me = this, selected = (selections.length > 0);
        me.getGridPhonesBtnEdit().setDisabled(!selected);
        me.getGridPhonesBtnRemove().setDisabled(!selected);
    },
    on_formPhone_Render: function () {
        log('render on_formPhone_Render');
    },
    on_formPhone_btn_save: function (btn) {
        log('Saving and Submit to server with Values');
        var me = this, form = btn.up('form'), val = form.getValues();
        log(val);
        if (!form.isValid()) {
            msgError('Form Invalid');
            return false;
        }
        /*cek id */
        var method, url = getApiUrl() + '/supplier_phones';
        if (val.id.length > 0) {
            method = 'PUT';
            url = url + '/' + val.id;
        } else {
            method = 'POST';
            url = url;
        }
        ;
        form.submit({
            waitMsg: 'Please Wait....',
            url: url, method: method,
            params: { _token: gettoken(), uid: getIdLogin() },
            success: function (con, res, e) {
                log('Success');
                btn.up('window').close();
                me.getGridPhones().getStore().load({ params: { parent_id: val.parent_id }});
            },
            failure: function (con, res, e) {
                log('Error....');
            }
        });


    },
    render_grid_Supplier_office_phone: function (grid) {
        log('Render Grid Supplier Offices Phones');
        grid.setDisabled(true);
    },
    on_grid_phone_btn_add: function (btn) {
        log('Proses Add Phone Offices Supplier');
        var me = this, gridoffice = me.getGridOffices(),
            selectedSupplier = me.getGridSupplier().getSelectionModel().getSelection()[0];
        if (!selectedSupplier) {
            log('Supplier belum dipilih');
            return false;
        }
        var selectedOffice = me.getGridOffices().getSelectionModel().getSelection()[0];
        if (!selectedOffice) {
            log('Office Supplier not yet selected');
            return false;
        }

        log('Show Form Add Phone Supplier');
        var win = me.getWinPhone();
        if (!win) {
            win = Ext.create('App.view.master.supplier.winPhone', { title: 'Add Phone Office [' + selectedOffice.get('id') + ' ] '});
            // Ext.ComponentQuery.query('winAccountBank formAccountBank')[0].loadRecord(record);
            win.show();
            me.getFormPhone().down('[name=supplier_name]').setValue(selectedSupplier.get('name'));
            me.getFormPhone().down('[name=parent_id]').setValue(selectedOffice.get('id'));
        }


    },

    on_grid_phone_btn_edit: function (btn) {
        log('Proses Edit Phone Offices Supplier');
        var me = this, form;
        var record = me.getGridPhones().getSelectionModel().getSelection()[0];
        if (!record) return false;

        var me = this, gridoffice = me.getGridOffices(),
            selectedSupplier = me.getGridSupplier().getSelectionModel().getSelection()[0];
        if (!selectedSupplier) {
            log('Supplier belum dipilih');
            return false;
        }
        var selectedOffice = me.getGridOffices().getSelectionModel().getSelection()[0];
        if (!selectedOffice) {
            log('Office Supplier not yet selected');
            return false;
        }

        log('Show Form Add Phone Supplier');

        var win = me.getWinPhone();
        if (!win) {
            win = Ext.create('App.view.master.supplier.winPhone', { title: 'Edit Phone Office [' + selectedOffice.get('id') + ' ] '});
            win.show();
            me.getFormPhone().down('[name=supplier_name]').setValue(selectedSupplier.get('name'));
            me.getFormPhone().down('[name=parent_id]').setValue(selectedOffice.get('id'));
            me.getFormPhone().loadRecord(record);
        }
        log('Load Form to Window  and Showing ');

    },

    on_grid_phone_btn_remove: function (btn) {
        log('Proses Remove Phone Offices Supplier');
        var me = this, record = me.getGridPhones().getSelectionModel().getSelection()[0];
        if (record === undefined) {
            log(' Phone Office Supplier Not Selected');
            msgError('Please Select Phone Office Supplier First for deleting');
            return false;
        }

        log('remove from store Phone Office');
        var storeSupplier = me.getGridPhones().getStore();
        storeSupplier.remove(record);
        storeSupplier.sync();
        storeSupplier.load();
    },
    on_winPhone_formPhone_btnCancel: function (btn) {
        btn.up('window').close();
    },
    on_winPhone_formPhone_btnHelp: function (btn) {
        winHelp('form_Supplier_Office_add_Phone');
    },

    /**
     *
     * Section Office Supplier
     *
     **/
    section_Office_Supplier: function () {
    },
    onformOffice_ComboCountriesSelect: function (combo, value) {
        log('Form Office CB Country Select ');
        var me = this, province = me.getFormOfficeCbprov(), city = me.getFormOfficeCbcity();
        log('Select cbCountries Fire!!!');
        province.clearValue('');
        province.getStore().removeAll();
        province.getStore().load({params: {parent_id: combo.getValue()} });
        province.setDisabled(false);
        city.setDisabled(true);
    },

    onformOffice_ComboProvinceSelect: function (combo, value) {
        log('Province Change');
        var me = this, city = me.getFormOfficeCbcity();
        city.clearValue('');
        city.getStore().removeAll();
        city.getStore().load({params: {parent_id: combo.getValue()} });
        city.setDisabled(false);
    },

    btn_save_form_office: function (btn) {
        // btn_save_form_office
        log('Show value Add Office');
        var me = this, form = btn.up('form'), val = form.getValues(), rec = form.getRecord();
        var method, url = getApiUrl() + '/supplier_offices';
        if (form.isValid()) {
            if (val.id.length > 0) {
                method = 'PUT';
                url = url + '/' + rec.get('id');
            } else {
                method = 'POST';
                url = url
            }
            ;
            form.submit({
                waitMsg: 'Please Wait....',
                url: url, method: method,
                params: { _token: gettoken(), uid: getIdLogin() },
                success: function (con, res, e) {
                    log('Success');
                    form.close();
                    me.getGridOffices().getStore().load();
                },
                failure: function (con, res, e) {
                    log('Error....');
                }
            });
        } else {
            msgError('Form Invalid');
        }


    },
    btn_edit_form_office: function (btn) {
        // btn_save_form_office
        log('Show Form for Editing');
    },

    btn_help_form_office: function (btn) {
        log('Show Window Help with Code');
        winHelp('formOffice');
    },
    render_grid_Supplier_offices: function () {
        log('Render Grid Supplier Offices');
        var me = this;
        me.getAppStoreComboCbCountriesStore().load();
        me.getAppStoreComboCbProvincesStore().load();
        me.getAppStoreComboCbCitiesStore().load();
    },
    on_grid_office_supplier_change: function (grid, selections) {
        var me = this, selected = (selections.length > 0);
        me.getGridOfficesBtnEdit().setDisabled(!selected);
        me.getGridOfficesBtnRemove().setDisabled(!selected);
        if (!selected) {
            log('Tidak ada Record Office Supplier yang dipilih');
            me.getGridPhones().setDisabled(true);
            return false;
        }
        me.getGridPhones().setDisabled(false);
        var record = selections[0],
            storeOfficePhones = me.getAppStoreSupplierSPhonesStore();
        storeOfficePhones.load({params: {parent_id: record.get('id') } });
    },
    btn_add_Office_Supplier: function (btn) {
        log('Process Form Add Office Supplier');
        // 'formOffice';
        var me = this, record = me.getSelectionGridSupplier();
        if (!record) {
            log('Supplier belum dipilih');
            return false;
        }

        me.open_new_tab('Add Office', 'formOffice');
        var form = me.getFormOffice();
        form.down('[name=parent_id]').setValue(record.get('id'));
        form.down('[name=supplier_name]').setValue(record.get('name'));

        // set value form parent_id = supplier.id
    },
    btn_edit_Office_Supplier: function (btn) {
        log('Process Form Edit Office Supplier');
        var me = this, form;
        var record = me.getGridOffices().getSelectionModel().getSelection()[0];
        if (!record) return false;
        me.open_new_tab('Edit Office with Id [' + record.get('id') + ' ] ', 'formOffice');
        me.getFormOffice().loadRecord(record);
        log('Load Form to New Tab and Active');
    },

    btn_remove_Office_Supplier: function (btn) {
        log('Process Form Delete Office Supplier');
        log('Show Quetion Box');
        var me = this, record = me.getGridOffices().getSelectionModel().getSelection()[0];
        if (record === undefined) {
            log(' Supplier Office Not Selected');
            msgError('Please Select Office Supplier First for deleting');
            return false;
        }

        log('remove from store');
        var storeSupplier = me.getGridOffices().getStore();
        storeSupplier.remove(record);
        storeSupplier.sync();
        storeSupplier.load();
    },


    /**
     *
     * Form Supplier
     *
     **/
    section_Supplier: function () {
    },
    onSelectionChangeGridSupplier: function (grid, selections) {
        var me = this, selected = (selections.length > 0);

        log(selected);
        if (!selected) return false;

        /*enable semua grid*/
        log('Enable All Grid');
        me.getGridRekening().setDisabled(!selected);
        me.getGridContacts().setDisabled(!selected);
        me.getGridOffices().setDisabled(!selected);
        me.getTaboffices().setDisabled(!selected);
        log('Change selections');

        var record = selections[0];
        if (!record) return false;

        var supplier_id = record.get('id');

        /*change proxy and reload*/
        /*rekening bank*/
        var storeRekening = me.getGridRekening().getStore(),
            storeContacts = me.getGridContacts().getStore(),
            storeOffices = me.getAppStoreSupplierSOfficesStore(),
            storePhones = me.getAppStoreSupplierSPhonesStore();
        me.changeProxyParams(storeRekening, 'supplier_id', supplier_id);
        me.changeProxyParams(storeContacts, 'supplier_id', supplier_id);
        me.changeProxyParams(storeOffices, 'supplier_id', supplier_id);
        // me.changeProxyParams(storePhones,'supplier_id',supplier_id);
        storeRekening.load();
        storeContacts.load();
        storeOffices.load();
        // storePhones.load();

        // Enable Button Edit dan delete
        me.getBtnEditSupplier().setDisabled(!selected);
        me.getBtnRemoveSupplier().setDisabled(!selected);
    },


    onGridSupplier_Remove: function (btn) {
        var me = this, record = me.getGridSupplier().getSelectionModel().getSelection()[0];
        if (record === undefined) {
            log(' Supplier Not Selected');
            msgError('Please Select Supplier First');
            return false;
        }

        log('remove from store');
        var storeSupplier = me.getGridSupplier().getStore();
        storeSupplier.remove(record);
        storeSupplier.sync();
        storeSupplier.load();
    },
    onGridSupplier_Wizard: function (btn) {
        this.open_new_tab('[Wizard] New Supplier', 'wizardSupplier');
        // var supplier = new App.model.supplier.wizard.Supplier
    },

    onBtnsaveSupplierClick: function (btn) {
        var form = btn.up('form'), me = this,
            val = form.getValues();
        if (!form.isValid()) {
            msgError('Please Input Form Correctly');
            return;
        }
        ;
        if (val.province_id.length == 0) {
            msgError('Please Select Province');
            return;
        }
        if (val.city_id.length == 0) {
            msgError('Please Select City');
            return;
        }

        log('Prosess Sent to Server ');
        cDir(val);
        var method, url, msg;
        if (val.id.length > 0) {
            method = 'PUT';
            url = getApiUrl() + '/supplier/' + val.id;
            msg = 'Updated ';
        } else {
            method = 'POST';
            url = getApiUrl() + '/supplier';
            msg = 'Added ';
        }
        ;

        form.submit({
            // url: api_url + '/supplier',
            url: url,
            waitMsg: 'Please Wait...Sending to Server.',
            params: { cmd: 'saveform', _token: gettoken(), uid: getIdLogin(), _method: method },
            method: method,
            success: function (conn, response, options, eOpts) {
                var result = response.result;
                if (!result) {
                    result = {};
                    result.success = false;
                    result.msg = conn.responseText;
                }

                if (result.success) {
                    if (me.getGrid() !== undefined) me.getGrid().getStore().load();
                    Ext.Msg.show({msg: msg + 'Supplier Successfully', title: 'Success', icon: Ext.Msg.OK, buttons: Ext.Msg.OK });
                    /*Remove Form From TabPanel*/
                    // me.getMainPanel().remove( me.getFormSupplier() );
                    form.close();
                    log('Closing Form and Save.....');

                } else {
                    Ext.Msg.show({
                        title: 'Fail ' + msg + ' Please try again!',
                        msg: result.msg,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
                /*End success function*/
            },
            failure: function (conn, response, options, eOpts) {
                var respon = conn.responseText;
                msgfail = respon;
                Ext.Msg.show({
                    title: 'Error!',
                    msg: isDebug() ? msgfail : 'Have Error !',
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK });
            }
        });
    },
    onBtnHelpSupplierClick: function (btn) {
        winHelp('FormAddSupplier');
    },
    onBtnCancelSupplierClick: function (btn) {    /*this.getTabSupplier().remove( this.getFormSupplier() );*/
        btn.up('form').close();
    },
    onComboProvinceSelect: function (combo, value) {
        log('Select Province Fire!!!');
        var me = this, city = me.getComboCbCities(), storeC = city.getStore();
        city.setDisabled(true);
        city.clearValue('');
        storeC.clearFilter();
        storeC.removeAll();
        storeC.load({params: { parent_id: combo.getValue() } });
        city.setDisabled(false);
    },
    onComboProvinceChange: function (old, newVal) {
        log('Province Change fire!!!');
    },
    /*==========  Combo Box Countries Change  ==========*/
    onComboCountriesSelect: function (combo, value) {
        var me = this, province = me.getComboCbProvinces();
        log('Select cbCountries Fire!!!');
        cDir(combo);
        cDir(value);
        var province = me.getComboCbProvinces(), storeP = province.getStore();
        var city = me.getComboCbCities(), storeC = city.getStore();
        // province.setDisabled(true);
        province.clearValue('');
        province.getStore().removeAll();
        province.getStore().load({params: {parent_id: combo.getValue()} });
        province.setDisabled(false);
        city.setDisabled(true);
    },

    onComboCountriesChange: function (old, newVal) {
        log('Change cbCountries New value' + newVal);
    },

    /*==========  Render Form Supplier  ==========*/
    onRenderFormSupplier: function () {
        log('Form Supplier Render Fire!!!');
        var me = this;
        log('Loaded All Combo Store');
        me.getAppStoreComboCbCountriesStore().load();
        me.getAppStoreComboCbProvincesStore().load();
        me.getAppStoreComboCbCitiesStore().load();

        me.getAppStoreComboCbStatusStore().load();
        me.getAppStoreComboCbTypeProductStore().load();
        me.getAppStoreComboCbLegalitasStore().load();
        me.getAppStoreComboCbTypeSupBuyStore().load();


    },
    onGridSupplier_Edit: function (btn) {
        var me = this, record = me.getSelection_On_Grid(me.getGridSupplier());
        if (!record) {
            log('Cannot found record');
            return false;
        }
        cDir(record);
        me.open_new_tab('Edit ' + record.get('name'), 'formSupplier');
        me.getFormSupplier().loadRecord(record);
    },


    getSelection_On_Grid: function (grid) {
        return grid.getSelectionModel().getSelection()[0];
    },
    getSelectionGridSupplier: function () {
        return this.getGridSupplier().getSelectionModel().getSelection()[0];
    },
    /**
     *
     * Section Contact
     *
     **/
    section_Contact: function () {
    },
    on_BtnEdit_FormContact: function (btn) {
        log('Edit Button fire!!!');
        var me = this, form;
        var record = me.getGridContacts().getSelectionModel().getSelection()[0];

        if (!record) return false;

        me.open_new_tab('Edit [' + record.get('name') + ' ] ', 'formContact');
        me.getFormContact().loadRecord(record);
        log('Load Form to New Tab and Active');
    },
    selectionchangeOnGridContact: function (grid, selections) {
        var me = this, selected = (selections.length > 0);
        me.getBtnRemoveContact().setDisabled(!selected);
        me.getBtnEditContact().setDisabled(!selected);
        if (!selected) return false;
    },

    onClick_Contact_btnRemove: function (btn) {
        var me = this, record = me.getSelection_On_Grid(me.getGridContacts());
        // record = me.getGridContacts().getSelectionModel().getSelection()[0] ;
        if (record === undefined) {
            log(' Contact Person Tidak dipilih');
            return false;
        }
        var storeContacts = me.getGridContacts().getStore();
        /*remove from store*/
        storeContacts.remove(record);
        storeContacts.sync();
    },
    onAddContact_addBtn_click: function (btn) {
        var me = this, record = me.getSelectionGridSupplier();

        log('Load Departement Store');
        if (record === undefined) {
            log('Supplier tidak ada yg dipilih');
            return false;
        }
        /*==========  Jika Ada Supplier Yang dipilih  ==========*/
        var idSup = record.get('id'), nameSupplier = record.get('name');
        // Buat Tab Baru
        me.open_new_tab('Add Contact [ ' + idSup + ']', 'formContact');
        // set value untuk parent_id dengan id Supplier_id
        // parent_id
        me.getFormContactFieldSupplierId().setValue(idSup);
        me.getFormContactFieldSupplierName().setValue(nameSupplier);
    },

    on_FormContactRender: function () {
        log('Render Form Contact untuk Load Store');
        var me = this;
        me.getAppStoreComboCbDepartementStore().load();
        me.getAppStoreComboCbPositionStore().load();

    },
    on_BtnSave_FormContact: function (btn) {
        /*Save Contact*/
        var me = this, form = btn.up('form'), val = form.getValues();
        log('Form Akan Kirim dengan values ');
        cDir(val);
        var method , url = getApiUrl() + '/supplier_contact_person';

        if (val.id.length > 0) {
            method = 'PUT';
            url = url + '/' + val.id;
        } else {
            method = 'POST', url = url;
        }
        ;

        form.submit({
            url: url,
            waitMsg: 'Please Wait...Sending to Server.',
            params: { uid: getIdLogin(), _token: gettoken() },
            method: method,
            success: function (conn, response, options, eOpts) {
                var result = response.result;
                if (!result) {
                    result = {};
                    result.success = false;
                    result.msg = conn.responseText;
                }

                if (result.success) {
                    if (me.getGridContacts() !== undefined) me.getGridContacts().getStore().load();
                    Ext.Msg.show({msg: result.msg, title: 'Success', icon: Ext.Msg.INFO, buttons: Ext.Msg.OK });
                    /*Hide Form */
                    btn.up('form').close();
                } else {
                    Ext.Msg.show({
                        title: 'Fail Submit Please try again!',
                        msg: result.msg,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
                /*End success function*/
            },
            failure: function (conn, response, options, eOpts) {
                var respon = conn.responseText;
                var json = App.util.Util.decodeJSON(response.response.responseText);
                msg = json.error.message;
                Ext.Msg.show({
                    title: 'Error!',
                    msg: isDebug() ? msg : 'Have Error !',
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK });
            }
        });
    },
    on_BtnHelp_FormContact: function (btn) {
        winHelp('AddContact')
    },
    on_BtnCancel_FormContact: function (btn) {
        btn.up('form').close();
        /*button cancel at form contact*/
    },

    /**
     *
     * Section Account Bank
     *
     **/
    section_AccountBank: function () {
    },
    onRender_FormAccountBank: function () {
        // 'App.form.combobox.cbBank';
        var me = this;
        me.getAppStoreComboCbBankStore().load();
        me.getAppStoreComboCbTypeBankStore().load();
    },

    onSelectionChangeGridRekening: function (grid, selections) {
        var me = this, selected = (selections.length > 0);
        me.getBtnEditAccountBank().setDisabled(!selected);
        me.getBtnRemoveAccountBank().setDisabled(!selected);
        if (!selected) {
            log('Tidak ada Record Account Bank Supplier yang dipilih');
            return false;
        }
    },
    /*==========  Form Account Bank  ==========*/
    onButton_Cancel_FormAccountBankClick: function (btn) {
        log('Close Window Help');
        log(btn.text);
        var win = btn.up('window').close();
    },
    onButton_Help_FormAccountBankClick: function (btn) {
        log('Showing Window Help');
        winHelp('formAccountBank');
    },

    onButton_Save_FormAccountBankClick: function (btn) {
        log('Save Form dengan Values ');
        var form = btn.up('form'), val = form.getValues(), me = this, supplier_id = val.dimiliki_id;
        var url = getApiUrl() + '/supplier_account_bank';
        if (!form.isValid()) {
            msgError('Please Correctly ');
            return false;
        }

        if (val.id.length > 0) {
            method = 'PUT';
            url = url + '/' + val.id;
            msg = 'Updated ';
        } else {
            method = 'POST';
            url = url;
            msg = 'Added ';
        }
        ;
        form.submit({
            url: url,
            waitMsg: 'Please Wait...Sending to Server.',
            params: { cmd: 'saveform', _token: gettoken(), uid: getIdLogin() },
            method: method,
            success: function (conn, response, options, eOpts) {
                var result = response.result;
                if (!result) {
                    result = {};
                    result.success = false;
                    result.msg = conn.responseText;
                }

                if (result.success) {
                    if (me.getGridRekening() !== undefined) {

                        var store = me.getGridRekening().getStore();
                        store.clearFilter();
                        store.getProxy().setExtraParam('supplier_id', supplier_id);
                        store.load();
                    }
                    ;
                    Ext.Msg.show({
                        title: 'Added Account Bank Successfully',
                        msg: result.msg,
                        icon: Ext.MessageBox.QUESTION,
                        buttons: Ext.Msg.OK
                    });
                    btn.up('window').close();
                } else {
                    Ext.Msg.show({
                        title: 'Fail Submit Please try again!',
                        msg: result.msg,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
                /*End success function*/
            },
            failure: function (conn, response, options, eOpts) {
                var respon = conn.responseText;
                msg = respon;
                Ext.Msg.show({
                    title: 'Error!',
                    msg: isDebug() ? msg : 'Have Error !',
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK });
            }
        });
        // cDir(val);
    },

    onButton_remove_AccountClick: function (btn) {
        /*==========  Saat Tombol Remove Account Bank di Click  ==========*/
        var me = this, record = me.getGridRekening().getSelectionModel().getSelection()[0];
        if (record === undefined) {
            log(' Account Bank Not Selected');
            msgError('Please Select Account Bank for Delete');
            return false;
        }

        // remove from store
        var storeRekening = me.getGridRekening().getStore();
        storeRekening.remove(record);
        storeRekening.sync();
    },
    onButton_Edit_AccountClick: function (btn) {
        log('Edit Account Bank Supplier');
        var me = this;
        var record = me.getGridRekening().getSelectionModel().getSelection()[0];
        win = Ext.create('App.view.master.supplier.winAccountBank', { title: 'Add Rekening [' + record.get('name') + ' ] '});
        Ext.ComponentQuery.query('winAccountBank formAccountBank')[0].loadRecord(record);
        win.show();
    },
    onButton_Add_AccountClick: function (btn) {
        /*==========  Saat Tombol Add Account Bank di Click  ==========*/
        var me = this;
        var record = me.getGridSupplier().getSelectionModel().getSelection()[0];
        if (record === undefined) {
            log('tidak ada yg dipilih');
            return false;
        }

        /*==========  Jika Ada Supplier Yang dipilih  ==========*/
        var nameSupplier = record.get('name');
        me.showWindowAddRekening(record);
    },
    showWindowAddRekening: function (record) {
        log('Tampilkan Window Tambah Supplier ');
        var win , name = record.get('name'), me = this;
        if (!win) {
            win = Ext.create('App.view.master.supplier.winAccountBank', { title: 'Add Rekening [' + name + ' ] '});
            /*set value nama supplier pada form dan id supplier_id*/
            win.show();
            cDir(record);
            me.getFormAccountBankSupId().setValue(record.get('id'));
            me.getFormAccountBankSupName().setValue(record.get('name'));
        }
    },

    open_new_tab: function (titleS, xtypeS) {
        // tabSupplier
        // var mainPanel = this.getMainPanel();
        var mainPanel = this.getTabSupplier();
        var title = titleS || '[Untitled]';
        var xtype = xtypeS || 'panel';
        var newTab = mainPanel.items.findBy(function (tab) {
            return tab.title === title
        });
        this.newtab++;
        if (!newTab) {
            newTab = mainPanel.add({
                xtype: xtype,
                closable: true,
                iconCls: 'home',
                title: title
            });
        }

        mainPanel.setActiveTab(newTab);
    },
    onGridSupplier_Add: function (btn) {
        var cntTab = this.cntTab++;
        this.open_new_tab('[' + cntTab + ' : New Supplier ]', 'formSupplier');
        // var mainPanel = this.getMainPanel();
        // var mainPanel = this.getTabSupplier();
        // var title = '[ Add Master Supplier ]';
        // var newTab = mainPanel.items.findBy(function (tab){return tab.title === title });

        // if (!newTab){
        //     newTab = mainPanel.add({
        //         xtype: 'formSupplier',
        //         closable: true,
        //         iconCls: 'home',
        //         title: title
        //     });
        // }
        // // App.store.combo.cbCountries
        // mainPanel.setActiveTab(newTab);

    },
    /*==========  Function  ==========*/
    onGridDoubleClick: function (grid, record) {
        var me = this;
        me.open_new_tab('Edit Supplier ' + record.get('id'), 'formSupplier');
        me.getFormSupplier().loadRecord(record);
    },
    onSupplierClick: function (grid, record) {
        var me = this;
        if (record) {
            var supplierId = record.get('id'),
                supplierInfo = this.getGridinformasi();
            /*==========  Update Info Supplier  ==========*/
            supplierInfo.update(record.data);
            // supplierInfo.supplier = record;
            /*==========  Store Proses  ==========*/
            // me.changeProxyParams(me.getGridrek().getStore(),'supId',supplierId,'PgRekeningSupplier');
            // me.changeProxyParams(me.getGridcontact().getStore(),'supId',supplierId,'PgContactsSupplier');
            // me.changeProxyParams(me.getGridrek().getStore(),'supId',supplierId,'PgContactsSupplier');
            // me.changeProxyParams(me.getGridoffices().getStore(),'supId',supplierId,'PgOfficesSupplier');
            /*==========  /End Store  ==========*/
        }
    },


    /**
     *
     * Change Parameter Proxy
     * @params store string Komponen Store
     * key string parameter key yang akan dikirimkan ke server
     * value string paramter key yang akan dikirimkan ke server
     * pgtoolname string Nama Paging tool yang akan direfresh.
     *
     **/

    changeProxyParams: function (store, key, value, pgtoolname) {
        // this.tunggu();

        store.clearFilter();
        store.getProxy().setExtraParam(key, value);
        if (pgtoolname) Ext.getCmp(pgtoolname).moveFirst();
    },
    /**
     *
     * Menonaktifkan Grid Rekening , Telp , Contact dan Offices
     *
     **/



    grid_Disabled: function (grid) {
        grid.setDisabled(true);
    },
    grid_Enabled: function (grid) {
        grid.setDisabled(false);
    },

    onClick_GridOffice: function (grid, record) {
        var me = this, sOffices = me.getGridphones().getStore(), sOfficePhones = record.get('id');
        me.changeProxyParams(sOffices, 'officeId', sOfficePhones, 'PgPhonesSupplier');
    },
    tunggu: function () {
        tunggu();
    },

    tambah_telp: function () {
        //tambah telp supplier
    },
    tambah_office: function () {
        // menampilkan form untuk tambah office, lampirkan id supplier (hidden)
    },
    tambah_rekening_bank: function () {
        // menampilkan form terdiri combobox bank
    },
    tambah_contact_person: function () {
        // menampilkan form untuk tambah form contact person
    },
    window_supplier_Show_InfoDetail: function () {
        //menampilakan info supplier saat di double click pada grid supplier
    },
    window_supplier_edit: function () {
        //menampilkan form untuk edit supplier
    },
    window_account_show: function () {
        //menampilkan window rekening bank
    },

// end define
});
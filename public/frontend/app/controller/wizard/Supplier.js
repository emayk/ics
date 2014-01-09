/**
*
* Controller
*
* Programmer By Emay Komarudin (2013)
*    ExtJs Controller
**/
Ext.define('App.controller.wizard.Supplier', {
    extend: 'Ext.app.Controller',
    models: [
        'App.model.supplier.wizard.Supplier',
        'App.model.supplier.wizard.AccountBank',
        'App.model.supplier.wizard.Bank',
        'App.model.supplier.wizard.Contact',
        'App.model.supplier.wizard.Office',
        'App.model.supplier.wizard.Country',
        'App.model.supplier.wizard.User',
        'App.model.supplier.wizard.Phones'

    ],
    stores: [
        'App.store.supplier.wizard.AccountBank',
        'App.store.supplier.wizard.ContactPerson',
        'App.store.supplier.wizard.Office',
        'App.store.supplier.wizard.Phones',
    ],
    views: [
        'App.view.master.supplier.wizard',
        'App.view.master.supplier.wizardpage.wizFormSupplier',
        'App.view.master.supplier.wizardpage.pageAccount',
        'App.view.master.supplier.wizardpage.pageContactPerson',
        'App.view.master.supplier.wizardpage.pageOffice',
    ],
    refs: [
        /*{ref: 'ini', selector: 'danitu'}*/
        { ref: 'wizardSupplier', selector : 'wizardSupplier' },
        { ref: 'wizardFormAccountBank', selector : 'wizardSupplier formAccountBank' },
        { ref: 'wizardGridAccountBank', selector : 'wizardSupplier > wizardPageAccountSupplier > container > grid' },
        /*Working On*/
        { ref: 'wizardCp', selector : 'wizardSupplier > wizardPageCountactPersonSupplier' },
        { ref: 'wizardCpForm', selector : 'wizardSupplier > wizardPageCountactPersonSupplier formContact' },
        { ref: 'wizardCpFormSupname', selector : 'wizardSupplier > wizardPageCountactPersonSupplier formContact displayfield[name=supplier_name]' },
        { ref: 'wizardCpFormSupId', selector : 'wizardSupplier > wizardPageCountactPersonSupplier formContact displayfield[name=parent_id]' },
        { ref: 'gridCp', selector: 'wizardSupplier > wizardPageCountactPersonSupplier grid'},
        { ref: 'supplierId', selector: 'wizardSupplier > wizardPageCountactPersonSupplier > formContact hiddenfield[name=parent_id]' },
        { ref: 'supplierName', selector: 'wizardSupplier formAccountBank [name=supplier_name]' },
        { ref: 'accountBankName', selector: 'wizardSupplier formAccountBank [name=name]' },
        { ref: 'accountBankNumber', selector: 'wizardSupplier formAccountBank [name=norek]' },
        { ref: 'accountBankType', selector: 'wizardSupplier formAccountBank [name=type_id]' },
        { ref: 'accountBankId', selector: 'wizardSupplier formAccountBank [name=bank_id]' },


        { ref: 'cpName', selector : 'wizardSupplier > wizardPageCountactPersonSupplier > formContact [name=name]' },
        { ref: 'cpDept', selector : 'wizardSupplier > wizardPageCountactPersonSupplier > formContact [name=departement_id]' },
        { ref: 'cpPos', selector : 'wizardSupplier > wizardPageCountactPersonSupplier > formContact [name=jabatan_id]' },
        { ref: 'cpNohp', selector : 'wizardSupplier > wizardPageCountactPersonSupplier > formContact [name=nohp]' },
        { ref: 'cpEmail', selector : 'wizardSupplier > wizardPageCountactPersonSupplier > formContact [name=email]' },
        { ref: 'cpFax', selector : 'wizardSupplier > wizardPageCountactPersonSupplier > formContact [name=fax]' },

        { ref: 'btnSaveContact', selector : 'wizardSupplier > wizardPageCountactPersonSupplier > formContact button#save' },
        { ref: 'btnCancelContact', selector : 'wizardSupplier > wizardPageCountactPersonSupplier > formContact button#cancel' },
        { ref: 'btnCancelAccount', selector :'wizardSupplier formAccountBank button#cancel'},
        { ref: 'btnSaveAccount', selector :'wizardSupplier formAccountBank button#save'},

        /*Office Supplier*/

        { ref: 'wizSo', selector :'wizardSupplier > wizardSupplierOffice'},
        { ref: 'wizSogrid', selector :'wizardSupplier > wizardSupplierOffice grid#office'},
        { ref: 'wizSoForm', selector :'wizardSupplier > wizardSupplierOffice > formOffice'},
        { ref: 'wizSoFormSupName', selector :'wizardSupplier > wizardSupplierOffice > formOffice [name=supplier_name]'},
        { ref: 'wizSoFormSupId', selector :'wizardSupplier > wizardSupplierOffice > formOffice [name=parent_id]'},
        { ref: 'wizSoBtnSave', selector :'wizardSupplier > wizardSupplierOffice > formOffice button#save'},
        { ref: 'wizSoBtnCancel', selector :'wizardSupplier > wizardSupplierOffice > formOffice button#cancel'},

        { ref: 'wizBtnFinish', selector :'wizardSupplier #finish > toolbar #finishBtn'},


    ],
    init: function(application) {
        var me = this;
        me.control({
        /*wizard*/
        'wizardSupplier' : { render : me.onRenderWizardSupplier },
        'wizardSupplier #finish > toolbar #finishBtn' : { click : me.onClickBtnFinish },
        'wizardSupplier #welcome > toolbar #welcomeBtn' : { click : me.onClickBtnWelcome },
        'wizardSupplier formSupplier > toolbar button#save': { click: me.wizardSaveSupplier },
        'wizardSupplier formAccountBank ': { render: me.wizardSupplier_formAccountBank_Render },
        'wizardSupplier formAccountBank button#save' : { click : me.on_wizard_addAccountBankSupplier_Save_Click },
        'wizardSupplier formAccountBank button#cancel' : { click : me.on_wizard_addAccountBankSupplier_Click },

        'wizardSupplier > wizardPageCountactPersonSupplier > formContact' : { render : me.onRender_wizardSupplier_formContact },
        'wizardSupplier > wizardPageCountactPersonSupplier > formContact button#save' : { click : me.on_wizardSupplier_formContact_Save },
        'wizardSupplier > wizardPageCountactPersonSupplier > formContact button#cancel' : { click : me.on_wizardSupplier_formContact_Cancel },

        'wizardSupplier > wizardSupplierOffice > formOffice': { render: me.Render_form_Office},
        'wizardSupplier > wizardSupplierOffice > formOffice button#save': { click: me.Proses_Simpan_Supplier_Office },
        'wizardSupplier > wizardSupplierOffice > formOffice button#cancel': { click: me.Batalkan_Proses_Simpan },

        // Grid Office
        'wizardSupplier > wizardSupplierOffice grid#office button#edit' : { click: me.Batalkan_Proses_Simpan },
        'wizardSupplier > wizardSupplierOffice grid#office button#help' : { click: me.Batalkan_Proses_Simpan },
        'wizardSupplier > wizardSupplierOffice grid#office button#delete' : { click: me.Batalkan_Proses_Simpan },

        // Add phone
        'wizardSupplier > wizardSupplierOffice grid#phones button#add': { click: me.Batalkan_Proses_Simpan },
        'wizardSupplier > wizardSupplierOffice grid#phones button#edit': { click: me.Batalkan_Proses_Simpan },
        'wizardSupplier > wizardSupplierOffice grid#phones button#delete': { click: me.Batalkan_Proses_Simpan },
        'wizardSupplier > wizardSupplierOffice grid#phones button#help': { click: me.Batalkan_Proses_Simpan },

        });

        log('Initialize...');
    },
    onClickBtnWelcome: function(){
         this.getWizardSupplier().getLayout().setActiveItem('page1');
    },
    onClickBtnFinish: function(btn){
        btn.up('wizardSupplier').close();
    },

    Render_form_Office: function(form){
        log('Render Form Office');
        this.getWizSoBtnCancel().setText('Next');
        this.getWizSoBtnCancel().setDisabled(true);
    },

    Proses_Simpan_Supplier_Office: function(btn){
        log('Proses Simpan Supplier Office ');
        // Simulasi Variable.
        var me = this, parent_id_test = 1;
        me.getWizSoFormSupName().setValue('Rambo Gila ' + randomText(10));
        me.getWizSoFormSupId().setValue(1);

        var f = btn.up('form'), val = f.getValues(),
        supid = me.getWizSoFormSupId().getValue(),
        supname = me.getWizSoFormSupName().getValue();
        log(val);
        var office  = Ext.create('App.model.supplier.wizard.Office',val);
        office.save({
            success: function(s){
                log('Success Section ');
                log(s);
                me.getWizSogrid().getStore().getProxy().setExtraParam('parent_id',val.parent_id);
                me.getWizSogrid().getStore().load();
                me.getWizSoBtnCancel().setDisabled(false);
                log('Resetting Form');
                // Konfirmasi Tambah Lagi ?
                Ext.MessageBox.confirm('Confirm', 'Apakah Anda Ingin Menambah Data Kantor Baru ?',function(choice){
                    if (choice == 'yes' ) {
                        f.getForm().reset();
                        me.getWizSoFormSupName().setValue(supname);
                        me.getWizSoFormSupId().setValue(supid);
                        if (isDebug() ) me.generateOffice();
                    }else {
                            log('Set Page to Next Page');
                            me.getWizardSupplier().getLayout().setActiveItem('finish');
                    };
                });
            },
            failure: function(s){
                log('Failure Section');
                log(s);
                msgError('Saving Error !');
            }
        });
        return false;
    },

    Batalkan_Proses_Simpan : function(btn){
        var f = btn.up('form');
        f.getForm().reset();
        log('Next...Page');
        this.getWizardSupplier().getLayout().setActiveItem('finish');
    },

    onRenderWizardSupplier : function(){
        var me = this;  },
    wizardSaveSupplier: function(btn){
        var form = btn.up('form'),me = this,
        val = form.getValues(), rec = form.getRecord();

        me.getBtnCancelContact().setText('Next');
        me.getBtnCancelContact().setIconCls('next');

        if (!form.isValid()) {msgError('Silahkan Lengkapi Form '); return false; }

        var sup = Ext.create('App.model.supplier.wizard.Supplier',val);
        sup.save({
            success: function(sup){
                var id = sup.get('id');
                Ext.ComponentQuery.query('wizardPageAccountSupplier > formAccountBank displayfield[name=supplier_name]')[0].setValue(sup.get('name'));
                Ext.ComponentQuery.query('wizardPageAccountSupplier > formAccountBank hiddenfield[name=dimiliki_id]')[0].setValue(id);
                Ext.ComponentQuery.query('wizardPageAccountSupplier > formAccountBank button#save')[0].setText('Add New');

                me.getWizardGridAccountBank().getStore().getProxy().setExtraParam('dimiliki_id', id );
                me.getWizardGridAccountBank().getStore().load();

                log('Supplier Added with id '+id );
                var panel = btn.up('wizardSupplier');
                log('Set Page to Next Page');
                panel.getLayout().setActiveItem('page2');
                },
                failure: function(s){
                    log('Saving Supplier '+ s.get('name') );
                    msgError('Saving Supplier ' + s.get('name') + 'failure');
                }
            });
    },


    wizardSupplier_formAccountBank_Render: function(){
        log('Render wizardSupplier_formAccountBank_Render');
        this.getBtnCancelAccount().setIconCls('next');
        this.getBtnCancelAccount().setText('Next');
        // this.getWizardGridAccountBank().getStore().load();
    },


    on_wizard_addAccountBankSupplier_Save_Click: function(btn){
        var f = btn.up('form'), val = f.getValues(), rec = f.getRecord(), me = this;
        if (!f.isValid()){ msgError('Silahkan Lengkapi atau Perbaiki Form');return false; }
        var account = Ext.create('App.model.supplier.wizard.AccountBank',val);
        log('Cheking Form Values');
        log(val);
        account.save({
            success: function(account){
                log('Refresh Grid');
                me.getWizardGridAccountBank().getStore().getProxy().setExtraParam('dimiliki_id', val.dimiliki_id );
                me.getWizardGridAccountBank().getStore().load();
                log('Buat Confirm Windows.. Apakah Akan Add Lagi, Jika Ya Reset Form, Tidak : Next Page');
                log(account);
                var supname = Ext.ComponentQuery.query('wizardSupplier formAccountBank displayfield[name=supplier_name]')[0];
                var supid = Ext.ComponentQuery.query('wizardSupplier formAccountBank hiddenfield[name=dimiliki_id]')[0];
                var supname_val = supname.getValue(),supid_val = supid.getValue();
                Ext.MessageBox.confirm('Confirm', 'Apakah Anda Ingin Menambah Account Bank',function(choice){
                    if (choice == 'yes' ) {
                        f.getForm().reset();
                        supname.setValue(supname_val);
                        supid.setValue(supid_val);
                        me.generateAccountBank();
                    }else {
                            log('Set Page to Next Page');
                            me.getWizardSupplier().getLayout().setActiveItem('page3');
                    };
                });

                Ext.ComponentQuery.query('wizardSupplier > wizardPageCountactPersonSupplier > formContact displayfield[name=supplier_name]')[0].setValue(supname_val);
                Ext.ComponentQuery.query('wizardSupplier > wizardPageCountactPersonSupplier > formContact hiddenfield[name=parent_id]')[0].setValue(supid_val);
            },
            failure: function(account){
                msgError('Cannot Added, please Try Again');
            }
        });

    if (isDebug()){me.generateContactPersonData(); }
    },

    on_wizard_addAccountBankSupplier_Click: function(btn){
        log(btn.text);
        var me = this;
        btn.up('form').getForm().reset();
        this.getWizardSupplier().getLayout().setActiveItem('page3');
        me.getGridCp().getStore().load();
    },

    onRender_wizardSupplier_formContact: function(frm){
        var comboboxs = Ext.ComponentQuery.query('wizardSupplier > wizardPageCountactPersonSupplier > formContact combobox');
        for (var i = comboboxs.length - 1; i >= 0; i--) { comboboxs[i].getStore().load(); };

        log('Render Form Contact');
    },

    on_wizardSupplier_formContact_Save: function(btn){
        log('Saving Contacts');
        var me = this, f = btn.up('form'),val = f.getValues(), rec = f.getRecord();
        log(val);
        if (!f.isValid()){ msgError('Silahkan Lengkapi atau Perbaiki Form');return false; }
        var contact = Ext.create('App.model.supplier.wizard.Contact',val);
        log('Cheking Form Values');
        log(val);
        var supname = Ext.ComponentQuery.query('wizardSupplier > wizardPageCountactPersonSupplier > formContact displayfield[name=supplier_name]')[0];
        var supid = me.getSupplierId();
        var supname_val = supname.getValue(),supid_val = supid.getValue();

        contact.save({
            success: function(contact){
                log('Success Adding');
                Ext.MessageBox.confirm('Confirm', 'Apakah Anda Ingin Menambah Contact Person Supplier [' + supname_val  + ' ]',function(choice){
                    if (choice == 'yes' ) {
                        f.getForm().reset();
                        supname.setValue(supname_val);
                        supid.setValue(supid_val);
                        if (isDebug()) me.generateContactPersonData();
                    }else {
                            log('Set Page to Next Page');
                            /*Page 4 : Office */
                            me.getWizardSupplier().getLayout().setActiveItem('page4');
                    };
                });


                log(contact);
            },
            failure: function(){
                msgError('Error, Please Try Again');
                log('Error,Save Contact Person');
            }
        });

        var grid = Ext.ComponentQuery.query('wizardSupplier > wizardPageCountactPersonSupplier container > grid')[0];
        grid.getStore().getProxy().setExtraParam('parent_id',supid_val);
        grid.getStore().getProxy().setExtraParam('parent_type','Supplier');
        grid.getStore().load();
    },

    on_wizardSupplier_formContact_Cancel: function(btn){
        log('Cancel Contact Person , Next Page');
        var f = btn.up('form');
        f.getForm().reset();
        this.getWizardSupplier().getLayout().setActiveItem('page4');
    },

    generateAccountBank: function(){
        log('Generate Data Account Bank');
        var me = this;
        me.getAccountBankName().setValue(randomText('Account Bank ',10));
        me.getAccountBankNumber().setValue('000-02000-209'+randomInt(9)+randomInt(99) );
        me.getAccountBankType().setValue(randomInt(3));
        me.getAccountBankId().setValue(randomInt(100));
    },

    generateContactPersonData: function(){
        log('Generate Data Contact Person');
        var me = this;
        me.getCpName().setValue('Contact Person '+randomText(10));
        me.getCpDept().setValue(randomInt(9) || 1);
        me.getCpPos().setValue(randomInt(100) || 1);
        me.getCpNohp().setValue('081'+randomInt(8)+'-02931-'+randomInt(9) + randomInt(9) +randomInt(9) + randomInt(9));
        me.getCpEmail().setValue('email.user'+randomInt(100)+'@example.com');
        me.getCpFax().setValue('02'+randomInt(8)+'-0293-'+randomInt(9) + randomInt(9) +randomInt(9) ) ;
    },
    generateOffice : function(){
        log('Generate Office with Random Value');
        var f = Ext.ComponentQuery.query('wizardSupplier > wizardSupplierOffice > formOffice')[0];
        f.down('[name=alamat]').setValue('jalan - jalan' + randomText(20) );
        f.down('[name=kodepos]').setValue('4051'+randomInt(9));
        f.down('[name=kodepos]').setValue('4051'+randomInt(9));
        f.down('[name=negara_id]').setValue(1);
        f.down('[name=provinsi_id]').setValue(6);
        f.down('[name=kota_id]').setValue(10);
    }



});
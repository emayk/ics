Ext.define('App.view.master.product.wizard',{
    extend : 'Ext.panel.Panel',
    alias :'widget.formwizardproduct',
    layout: 'card',
    requires: [ 'App.view.master.product.frmAddProduct'],
    bodyStyle: 'padding:15px',

        itemId: 'wizardproduct',
        layout: 'card',
        defaults: {
            border: false,
            bodyPadding: 20
        },
        activeItem: 0,
        items: [
            {
                itemId: 'step-welcome',
                xtype: 'panel',
                layout: { type: 'vbox'},
                items:[
                    { xtype: 'container', html: '<h1>Welcome</a>',flex: .1 },
                    { xtype: 'container', html: 'Content Flow Here', flex: .9}
                ],

                buttons: [
                // {
                //     text: 'Cancel',
                //     handler: function(){
                //         var wizard = this.up('#wizardproduct');
                //         log('Close Page Wizard');
                //         var panel = Ext.widget('formwizardproduct1');
                //         panel.remove();
                //     }
                // },
                {
                    text: 'Next',
                    handler: function () {
                        var wizard = this.up('#wizardproduct');
                        wizard.getLayout().setActiveItem('step-1');
                        if (!isDebug()){
                            var name = randomText('Nama Product ');
                            /*==========  Simulate Page Product  ==========*/
                            wizard.down('[name=name]').setValue(name);
                            wizard.down('[name=nodesign]').setValue(randomText('No Design'));
                            wizard.down('[name=kontruksi]').setValue(randomText('Kontruksi'));
                            wizard.down('[name=supplier_id]').setValue(1);
                            wizard.down('[name=kategori_id]').setValue(1);
                            wizard.down('[name=tipe_id]').setValue(1);
                            wizard.down('[name=berat]').setValue(randomNumber());
                            wizard.down('[name=beratsatuan_id]').setValue(1);
                            wizard.down('[name=lebar]').setValue(randomNumber());
                            wizard.down('[name=lebarsatuan_id]').setValue(6);
                            wizard.down('[name=color_id]').setValue(3); //1 -4
                            wizard.down('[name=gradekain_id]').setValue(2); // 1- 8
                            wizard.down('[name=hargajual]').setValue(randomNumber());
                            wizard.down('[name=currhj_id]').setValue(1);
                            wizard.down('[name=hargajualmin]').setValue(randomNumber());
                            wizard.down('[name=currhjm_id]').setValue(1);
                            wizard.down('[name=unit_id]').setValue(1);
                            /*==========  Simulate Stock  ==========*/
                            wizard.down('[name=tipelokasi_id]').setValue(1); // {1 -> 4}, 2 -> {1,2,3}
                            wizard.down('[name=lokasigudang_id]').setValue(4);
                            wizard.down('[name=qtyin]').setValue(randomNumber());
                            wizard.down('[name=panjangkain]').setValue(randomNumber());
                            wizard.down('[name=satuan_id]').setValue(1); // 1 - 10
                        }
                            /*==========  Load All Store Combox Box  ==========*/
                            Ext.getStore('combo.cbSuppliers').load();

                            // this.getComboCbSuppliersStore().load();
                    }
                }]
            },
            /*==========  Page Form Add Product  ==========*/

            {
                itemId: 'step-1',
                xtype: 'form',
                layout: 'anchor',
                defaults: { anchor: '100%' },
                items: [
                        {
                                xtype :'fieldset',
                                title : 'Informasi Product',
                                collapsible : true,
                                columnWidth : '30%',
                                defaultType : 'textfield',
                                layout : { type : 'anchor', align : 'stretch' },
                                items : [
                                        { xtype : 'textfield', name: 'name', fieldLabel : 'Name ' },
                                        { xtype : 'textfield', name: 'nodesign', allowBlank: false, fieldLabel : 'Article Number' },
                                        {xtype : 'textfield', name: 'kontruksi', allowBlank: false, fieldLabel : 'Dimension'},
                                        { xtype : 'cbSupplier',name : 'supplier_id',  forceSelection : forceSelectionMode(), hiddenName: 'supplier_id' },
                                        { xtype : 'cbcatproduct', name : 'kategori_id', forceSelection : forceSelectionMode(), hiddenName : 'kategori_id'},
                                        { xtype : 'cbTypeProduct', name : 'tipe_id', forceSelection : forceSelectionMode(), hiddenName : 'tipe_id' },
                                        {xtype : 'container', layout: 'hbox',
                                            items : [
                                                { xtype : 'numberfield', name: 'berat', anchor : '-10', forceSelection : forceSelectionMode(), hideTrigger: true, minValue: 0, allowBlank: false, fieldLabel : 'Weigth'},
                                                { name : 'beratsatuan_id', xtype : 'cbUnitWeight',  forceSelection : forceSelectionMode(), hiddenName: 'beratsatuan_id', fieldLabel: ''}
                                                ]
                                        },
                                        {  xtype : 'container', height: 5,  },
                                        {xtype : 'container', layout: 'hbox',
                                            items : [
                                                { xtype : 'numberfield', anchor : '-10', name: 'lebar',hideTrigger: true, minValue: 0, allowBlank: false, forceSelection : forceSelectionMode(), fieldLabel : 'Width'},
                                                { name : 'lebarsatuan_id', xtype : 'cbUnitWidth', forceSelection : forceSelectionMode(), hiddenName: 'lebarsatuan_id', fieldLabel: '' }]
                                        },
                                        { xtype: 'container', height: 10}
                                    ]
                            },
                            {
                                collapsible : true,
                                xtype: 'fieldset',
                                title : 'Informasi Product Detail',
                                items: [
                                        // { xtype : 'textfield', id: 'frmproductdetailpid', name: 'product_id', fieldLabel : 'Product ID ',hidden: true, flex: 1},
                                        { xtype : 'cbcolor',  name: 'color_id', fieldLabel : 'Color', flex: 1,anchor: '95%', forceselection : forceSelectionMode()},
                                        { xtype : 'cbgradekain',  name: 'gradekain_id', fieldLabel : 'Grade', flex: 1,anchor: '95%',forceselection : forceSelectionMode()},

                                        { xtype : 'container', layout: 'hbox', items : [
                                        { xtype : 'numberfield',allowDecimals: true, decimalPrecision: 2,hideTrigger: true,allowBlank: false, minValue: 0, name: 'hargajual', fieldLabel : 'Harga Jual ', flex: 1,anchor: '95%' },
                                        { xtype : 'cbcurrencies',  name: 'currhj_id', fieldLabel: '', flex: 1,anchor: '95%',forceselection : forceSelectionMode() },
                                            ]},
                                        {  xtype : 'container', height: 5,  },

                                        { xtype : 'container', layout: 'hbox' , items : [
                                            {xtype : 'numberfield', minValue: 0, allowBlank: false, name: 'hargajualmin', fieldLabel : 'Harga Jual (min)', flex: 1,anchor: '95%', hideTrigger: true, keyNavEnabled: true, allowDecimals: true, decimalPrecision: 1, },
                                            {xtype : 'cbcurrencies',  name: 'currhjm_id', fieldLabel: '', flex: 1,anchor: '95%', forceselection : forceSelectionMode()},
                                        ]},

                                        { name: 'parent_type', value: 'Product' ,hidden : true},
                                        {  xtype : 'container', height: 10,  },
                                        {  xtype : 'cbunits', name : 'unit_id' , fieldLabel : 'Pilih Satuan',forceselection : forceSelectionMode()},
                                ]
                            }
                ],
                buttons: [
                {
                    text: 'Prev',
                    handler: function () {
                        var wizard = this.up('#wizardproduct');
                            wizard.getLayout().setActiveItem('step-welcome');
                    }
                },
                {
                    text: 'Next',
                    handler: function (btn) {
                        log('Next Button Page 1 Clicked. .....');
                        var wizard = btn.up('#wizardproduct');
                        var form = btn.up('form');
                        // cDir(form);
 
                        // Ext.getCmp('pidproduct').setValue(randomNumber());
                        if (!form.isValid()) {msgError('Form Invalidate!!'); }
                        else{
                            form.submit({
                                waitMsg: 'Saving Data...',
                                url : api_url + '/product',
                                success: function(fp,o){
                                    var res = o.result.results, pid = res.id;
                                    cDir(o.result.results);
                                    Ext.getCmp('pidproduct').setValue(pid);

                                    Ext.getCmp('nmproduct').setValue(res.name);
                                    Ext.getCmp('fieldsetNewStockProduct').setTitle('Stock Product '+res.name);
                                    wizard.getLayout().setActiveItem('step-2');
                                },
                                failure: function(){
                                    var msg = Ext.JSON.decode(this.response.responseText).error.message;
                                    msgError(msg);
                                    return;
                                }
                            });
                        }
                    }
                },
                ]
            },
            /*==========  //Page Form Add Product  ==========*/


            /*==========  Page Form Add Product Details  ==========*/

            {
                itemId: 'step-2',
                xtype: 'form',
                layout: 'anchor',
                defaults: { anchor: '100%' },
                items: [
                { id : 'fieldsetNewStockProduct', xtype: 'fieldset', title: 'Stock Product ', items:[
                    { xtype: 'textfield', allowBlank: false, id:'pidproduct', name: 'product_id',hidden: true},
                    { xtype: 'displayfield', fieldLabel : 'Name Product', id : 'nmproduct' },
                    { xtype: 'cbTypeLocation', fieldLabel: 'Tipe Lokasi', name: 'tipelokasi_id',anchor: '100%'  },
                    { xtype: 'cbwarehouse', fieldLabel: 'Lokasi Penyimpanan', name: 'lokasigudang_id', anchor: '100%'  },
                    { xtype: 'numberfield', fieldLabel: 'Initialize Qty', name: 'qtyin', anchor: '100%',allowblank: false, minValue: 0, value: 0,maxValue: 2147483647, hideTrigger: true, keyNavEnabled: true, allowDecimals: true, decimalPrecision: 1 },
                    { xtype: 'container', layout: 'hbox',items:[
                        { xtype: 'numberfield', fieldLabel: 'Panjang Kain', name: 'panjangkain', anchor: '100%',allowblank: false, minValue: 0, value: 0,maxValue: 2147483647, hideTrigger: true, keyNavEnabled: true, allowDecimals: true, decimalPrecision: 1 },
                        { xtype: 'cbunits', fieldLabel: 'Satuan Kain', name: 'satuan_id',anchor: '100%'  },
                    ]},
                    // { xtype: 'container', layout: 'hbox',items:[
                    // ]},
                    { xtype: 'container', height: 10}
                ]},
                {
                    xtype: 'container',
                }
                ],
                buttons: [
{
    text: 'Cancel',
    handler: function(){
        log('Cancel');
        var wizard = this.up('#wizardproduct');
        var pid = wizard.down('[name=product_id]').getValue();
        log(pid);
        var form = this.up('form');
        form.submit({
        url: api_url + '/stockproducts?cancel=true&id='+pid+'&form=stock',
        // baseParams : {id: pid, cancel: true, form: 'stock' },
        waitTitle: 'Please Wait..................',
        waitMsg: 'Canceled Process',
        success: function(fp,o){
                var res = o.result.results, pid = res.id,  msg = o.result.message;
                if (msg){ msgError(msg); }else {msgError('Product Has Been Cancelled');}

                wizard.getLayout().setActiveItem('step-welcome');
            },
            failure: function(){
                log('Failure');
                var msg = Ext.JSON.decode(this.response.responseText);//.error.message;
                msgError(msg);
                return;
            }
        });

    }
},
                {
                    text: 'Next ',
                    handler: function () {
                        var wizard = this.up('#wizardproduct');
                        var form = this.up('form');
                        
                        if (!form.getForm().isValid()) {
                            msgError('Form Incompleted !<br/>Tidak Bisa Diteruskan'); return false;
                        }
                        form.submit({
                            url: api_url + '/stockprod',
                            waitMsg: 'Saving Stock Product ',
                            success: function(fp,o){
                                    var res = o.result.results, pid = res.id;
                                    cDir(o.result.results);
                                    log('Success');
                                    cDir(pid);
                                    // Ext.getCmp('sidstockprod').setValue(pid);

                                    // Ext.getCmp('nmproduct').setValue(res.name);
                                    // Ext.getCmp('fieldsetNewStockProduct').setTitle('Stock Product '+res.name);
                                    wizard.getLayout().setActiveItem('step-3');
                                },
                                failure: function(){
                                    log('Failure');
                                    var msg = Ext.JSON.decode(this.response.responseText);//.error.message;
                                    msgError(msg);
                                    return;
                                }
                        });
                    }
                },

                ]
            },
            /*==========  /Page Form Add Product Detail ==========*/
            /*==========  Page Finish ==========*/

            {
                itemId: 'step-3',
                html: 'Product Berhasil di Buat',
                buttons:[
                { text: 'Add Another Product',
                handler: function () {  var wizard = this.up('#wizardproduct'); wizard.getLayout().setActiveItem('step-welcome'); }
                }
                ]
            }
        ],



});
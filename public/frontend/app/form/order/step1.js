var countSave = 0,
required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

Ext.define('App.form.order.step1',{
    extend : 'Ext.form.Panel',
    // extend : 'Ext.container.Container',
    requires : [ 'Ext.ux.DataTip', 
    'App.form.combobox.cbSupplier',
    'App.form.combobox.cbWarehouse',
    //combo delivery
    // 'App.form.combobox.cbDeliverydate',
    'App.form.order.step2' ],
    alias: 'widget.frmOrderStep1',
    title: 'Add Order\'s ',
        collapsible: false,
        bodyPadding: 5,
        fieldDefaults: {
            labelAlign: 'top',
            msgTarget: 'side'
        },
        defaults: {
            anchor: '100%'
        },
        plugins: { 
            ptype: 'datatip' 
        },
	 
        items: [{
            xtype: 'container',
            layout:'hbox',
            items:[
            {
                xtype: 'container',
                flex: 1,
                border:false,
                layout: 'anchor',
                defaultType: 'textfield',
                
                items: [
                {
                    xtype : 'cbSupplier',
                    fieldLabel: 'Supplier',
                    afterLabelTextTpl: required,
                    allowBlank: false,
                    name: 'supplierId',
                    displayField : 'name',
                    valueField: 'id',
                    value: 2,
                    store : 'combo.cbSuppliers',
                    tooltip : 'Select Supplier Name',
                    anchor:'95%'
                }, 
                {
                    name: 'deliverydate',
                    // xtype: 'cbDeliverydate',
                    
                    xtype: 'datefield',
                    fieldLabel: 'Delivery at',
                    tooltip: 'Choose Date ',
                    value: new Date(),
                    disabledDays:  [0, 6],
                    // format: 'm-D-Y',
                    submitFormat: 'd/m/Y',
                    anchor:'95%',

                    format:'l, d F Y',
                    showToday: false,
                    minValue : new Date()
                },
                {
                    xtype: 'cbwarehouse',
                    afterLabelTextTpl: required,                   
                } ]
            },
            {
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                defaultType: 'textfield',
                items: [
                {
                    fieldLabel: 'Credit Delay',
                    afterLabelTextTpl: required,
                    allowBlank: false,
                    name: 'creditday',
                    anchor:'95%',
                    xtype: 'numberfield',
                    value: 1,
                    maxValue: 365,
                    minValue: 1,
                    tooltip: 'Choose Delay Credit'
                }, 
                {
                    xtype : 'combobox',
                    fieldLabel: 'Payment ',
                    afterLabelTextTpl: required,
                    allowBlank: false,
                    name: 'paymentTypeId',
                    value: 2,
                    displayField : 'name',
                    valueField: 'id',
                    tooltip : 'Choose Payment Methode',
                    store :Ext.create('Ext.data.Store', {
                             fields: ['id','name'],
                             data : [
                                 {id: 1, name: 'n/30'},
                                 {id: 2, name: 'COD'},
                                 {id: 3, name: 'DAP'},
                                 {id: 4, name: 'DP'},
                                 {id: 5, name: 'n/24'},
                                 {id: 6, name: 'n/31'},
                             ]
                         }),
                    anchor:'95%'                    
                }, 
                {
                    xtype : 'combobox',
                    fieldLabel: 'Contact Person',
                    afterLabelTextTpl: required,
                    allowBlank: false,
                    name: 'cpId',
                    displayField : 'name',
                    valueField: 'id',
                    value: 1,
                    tooltip : 'Choose Contact Person',
                    store :Ext.create('Ext.data.Store', {
                             fields: ['id','name'],
                             data : [
                                 {id: 1, name: 'Edward'},
                                 {id: 2, name: 'Timothy'},
                                 {id: 3, name: 'Fuad'},
                             ]
                         }),
                    anchor:'95%'                    
                }

                ]
            },{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                defaultType: 'textfield',
                items: [
                {
                    xtype : 'combobox',
                    fieldLabel: 'Currency',
                    afterLabelTextTpl: required,
                    allowBlank: false,
                    name: 'currencyId',
                    displayField : 'name',
                    valueField: 'id',
                    value: 1,
                    tooltip : 'Choose Currency',
                    store :Ext.create('Ext.data.Store', {
                             fields: ['id','name'],
                             data : [
                                 {id: 1, name: 'Rp'},
                                 {id: 2, name: 'Yen'},
                                 {id: 3, name: 'Dollar'},
                             ]
                         }),
                    anchor:'95%'                    
                }, 
                {
                    xtype : 'combobox',
                    fieldLabel: 'Tax',
                    afterLabelTextTpl: required,
                    allowBlank: false,
                    name: 'taxId',
                    displayField : 'name',
                    valueField: 'id',
                    value: 1,
                    tooltip : 'Choose Tax Type',
                    store :Ext.create('Ext.data.Store', {
                             fields: ['id','name'],
                             data : [
                                 {id: 1, name: 'PPN'},
                                 {id: 2, name: 'Non PPN'},
                                 {id: 3, name: 'PPN 0%'},
                             ]
                         }),
                    anchor:'95%'                    
                }                
                ]
            }]
        }
        ],
 
        // buttons: [{
        //     text: 'Save',
        //     handler: function(button) {
        //         var form = button.up('form');
        //         valid = form.getForm().isValid(),
        //         value = form.getValues();
        //         countSave++;
        //         if (countSave == 5){
        //             log('You Have '+ countSave + ' Please try again');
        //             countSave=0;
        //         };

        //         if (valid){
        //             log('lakukan Request ke server');
        //             log('Form Valid , Tampilkan Form Tambah Product Untuk ditambahkan')
        //             cDir(value);
        //             // Open step 2 disable this.
        //             log('Add New Order to Basket');
        //             var panel = button.up('tabpanel');
        //             // // cDir(panel);
        //             // var tabAdd = panel.add({
        //             //     xtype : 'frmOrderStep2',
        //             //     title : 'Add Product To Order [NO PO]',
        //             // });
        //             // // set aktif new tabs (step 2)
        //             // panel.setActiveTab(tabAdd);
        //             // // disable
        //             // button.up().setDisabled(true);

        //             button.up('tabpanel').setActiveTab(Ext.widget('frmOrderStep2'));

        //         }else{
        //             cWarn('Form Tidak Valid');
        //         }
        //     }
        // },{
        //     text: 'Cancel',
        //     handler: function(button) {
        //         button.up('form').getForm().reset();
        //     }
        // }]

});




var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('App.form.order.AddOrder',{
	alias : 'widget.formAddOrder',
    extend : 'Ext.form.Panel',
    requires: [
    'Ext.ux.DataTip', 
    'App.form.combobox.cbCatproduct',
    'App.form.combobox.cbSupplier',
    'App.form.combobox.cbTypeProduct',
    'App.form.combobox.cbSatuan',
    'App.form.combobox.cbContactPerson',
    'App.form.combobox.cbWarehouse',
    'App.form.combobox.cbCurrencies',
    'App.form.combobox.cbTypePayment',
    ],
    title   : 'New Invoice',
    // layout  : {
    //     type: 'fit',
    //     align : 'strech'
    // },
    autoShow : true,
	anchor : '-100', 
    // height: 300,
    // width: 400,

    initComponent : function() {
        log('[Invoice] Form Product Loaded');

         this.dockedItems  = [{
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: ['->', {
                iconCls: 'icon-save',
                text: 'Save',
                action: 'save',
                handler: function() {
                    var form = this.up('form');
                    valid = form.getForm().isValid(),
                    value = form.getValues();
                    var msg = ('Form  is Valid  : '+ valid);
                    if (!valid) {
                            cWarn(msg);
                            Ext.Msg.alert('Error','Form Belum Lengkap');
                            return;
                    }else {
                        log(msg);
                        cDir(value);
                    } 
                    
                }

            },{
                iconCls: 'icon-reset',
                text: 'Cancel',
                action: 'cancel',
                handler: function() {
                    this.up('form').getForm().reset();
                }
            }]
        }];

        this.callParent(arguments);

    },

    // padding: '5 5 0 5',
    border: false,
    style: 'background-color: #fff;',
    
    fieldDefaults: {
        anchor: '100%',
        labelAlign: 'left',
        allowBlank: false,
        combineErrors: true,
        msgTarget: 'side'
    },
    items : [

            {

                xtype:'fieldset',
                title: 'Supplier and Contact Person',
                collapsible: true,
                defaultType: 'textfield',
                defaults: { anchor: '100%'},

                layout: 'anchor',
                items :[
                        /*==========  Supplier  ==========*/
                
                        {
                            fieldLabel: 'Supplier ',
                            name : 'supplier_id', 
                            forceSelection : true,
                            xtype : 'cbSupplier',
                            afterLabelTextTpl: required,                
                        } ,
                        /*==========  Contact Person  ==========*/
                        
                        {
                            xtype : 'cbContactperson',
                            fieldLabel: 'Contact Person',
                            forceSelection : true,
                            afterLabelTextTpl: required,
                            name: 'contactId',                 
                        },
                        ],
            },
            {
                xtype:'fieldset',
                title: 'Delivery Date and Ship Address',
                collapsible: true,
                defaultType: 'textfield',
                defaults: { anchor: '100%'},

                layout: 'anchor',
                items :[
            
                        /*==========  Delivery Date  ==========*/
                        

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
                        /*==========  Warehouse  ==========*/
                        
                        {
                            xtype: 'cbwarehouse',
                            name : 'warehouse_id',
                            forceSelection : true,
                            afterLabelTextTpl: required,                   
                        },
            ]},

            {
                xtype:'fieldset',
                title: 'Currency , Credit and Payment Method',
                collapsible: true,
                defaultType: 'textfield',
                defaults: { anchor: '100%'},

                layout: 'anchor',
                items :[

            
                        /*==========  Currency  ==========*/
                        
                        {
                            fieldLabel: 'Currency',
                            name : 'currency_id', 
                            forceSelection : true,
                            afterLabelTextTpl: required,
                            xtype : 'cbcurrencies', // 

                        },
                        /*==========  Kredit  ==========*/
                        
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

                        /*==========  Method Payment  ==========*/
                        {
                            xtype : 'cbTypePayment', // 
                            fieldLabel: 'Payment ',
                            name : 'payment_type_id',
                            afterLabelTextTpl: required,
                        }, 
                    ]
            }
            ],



});














// 
// 
// ORI


// var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
// Ext.define('App.form.order.AddOrder',{
//     alias : 'widget.formAddOrder',
//     extend : 'Ext.form.Panel',
//     requires: [
//     'Ext.ux.DataTip', 
//     'App.form.combobox.cbCatproduct',
//     'App.form.combobox.cbSupplier',
//     'App.form.combobox.cbTypeProduct',
//     'App.form.combobox.cbSatuan',
//     'App.form.combobox.cbContactPerson',
//     'App.form.combobox.cbWarehouse',
//     'App.form.combobox.cbCurrencies',
//     'App.form.combobox.cbTypePayment',
//     ],
//     title   : 'New Invoice',
//     // layout  : 'fit',
//     autoShow : true,
//     anchor : '-100', 
//     // height: 300,
//     // width: 400,

//     initComponent : function() {
//         log('[Invoice] Form Product Loaded');
//         this.callParent(arguments);
//     },

//     padding: '5 5 0 5',
//     border: false,
//     style: 'background-color: #fff;',
    
//     fieldDefaults: {
//         anchor: '100%',
//         labelAlign: 'left',
//         allowBlank: false,
//         combineErrors: true,
//         msgTarget: 'side'
//     },
//     items : [

//             {

//                 xtype:'fieldset',
//                 title: 'Information',
//                 collapsible: true,
//                 defaultType: 'textfield',
//                 defaults: {anchor: '100%'},

//                 layout: 'anchor',
//                 items :[
//                         /*==========  Supplier  ==========*/
                
//                         {
//                             fieldLabel: 'Supplier ',
//                             name : 'supplier_id', 
//                             forceSelection : true,
//                             xtype : 'cbSupplier',
//                             afterLabelTextTpl: required,                
//                         } ,
//                         /*==========  Contact Person  ==========*/
                        
//                         {
//                             xtype : 'cbContactperson',
//                             fieldLabel: 'Contact Person',
//                             forceSelection : true,
//                             afterLabelTextTpl: required,
//                             name: 'contactId',                 
//                         },
//                         /*==========  Delivery Date  ==========*/
                        

//                         {
//                             name: 'deliverydate',
//                             // xtype: 'cbDeliverydate',
                            
//                             xtype: 'datefield',
//                             fieldLabel: 'Delivery at',
//                             tooltip: 'Choose Date ',
//                             value: new Date(),
//                             disabledDays:  [0, 6],
//                             // format: 'm-D-Y',
//                             submitFormat: 'd/m/Y',
//                             anchor:'95%',

//                             format:'l, d F Y',
//                             showToday: false,
//                             minValue : new Date()
//                         },
//                         /*==========  Warehouse  ==========*/
                        
//                         {
//                             xtype: 'cbwarehouse',
//                             name : 'warehouse_id',
//                             forceSelection : true,
//                             afterLabelTextTpl: required,                   
//                         },
 
//                         /*==========  Currency  ==========*/
                        
//                         {
//                             fieldLabel: 'Currency',
//                             name : 'currency_id', 
//                             forceSelection : true,
//                             afterLabelTextTpl: required,
//                             xtype : 'cbcurrencies', // 

//                         },
//                         /*==========  Kredit  ==========*/
                        
//                         {
//                             fieldLabel: 'Credit Delay',
//                             afterLabelTextTpl: required,
//                             allowBlank: false,
//                             name: 'creditday',
//                             anchor:'95%',
//                             xtype: 'numberfield',
//                             value: 1,
//                             maxValue: 365,
//                             minValue: 1,
//                             tooltip: 'Choose Delay Credit'
//                         },

//                         /*==========  Method Payment  ==========*/
//                         {
//                             xtype : 'cbTypePayment', // 
//                             fieldLabel: 'Payment ',
//                             name : 'payment_type_id',
//                             afterLabelTextTpl: required,
//                         }, 
//                     ] 
//                 }, 
//             ],

//          dockedItems  : [{
//             xtype: 'toolbar',
//             dock: 'bottom',
//             id:'buttons',
//             ui: 'footer',
//             items: ['->', {
//                 iconCls: 'icon-save',
//                 text: 'Save',
//                 action: 'save',
//                 handler: function() {
//                     var form = this.up('form');
//                     valid = form.getForm().isValid(),
//                     value = form.getValues();
//                     var msg = ('Form  is Valid  : '+ valid);
//                     (!valid) ? cWarn(msg): log(msg);
//                     cDir(value);
//                 }

//             },{
//                 iconCls: 'icon-reset',
//                 text: 'Cancel',
//                 action: 'cancel',
//                 handler: function() {
//                     this.up('form').getForm().reset();
//                 }
//             }]
//         }],

//  //    tools:[{
//  //    type:'refresh',
//  //    tooltip: 'Refresh',
//  //    // hidden:true,
//  //    handler: function(event, toolEl, panelHeader) {
//  //        // refresh logic
//  //        window.location.reload();
//  //        log('refresh Button Clicked');
//  //    }
//     // },
//     // {
//     //     type:'help',
//     //     tooltip: 'Get Help',
//     //     callback: function(panel, tool, event) {
//     //         // show help here
//     //         log('help button Clicked');
//     //     }
//     // }]
// });

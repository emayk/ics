/*==========  Simulasi Variable  ==========*/
var color = '1',
    grade = '1',
    hj = randomNumber()*1000,
    chj = '1',
    hjm = randomNumber()*1000,
    chjm = '1',
    satuan = '1';


Ext.define('App.view.master.product.frmDetails',{
    extend : 'Ext.panel.Panel',
    alias : 'widget.frmproductdetail',
//    id: 'frmaddproductdetail',
    border : false,
    items : [
     {
        xtype : 'form',
        padding: '5 5 0 5',
        border: false,
        style: 'background-color: #fff;',
        layout  : { type : 'vbox', align: 'stretch' },

        fieldDefaults: {
            anchor: '100%',
            labelAlign: 'left',
            allowBlank: false,
            combineErrors: true,
            msgTarget: 'side',
        },
        layout : { type : 'vbox', align: 'stretch'},
        items: [
                { xtype : 'textfield', id: 'frmproductdetailpid', name: 'product_id', fieldLabel : 'Product ID ',hidden: true, flex: 1, value: 100},
                { xtype : 'cbcolor',  name: 'color_id', fieldLabel : 'Color', flex: 1,anchor: '95%', forceselection : !isDebug(), value: color },
                { xtype : 'cbgradekain',  name: 'gradekain_id', fieldLabel : 'Grade', flex: 1,anchor: '95%',forceselection : !isDebug(), value: grade },

                { xtype : 'container', layout: 'hbox', items : [
                    { xtype : 'numberfield',allowDecimals: true, decimalPrecision: 2,hideTrigger: true,allowBlank: false, minValue: 0, name: 'hargajual', fieldLabel : 'Harga Jual ', flex: 1,anchor: '95%', value: hj},
                    { xtype : 'cbcurrencies',  name: 'currhj_id', fieldLabel: '', flex: 1,anchor: '95%',forceselection : !isDebug(), value: chj },
                ]},
                 {  xtype : 'container', height: 5,  },

                { xtype : 'container', layout: 'hbox' , items : [
                {   xtype : 'numberfield',
                    minValue: 0, allowBlank: false,
                    name: 'hargajualmin',
                    value: hjm,
                    fieldLabel : 'Harga Jual (min)',
                    flex: 1,anchor: '95%',
                    hideTrigger: true,
                    keyNavEnabled: true,
                    allowDecimals: true,
                    decimalPrecision: 1
                },
                { xtype : 'cbcurrencies',  name: 'currhjm_id', fieldLabel: '', flex: 1,anchor: '95%', forceselection : !isDebug(), value: chjm },
                ]},

                { name: 'parent_type', value: 'Product' ,hidden : true},


        {  xtype : 'container', height: 10,  },
        {  xtype : 'cbunits', name : 'unit_id' , fieldLabel : 'Pilih Satuan',forceselection : !isDebug(), value: satuan },
        {  xtype : 'container', height: 10,  },
        ]
     }
     ],
    initComponent : function(){this.callParent(); },
    dockedItems  : [{xtype: 'toolbar', dock: 'bottom', ui: 'footer',
        items: ['->', {iconCls: 'icon-save', text: 'Save Details & Next', formBind:!isDebug(), action: 'addproductdetail'},
        {iconCls: 'icon-reset', text: 'Cancel', action: 'cancel', }] }],

});

// Ext.define('App.view.master.product.frmDetails',{
// 	extend : 'Ext.panel.Panel',
// 	alias : 'widget.frmproductdetail',
//     border : false,

//     items : [
//      {

//         xtype : 'container',

//         layout : { type : 'vbox', align: 'stretch'},
//         items: [
//                 { xtype : 'textfield',  name: 'product_id', fieldLabel : 'Product ID ',hidden: false, flex: 1, value: 100},
//                 { xtype : 'cbcolor',  name: 'color_id', fieldLabel : 'Color', flex: 1,anchor: '95%'},
//                 { xtype : 'cbgradekain',  name: 'gradekain_id', fieldLabel : 'Grade', flex: 1,anchor: '95%'},

//                 { xtype : 'container', layout: 'hbox', items : [
//                     { xtype : 'numberfield',allowDecimals: true, decimalPrecision: 2,hideTrigger: true,allowBlank: false, minValue: 0, name: 'hargajual', fieldLabel : 'Harga Jual ', flex: 1,anchor: '95%'},
//                     { xtype : 'cbcurrencies',  name: 'currhj_id', fieldLabel: '', flex: 1,anchor: '95%'},
//                 ]},
//                  {  xtype : 'container', height: 5,  },

//                 { xtype : 'container', layout: 'hbox' , items : [
//                 {   xtype : 'numberfield',
//                     minValue: 0, allowBlank: false,
//                     name: 'hargajualmin',
//                     fieldLabel : 'Harga Jual (min)',
//                     flex: 1,anchor: '95%',
//                     hideTrigger: true,
//                     id : 'frmhargajualminval',
//                     keyNavEnabled: true,
//                     allowDecimals: true,
//                     decimalPrecision: 1,
//                 },
//                 { xtype : 'cbcurrencies',  name: 'currhjm_id', fieldLabel: '', flex: 1,anchor: '95%'},
//                 ]},

//                 { name: 'parent_type', value: 'Product' ,hidden : true},


//         {  xtype : 'container', height: 10,  },
//         {  xtype : 'cbunits', name : 'unit_id' , fieldLabel : 'Pilih Satuan'},
//         {  xtype : 'container', height: 10,  },
//         // {  xtype : 'container', height: 10,  },
//         // {  xtype : 'container', height: 10,  },
//         // {  xtype : 'container', height: 10,  },
//         ]
//      }
//      ],
//      initComponent : function(){
//      	this.callParent();

//      },
//      dockedItems  : [{
//     xtype: 'toolbar',
//     dock: 'bottom',
//     ui: 'footer',
//     items: ['->', {
//         iconCls: 'icon-save',
//         text: 'Save Details & Next',
//         formBind:!isDebug(),
//         action: 'addproductdetail'
//     },{
//         iconCls: 'icon-reset',
//         text: 'Cancel',
//         action: 'cancel',
//     }]
// }],

// });
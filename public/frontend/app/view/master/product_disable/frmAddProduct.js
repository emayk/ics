/**
*
* Form Tambah Product
*
*
**/

Ext.define('App.view.master.product.frmAddProduct',{
    alias : 'widget.frmAddProduct',
    extend: 'Ext.panel.Panel',
    requires: ['Ext.form.Panel',
    'Ext.form.field.Text',
    'App.form.combobox.cbCatproduct',
    'App.form.combobox.cbSupplier',
    'App.form.combobox.cbTypeProduct',
    'App.form.combobox.cbSatuan',
    'App.form.combobox.cbCurrencies',
    'App.form.combobox.cbGradeKain',
    'App.form.combobox.cbColor',
    'App.form.combobox.cbUnits'
    ],
    // title   : 'Product',
    layout  : { type : 'fit', align: 'stretch' },
    // autoShow : true,
    // anchor : '-100',
    // border : false,
    // height: 300,
    // width: 400,
    initComponent : function() { log('Form Add Product Loaded');  this.callParent(arguments); },
    items : [
            {
                xtype : 'form',
                id: 'frmaddproduct',
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
                items : [
                    { xtype: 'frmproductinfo'}
//                    ,

                    // {  xtype: 'tabform'    },

                     // {xtype : 'fieldset', title : 'Detail \'s Product', items: [{ xtype: 'frm-product-detail'} ] }


                ]
            }
        ],


    // tools:[{
    // type:'refresh',
    // tooltip: 'Refresh',
    // handler: function(event, toolEl, panelHeader) {
    //     // refresh logic
    //     // window.location.reload();
    //     log('refresh Button Clicked');
    // }
    // },
    // {
    //     type:'help',
    //     tooltip: 'Get Help',
    //     callback: function(panel, tool, event) {
    //         // show help here
    //         log('help button Clicked');
    //     }
    // }],
    listeners : {
        render : function(){
        Ext.getStore('App.store.combo.cbSuppliers').load();
        Ext.getStore('App.store.combo.cbCategory').load();
        Ext.getStore('App.store.combo.cbTypeProduct').load();
        Ext.getStore('App.store.combo.cbUnits').load();
        Ext.getStore('App.store.combo.cbColors').load();
        Ext.getStore('App.store.combo.cbGradeKain').load();
        Ext.getStore('App.store.combo.cbCurrency').load();
        Ext.getStore('App.store.combo.cbUnits').load();
    } }
});
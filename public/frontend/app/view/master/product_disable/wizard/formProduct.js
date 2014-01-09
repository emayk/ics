/**
*
* Form Tambah Product
*
*
**/

Ext.define('App.view.master.product.wizard.formProduct',{
    alias : 'widget.frmNewProduct',
    extend: 'Ext.panel.Panel',
    requires: [
    // 'Ext.form.Panel',
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
    layout  : { type : 'fit', align: 'stretch' },
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
                    { xtype: 'container'}
                ]
            }
        ]
});

Ext.define('App.view.products.formProduct',{
   extend : 'Ext.form.Panel',
    alias : 'widget.productform',
    requires:[
        'App.form.combobox.cbUnitWeight',
        'App.form.combobox.cbUnitWidth',
        'App.form.combobox.cbTypeProduct',
        'App.form.combobox.cbColor',
        'App.form.combobox.cbGradeKain',
        'App.form.combobox.cbCatproduct'
    ],
    autoScroll: true,
    padding: 4,
    bodyPadding: 10,
    frame :  true,
    layout: 'hbox',
    defaults:{
        anchor : '95%',
        labelWidth: 100
    },

    buttons:[
        {
            text : 'help',
            iconCls: 'help',
            itemId: 'help'
        },'->',
        {
            text : 'Save',
            iconCls: 'save',
            formBind: false,
            itemId: 'save'
        },{
            text : 'cancel',
            iconCls: 'close',
            itemId: 'cancel'
        }

    ],
    initComponent: function(){
        var me = this;
        Ext.apply(me,{
            items:[
                {
                    xtype: 'fieldset',
                    flex:.5,
                    title: 'Informasi Produk Baru',
                    defaults : {
                        allowBlank:false,
                        anchor: '95%',labelWidth: 100
                    },
                    items:[
                        { xtype: 'textfield' , fieldLabel: translations.field.name.product, name : 'name' },
                        { xtype: 'cbcatproduct' , fieldLabel: translations.field.category.product, name : 'cat_id' },
                        { xtype: 'textfield' , fieldLabel: 'Corak', name : 'contruction' },
                        { xtype: 'textfield' , fieldLabel: 'Nomor Design', name : 'nodesign' },
                        { xtype: 'cbTypeProduct' , fieldLabel: 'Tipe Produk', name: 'type_id'},
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: translations.field.weight,
                            combineErrors: true,
                            msgTarget : 'side',
                            layout: 'hbox',
                            defaults: {
                                flex: 1,
                                allowBlank:false,
                                hideLabel: true
                            },
                            items: [
                                { xtype: 'numberfield' , fieldLabel: 'Berat', name : 'weight' ,margin: '0 5 0 0'},
                                { xtype: 'cbUnitWeight' , fieldLabel: 'unitweight_id', name : 'unitweight_id',emptyText:'Pilih Berat' }
                            ]
                        },{
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Lebar',
                            combineErrors: true,
                            msgTarget : 'side',
                            layout: 'hbox',
                            defaults: {
                                flex: 1,
                                allowBlank:false,
                                hideLabel: true
                            },
                            items: [
                                { xtype: 'numberfield' , fieldLabel: '', name : 'width' ,margin: '0 5 0 0'},
                                { xtype: 'cbUnitWidth' , fieldLabel: 'unitwidth_id', name : 'unitwidth_id',emptyText:'Pilih Lebar' }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    flex:.5,
                    margins: '0 0 0 10',
                    title : 'Detail Produk',
                    defaults : {
                        allowBlank:false,anchor: '95%',labelWidth: 100
                    },
                    items:[
                        { name : 'det_color_id', fieldLabel : 'color_id', xtype : 'cbcolor' } ,
                        { name : 'det_unit_id', fieldLabel : 'unit_id', xtype : 'cbunits' } ,
                        { name : 'det_grade_id', fieldLabel : 'grade_id', xtype : 'cbgradekain' } ,
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Sales Price',
                            combineErrors: true,
                            msgTarget : 'side',
                            layout: 'hbox',
                            defaults: {
                                flex: 1,
                                hideLabel: true,
                                allowBlank:false
                            },
                            items: [
                                { name : 'det_salesprice', fieldLabel : 'salesprice', xtype : 'numberfield' ,margin: '0 5 0 0'} ,
                                { name : 'det_currsp_id', fieldLabel : 'currsp_id', xtype : 'cbcurrencies' }
                            ]
                        },{
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Sales Price Minimal',
                            combineErrors: true,
                            msgTarget : 'side',
                            layout: 'hbox',
                            defaults: {
                                flex: 1,
                                allowBlank:false,
                                hideLabel: true
                            },
                            items: [
                                { name : 'det_salespricemin', fieldLabel : 'salespricemin', xtype : 'numberfield',margin: '0 5 0 0' } ,
                                { name : 'det_currspm_id', fieldLabel : 'currspm_id', xtype : 'cbcurrencies' }
                            ]
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
});
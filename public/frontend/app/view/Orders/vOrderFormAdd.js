/**
*
* Form Add Order
*
**/

Ext.define('App.view.Orders.vOrderFormAdd',{
	extend: 'Ext.form.Panel',
	alias: 'widget.vOrderFormAdd',
    requires :['App.form.combobox.cbTypePayment', ],
    bodyPadding: 5,
    fieldDefaults: {/*labelAlign: 'top',*/ msgTarget: 'side'},
    items: [{
        xtype: 'container', layout:'hbox',
        items:[{
            xtype: 'container', flex: 1, border:false, layout: 'anchor',
            defaults: {allowBlank : false, forceSelection: true},
            defaultType: 'textfield',
            items: [
            /*==========  Combobox Supplier  ==========*/
            { xtype:'cbSupplier' , name: 'supplier_id',value: (isDebug() ? randomInt() : null ) },
            /*==========  Contact Person  ==========*/
            { xtype: 'cbContactperson', name: 'cp_id',value: (isDebug() ? randomInt() : null ) },
            /*==========  Tax Type Order  ==========*/
            { xtype: 'cbtypeorder', fieldLabel: 'Type Order',value: (isDebug() ? randomInt() : null ),name: 'type_id' },
            { xtype: 'cbtypetax',fieldLabel: 'Type Tax Order',value: (isDebug() ? randomInt() : null ), forceSelection: true,name: 'ppn_id', },
            {
                 xtype: 'datefield', fieldLabel: 'Delivery At',value: (isDebug() ? randomInt() : null ),
                 name: 'delivery_at',submitFormat : 'Y-m-d', value: new Date(),
                 minValue: date_subtract(), maxValue : date_add(90),
                 anchor:'95%', emptyText: 'Select Delivery Date',
            },
            {
                 xtype: 'numberfield', fieldLabel: 'Credit Periode', name: 'credit', anchor:'95%',hideTrigger: true,
                 value:1, maxValue : 365, minValue : 1, emptyText: 'Credit Periode',value: (isDebug() ? randomInt(20) : null ),
            } ]
        },{
            xtype: 'container', flex: 1, layout: 'anchor', defaultType: 'combobox',
            defaults: {allowBlank : false, forceSelection: true },
            items: [
            { xtype: 'cbwarehouse', fieldLabel: 'Sent To Storage',value: (isDebug() ? randomInt() : null ),anchor:'95%',name: 'warehouse_id', },


/*==========  Type Payment  ==========*/
            { xtype: 'cbTypePayment', fieldLabel: 'Payment With',value: (isDebug() ? randomInt() : null ),name: 'paymenttype_id' },
            { xtype: 'cbcurrencies', name : 'curr_id',forceSelection: true,pageSize: 5 },

            {
                 xtype: 'numberfield', fieldLabel: 'Rate',value: (isDebug() ? randomInt(30) : null ),
                 forceSelection: true,name : 'kurs',
                 anchor:'95%',hideTrigger: true,
                 emptyText: 'Insert Rate',
                 value: 1,
                 minValue : 1,maxValue: 20,
            },

            ]
        }]
    }
    ],

    buttons: [{
        text: 'Save',
        action: 'save',
        itemId: 'save',
        iconCls: 'save',
    },{
        text: 'Cancel',itemId: 'cancel',
        action: 'cancel',
        iconCls: 'reset',
        handler: function() {
            this.up('form').getForm().reset();
        }
    }],
    initComponent: function(){
        this.callParent(arguments);
    }

});



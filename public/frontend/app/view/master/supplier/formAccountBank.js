Ext.define('App.view.master.supplier.formAccountBank',{
    extend: 'Ext.form.Panel',
    alias: 'widget.formAccountBank',
    layout: { type : 'vbox', align: 'stretch'},
    requires : [
    'App.form.combobox.cbTypeBank',
    'App.form.combobox.cbBank',
    ],
    bodyPadding : 10,
    defaults : {
    	allowBlank : false,
    	labelWidth : 150,
    },
    items: [
    {xtype: 'fieldset', title: translations.information , defaults : { anchor : '100%',allowBlank: false, forceSelection: isDebug() ? false : true }, items: [
//    	{ name : 'supplier_name' , fieldLabel : 'Name Supplier ', xtype : 'displayfield'},
    	{ name : 'name' , fieldLabel : 'Name Account', xtype : 'textfield', value: isDebug() ? randomText('Account Bank ',20) : null },
    	{ name : 'norek' , fieldLabel : 'Number Account', xtype : 'textfield',value: isDebug() ? '022-9000'+randomInt(900)+'-'+randomInt(10) : null },
    	{ name : 'type_id' , fieldLabel : 'Account Type', xtype : 'cbTypeBank',value: isDebug() ? randomInt(3) : null },
    	{ name : 'bank_id' , fieldLabel : 'Name Bank', xtype : 'cbBank' ,value: isDebug() ? randomInt(10) : null },

    	{ name: 'dimiliki_id', hidden: true, xtype: 'hiddenfield' },
    	{ name: 'id', hidden: true, xtype: 'hiddenfield' }
    ] }
    ],
    bbar: [
    	{ xtype : 'button', text: 'Help',iconCls : 'help', itemId : 'help' },'->',
    	{ xtype : 'button', text: 'Save',iconCls: 'close', itemId : 'save' },
    	{ xtype : 'button', text: 'Cancel', iconCls: 'cancel', itemId : 'cancel' }
    ]
});

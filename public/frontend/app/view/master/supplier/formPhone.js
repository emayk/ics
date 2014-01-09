Ext.define('App.view.master.supplier.formPhone',{
    extend: 'Ext.form.Panel',
    alias: 'widget.formPhone',
    layout: { type : 'vbox', align: 'stretch'},
    bodyPadding : 10,
    defaults : {
    	allowBlank : false,
    	labelWidth : 150,
    },
    items: [
    {xtype: 'fieldset', title: 'Information', defaults : { anchor : '100%',allowBlank: false, forceSelection: isDebug() ? false : true }, items: [
    	{ name : 'supplier_name' , fieldLabel : 'Name Supplier ', xtype : 'displayfield'},
    	// { name : 'telp' , fieldLabel : 'Phone Number', xtype : 'textfield'},
        {
            xtype: 'fieldcontainer',layout: 'hbox',
            fieldLabel: 'Phone',
            combineErrors: true,
            msgTarget: 'under',
            defaults: {
                hideLabel: true,
            },
            items: [
                {xtype: 'displayfield', value: '('},
                {xtype: 'textfield',  minLength : 3, maxLength: 4, fieldLabel: 'Phone 1', name: 'phone-1', width: 35, allowBlank: false},
                {xtype: 'displayfield', value: ')'},
                {xtype: 'textfield',   minLength : 3,maxLength: 4, fieldLabel: 'Phone 2', name: 'phone-2', width: 40, allowBlank: false, margins: '0 5 0 0'},
                {xtype: 'displayfield', value: '-'},
                {xtype: 'textfield',   minLength : 3,maxLength : 5, fieldLabel: 'Phone 3', name: 'phone-3', width: 45, allowBlank: false}
            ]
        },
        { name: 'parent_id', hidden: true, xtype: 'hiddenfield' },
        { name: 'parent_type', hidden: true, xtype: 'hiddenfield',value: 'Kantor' },
        { name: '_token', hidden: true, xtype: 'hiddenfield',value: gettoken() },
    	{ name: 'uid', hidden: true, xtype: 'hiddenfield',value: getIdLogin() },
    	{ name: 'id', hidden: true, xtype: 'hiddenfield' }
    ] }
    ],
    bbar: [

    	{ xtype : 'button', text: 'Help',iconCls : 'help', itemId : 'help' },'->',
    	{ xtype : 'button', text: 'Save',iconCls: 'close', itemId : 'save', formBind: true },
    	{ xtype : 'button', text: 'Cancel', iconCls: 'cancel', itemId : 'cancel' },
    ]
});

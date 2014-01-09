Ext.define('App.view.Orders.vOrderItemAddForm',{
	extend: 'Ext.form.Panel',
	alias: 'widget.vOrderItemAddForm',
	fieldDefaults: {labelAlign: 'top', msgTarget: 'side'},
	items: [
		{ xtype: 'textfield', fieldLabel : 'Product Name', name:'product_name', readOnly: true },
		{ xtype: 'hiddenfield', name:'order_id' },
		{ xtype: 'hiddenfield', name:'stock_id'},
		 { xtype: 'hiddenfield', name:'product_id'},
		{ xtype: 'numberfield', fieldLabel : 'Quantity',
            allowBlank : false, minValue: 1, maxValue : 100 ,
            name:'qty',hideTrigger: true
        },
	],
	dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'bottom',
            items: [
		            '->',
                {
                    xtype: 'button',
                    text: 'Add',
                    itemId: 'add',
                    disabled:  true,
                    iconCls: 'add',
                    formBind : true,
                }
            ]
        }
    ]
});



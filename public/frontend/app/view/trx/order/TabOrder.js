Ext.define('App.view.trx.order.TabOrder',{
	extend : 'Ext.panel.Panel',
	title: 'List Order\'s',
	alias: 'widget.tabOrder',
    requires : [
        // 'App.form.order.AddOrder', //formAddOrder
        // test
        'App.view.master.office.ListHead',
        'App.view.trx.order.ListClose'
    ],
 	layout : 'fit',
    // id: 'idTabOrder',
 	items  : [
/*==========  Kolom Kiri  ==========*/

	 {
        xtype: 'container',
        title: 'Order',
        width: '100%',
		layout: {
			type: 'hbox',
			align: 'stretch'
		},
        items: [
        {
            xtype : 'container',
            flex: .5,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    flex:4, xtype  : 'tabpanel',
                    items: [
                               {
                                    title: 'Order > Open',
                                    layout : 'fit',
                                    items: [{
                                        xtype : 'gridOrderOpen',
                                    }]
                               },
                               {
                                    title: 'Order > Close',
                                    xtype : 'container',
                                    layout : 'fit',
                                    items: [{ xtype: 'gridOrderClose' } ]
                               }
                           ]
                } ,
                {
                    title : 'Order Item ',
                    flex : 4,
                    xtype : 'gridOrderItems'
                }
            ]
        },

/*==========  Colomn Kanan  ==========*/

        {
            xtype : 'container',
            flex: .5,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                    flex:4,
                    xtype  : 'tabpanel',
                    items: [
                    {
                        title : ' List Product',
                        layout : 'fit',
                        items : [
                            {
                                xtype : 'gridOrderStockProducts',
                                title: 'Stock Product tersedia di Order',
                            }
                        ]
                    },

                    {
                        title : 'New Invoice',
                        items : [
                            {
                                xtype : 'container',
                                layout : {
                                    type : 'fit',
                                    align : 'stretch'
                                },
                                items: [{xtype : 'formAddOrder'}],
                                flex : 2,
                            },
                        ]
                    }
                    ]
            }]
        }
        ],
    }

 	],

 	initComponent: function () {
 		this.callParent(arguments);
 	}
});
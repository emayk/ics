// Belum dipakai

Ext.define('App.view.trx.order.TabKain',{
	extend : 'Ext.panel.Panel',
	title: 'Kain',
	alias: 'widget.tabOrderKain',
    // requires : [
    // ],
 	layout : 'fit',
 	items  : [
/*==========  Kolom Kiri  ==========*/
        
	 {
        xtype: 'container',
        title: 'Order',
        width: '100%',
		// layout: {
		// 	type: 'hbox',
		// 	align: 'stretch'
		// },
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
                        flex:4,
                       xtype  : 'tabpanel',
                       items: [
                               {
                                    title: 'Kain',
                                    layout : 'fit',
                                    items: [{
                                        // xtype : 'gridOrderOpen',
                                        html : 'Kain Tab'
                                    }]
                               },
                               {
                                    title: 'General',
                                    xtype : 'container',
                                    layout : 'fit',
                                    items: [{ 
                                        // xtype: 'gridOrderClose' 
                                        html : 'General Tab',
                                    } ]
                               }
                       ]
                } ,
                
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
                                title: 'Product Available to Order',
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
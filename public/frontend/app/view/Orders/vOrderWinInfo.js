/**
*
* View Orders
*
* Programmer By Emay Komarudin.
* 2013
*
* Menampilkan Info Order
*
**/
var orderNo = Ext.Number.randomInt(1,100);
Ext.define('App.view.Orders.vOrderWinInfo', {
    extend: 'Ext.window.Window',
    alias: 'widget.vOrderWinInfo',

    height: 500,
    width: 550,

    requires: [
        'App.util.Util',
        'App.view.Orders.vOrderListAll',
    ],
    layout: 'fit',
    title: 'Detail Order',
    items: [
		    { xtype: 'panel',layout: { type: 'vbox' ,align: 'stretch'}, items: [
		    	{ xtype: 'panel', flex : .3, layout: 'hbox', bodyPadding: 5, items: [
		    			{ xtype: 'form', flex: .7,border: false,bodyPadding: 5,
		    					/*==============================================
		    					=            Form Order Information            =
		    					==============================================*/
		    					items: [
						    						{
									            xtype: 'fieldset',
									            flex: 2,
									            title: 'Information Order ' ,
									            defaults: {
									                anchor: '100%',
									                xtype: 'textfield',
									                allowBlank: true,
									                labelWidth: 100,
									                readOnly : true,
									            },
									            items: [
									                {
									                    xtype: 'hiddenfield',
									                    fieldLabel: 'Label',
									                    name: 'id'
									                },
									                {
									                    fieldLabel: e('order_type'),
									                    name: 'type'
									                },
									                {
									                    fieldLabel: e('supplier_name'),
									                    maxLength: 100,
									                    name: 'supplier'
									                },
									                {
									                	fieldLabel : e('order_status'),
									                	maxLength: 100,
									                	name : 'status_name',
									                }
									            ]
									        },
							    					]


		    					/*-----  End of Form Order Information  ------*/


			    		},
							{
							    xtype: 'fieldset',
							    title: e('picture'),
							    width: 200,
			            layout: 'fit',
							    items: [
							        {
							            xtype: 'image',
							            bodyPadding: 5,
							            itemId: 'imageproduct',
							            height: 100,
							            frame: true,
							            width: 150,
							            margin: '0 0 10 0',
							            src: picture_na()
							        }
							    ]
							}
		    	] },
			    	{ xtype: 'vOrderItemInfoGrid',flex	: .7, title: 'Order Items' }
		    ]}
    ],

dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'bottom',
            items: [
                {
                    xtype: 'button',
                    text: 'Help',
                    itemId: 'help',
                    iconCls: 'help',
                },
                {
                    xtype: 'button',
                    text: 'Print',
                    itemId: 'print',
                    iconCls: 'print'
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Revisi Order',
                    itemId: 'edit',
                    iconCls: 'edit'
                },
                {
                    xtype: 'button',
                    text: 'Close',
                    itemId: 'close',
                    iconCls: 'close',
                    // action: 'close',
                    handler: function  (btn) {
                    	 btn.up('window').close();
                    }
                },
            ]
        }
    ]
});
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
Ext.define('App.view.Orders.vOrderWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.vOrderWin2',
    requires: [
    'App.view.Orders.vOrderFormAdd',
    'App.view.Orders.vOrderNewItemsList',
    ],
	layout: { type : 'vbox' ,align: 'stretch' } ,
	initComponent: function(){
		var me = this;
		Ext.apply(me,{
			height: 600,
			width: 550,
			title: 'Add Order\'s',
			items: [
				{ xtype : 'vOrderFormAdd', itemId : 'formOrder', flex: .45, layout: 'fit', bodyPadding: 10,frame: false },
				{ xtype : 'panel', bodyPadding: 10,  itemId: 'panelFormOrderItem' ,/*disabled : true,*/
					flex: .55 , layout: { type: 'card', align: 'stretch'},
					items : [
						{xtype: 'container', html: 'Silahkan Input Form Diatas', itemId:'welcome'},
						{ xtype: 'panel', title: 'Order Items ',layout: { type: 'hbox', align: 'stretch'}, itemId:'pageitem', items:[
							{xtype:'tabpanel',flex : .6, activeTab: 0, defaults:{height: 200, frame: false, },
								items:[
									{ xtype : 'vOrderNewItemsList', title: 'Order Items',autoScroll: true },
									{ xtype : 'vStockProducts', title: 'Stock Product', autoScroll: true },
								]
							},
							{ xtype: 'vOrderItemAddForm', itemId: 'formOrderItem', flex: .4, bodyPadding: 10}
						] }
					] },
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
							iconCls: 'help'
						},
						'->',
						{
							xtype: 'button',
							text: 'Close',
							itemId: 'close',
							iconCls: 'close'
						},
					]
				}
			]
		});
		me.callParent(arguments);
	},



});
/**
*
* View transaction
*
* Programmer By Emay Komarudin.
* 2013
*
* Description View  transaction
*
*
**/


Ext.define('App.view.transaction.trx.order.List', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.vpanelTrxOrderList',
    iconCls: 'home',
    layout: { type: 'vbox', align: 'stretch' },
    // padding : 5,
    items:[
/*==========  Grid List Order  ==========*/
        	{ xtype: 'grid',  flex: 2,title : 'List Orders [TRX-NO]',itemId: 'gridOrders',padding: 2,
        	store : 'App.store.transaction.sListOrders',
	        		columns:[
	        			{ xtype: 'rownumberer'},
	        			{ header: 'Username', dataIndex : 'user_name', flex: 1},
	        			{ header: 'Order Number', dataIndex : 'order_no', flex: 1},
	        			{ header: 'Count Items', dataIndex : 'count_items', flex: 1},
	        			{ header: 'Status', dataIndex : 'status', flex: 1},
	        		],
							 dockedItems : [
							 { xtype: 'pagingtoolbar', store : 'App.store.transaction.sListOrders', dock: 'bottom'}
							 ],
							selModel: 'rowmodel',
							multiSelect: true,
	        	},
	        	/*Agree Order Grid*/
	        	{ xtype: 'grid',  flex: 2,title : 'List Items Order [ ORDER NO ]',itemId: 'items',
		        	store : 'App.store.transaction.sListItemsOrder',
	        		columns:[
	        			{ xtype: 'rownumberer'},
	        			{ header: 'Name Product', dataIndex: 'product_name' ,flex: 2},
	        			{ header: 'Code Product', dataIndex: 'product_code' },
	        			{ header: 'Qty', dataIndex: 'qty' },
	        			{ header: 'Price', dataIndex: 'price' ,renderer: formatCurrency},
	        			{ header: 'Subtotal', dataIndex: 'subtotal', renderer: formatCurrency },
	        			{ header: 'Status', dataIndex: 'status' },
	        		],
 							selModel: 'rowmodel',
							multiSelect: true,
							dockedItems : [
							 { xtype: 'pagingtoolbar', store : 'App.store.transaction.sListOrders', dock: 'bottom'}
							 ],
	        	},
        ]
});
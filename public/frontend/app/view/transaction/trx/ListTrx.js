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

Ext.define('App.view.transaction.trx.ListTrx', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.vpanelTrxList',
    iconCls: 'home',
    layout : 'border',
    items: [
        {xtype: 'container',
	        region : 'center' , flex: 8,layout: { type: 'vbox', align: 'stretch' },
        items:[
/*==========  Grid Transaction  ==========*/
        	{ xtype: 'grid',  flex: 2,title : 'List Transaksi Order',itemId: 'gridTrx',padding: 2,
        	store : 'App.store.transaction.sListTrx',
	        		columns:[
	        			{ xtype: 'rownumberer'},
	        			{ header: 'Transaction Number', dataIndex : 'trx_no', flex: 1},
	        			{ header: 'Username', dataIndex : 'user_name', flex: 1},
	        			{ header: 'Status', dataIndex : 'status', flex: 1},
	        			{ header: 'Count Order', dataIndex : 'count_orders', flex: 1},
	        			{ header: 'Count Items', dataIndex : 'count_items', flex: 1}
	        		],
							 dockedItems : [
							 { xtype: 'pagingtoolbar', store : 'App.store.transaction.sListTrx', dock: 'bottom'}
							 ],
							selModel: 'rowmodel',
							multiSelect: true
	        	},

        	{ xtype: 'container' , flex: 2,
                layout: { type: 'hbox', align : 'stretch'},
                defaults: { padding: 2},
                bodyPadding :10, items: [
/*==========  Grid Agree  ==========*/
	        	/*Agree Order Grid*/
	        	{ xtype: 'grid',  flex: 2,title : 'List Agree Order',itemId: 'agree',
		        	store : 'App.store.transaction.sTrxAgree',
	        		columns:[
	        			{ xtype: 'rownumberer'},
	        			{ header: 'Order No', dataIndex: 'order_no' },
	        			{ header: 'Transaction', dataIndex: 'trx_no' },
	        			{ header: 'Items', dataIndex: 'count_items' },
	        			{ header: 'Print', dataIndex: 'isprinted',
	        			renderer : function  (v) {
	        				return (v==true) ? 'Unprint' : ''
	        			}
	        			 }
	        		],
 							selModel: 'rowmodel',
							multiSelect: true
	        	},

/*==========  Grid Decline  ==========*/
	        	/*Grip Decline*/
	        	{ xtype: 'grid',  flex: 2,title : 'List Decline Order',itemId: 'decline',
		        	store : 'App.store.transaction.sTrxDecline',
	        		columns:[
	        			{ xtype: 'rownumberer'},
	        			{ header: 'Order No', dataIndex: 'order_no' },
	        			{ header: 'Transaction', dataIndex: 'trx_no' },
	        			{ header: 'Items', dataIndex: 'count_items' }
	        		],
 							selModel: 'rowmodel',
							multiSelect: true
	        	}
        	]}
        ]}
    ]
});
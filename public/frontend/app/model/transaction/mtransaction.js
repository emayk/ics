/**
*
* Model transaction
*
* Programmer By Emay Komarudin.
* 2013
*
*
**/
Ext.define('App.model.transaction.mtransaction',{
	extend : 'Ext.data.Model',
           uses: ['App.model.transaction.mOrders'],
           fields: ['createby', 'created_at', 'doc', 'id', 'parent_id', 'parent_type', 'updateby', 'updated_at' ],
	// proxy: {
	// 		type: 'ajax',
	// 		url: getApiUrl() +'/transaction/list',
	// 		reader: {
	// 			type: 'json',
	// 			root: 'results',
	// 			// totalProperty: 'total'
	// 		},
	// 	},
});
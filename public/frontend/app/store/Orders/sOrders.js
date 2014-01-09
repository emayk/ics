/**
*
* Store Orders
*
* Programmer By Emay Komarudin.
* 2013
*
*
**/

Ext.define('App.store.Orders.sOrders',{
	extend : 'Ext.data.Store',
	model : 'App.model.Orders.mOrders',
   pageSize: 3,
// proxy: {
// 		type: 'rest',
// 		url: api_url +'/orders',
// 		reader: {
// 			type: 'json',
// 			root: 'results',
// 			totalProperty: 'total'
// 		},
// 	},

})

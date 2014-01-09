/**
*
* Store Orders
*
* Programmer By Emay Komarudin.
* 2013
*
*
**/

Ext.define('App.store.Orders.sOrderItems',{
	extend : 'Ext.data.Store',
	model : 'App.model.Orders.mItems',
     // data : App.util.dummy.data_order,
	pageSize: 7,
	proxy: {
		type: 'rest',
		url: api_url +'/orderitems',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
	},

})

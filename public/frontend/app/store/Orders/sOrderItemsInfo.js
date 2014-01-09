/**
*
* Store Orders
*
* Programmer By Emay Komarudin.
* 2013
*
*
**/

Ext.define('App.store.Orders.sOrderItemsInfo',{
	extend : 'Ext.data.Store',
	model : 'App.model.Orders.mItems',
	proxy: {
		type: 'rest',
		url: api_url +'/orderitems',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
	},

});



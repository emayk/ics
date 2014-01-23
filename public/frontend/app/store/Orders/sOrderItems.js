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
	pageSize: 10,
	proxy: {
		type: 'rest',
		url: getApiUrl() +'/transorderdetails',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}

})

/**
*
* Store Orders
*
* Programmer By Emay Komarudin.
* 2013
*
*
**/

Ext.define('App.store.Orders.sStockProducts',{
	extend : 'Ext.data.Store',
	model : 'App.model.Orders.mStockProduct',
	pageSize: 7,
	proxy: {
		type: 'rest',
		url: getApiUrl() +'/stockproducts',
		// url: api_url +'/product',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
		// extraParams: { status : 'open' },
	}


})

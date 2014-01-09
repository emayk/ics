/**
*
* Store Orders
*
* Programmer By Emay Komarudin.
* 2013
*
*
**/

Ext.define('App.store.Orders.sCurrency',{
	extend : 'Ext.data.Store',
	model : 'App.model.Orders.mCurrency',
	proxy: {
		type: 'rest',
		url: api_url +'/currency',
		reader: {
			type: 'json',
			root: 'results',
			successProperty: 'success',
			totalProperty: 'total'
		}
	},
});
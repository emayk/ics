/**
*
* Store Orders
*
* Programmer By Emay Komarudin.
* 2013
*
*
**/

Ext.define('App.store.Orders.sOrdersClose',{
	extend : 'Ext.data.Store',

	model : 'App.model.Orders.mOrders',

	proxy: {
		type: 'rest',
		url: getApiUrl() +'/transorders',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
		extraParams: { status : 'close' },
	},


})

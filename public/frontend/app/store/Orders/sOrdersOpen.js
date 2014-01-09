/**
*
* Store Orders
*
* Programmer By Emay Komarudin.
* 2013
*
*
**/

Ext.define('App.store.Orders.sOrdersOpen',{
	extend : 'Ext.data.Store',

	model : 'App.model.Orders.mOrders',
    //
     // fields: [ 'id', 'name'],
     // pageSize: 8,
     // data : App.util.dummy.data_order,

	proxy: {
		type: 'rest',
		url: api_url +'/orders',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
		extraParams: { status : 'open' },
	},


})

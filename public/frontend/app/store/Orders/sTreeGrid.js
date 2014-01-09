/**
*
* Store Orders
*
* Programmer By Emay Komarudin.
* 2013
*
*
**/

Ext.define('App.store.Orders.sTreeGrid',{
	extend : 'Ext.data.TreeStore',
	model : 'App.model.Orders.mTreeGrid',

	proxy: {
		type: 'ajax',
		url: api_url +'/ordertg',
		reader: {
			type: 'json',
			// root: 'results',
			// totalProperty: 'total'
		},
	},

})

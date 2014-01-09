

Ext.define('App.store.Orders.wizard.sProductSelected',{
	extend : 'Ext.data.ArrayStore',
	model : 'App.model.Orders.wizard.mProductSelected',

	pageSize: 10,
	proxy: {
			type: 'memory',
		// 	url: api_url +'/product',
		// reader: {
		// 	type: 'json',
		// 	root: 'results',
		// 	totalProperty: 'total'
		// },

	},

});

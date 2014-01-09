Ext.define('App.store.Orders.wizard.supplier',{
	extend : 'Ext.data.Store',
	requires: [
	'App.model.Orders.wizard.supplier'
	],
	model: 'App.model.Orders.wizard.supplier',
	  proxy: {
		type: 'rest',
		url: getApiUrl() +'/supplier',
		reader: {
			type: 'json',
			root: 'data',
			totalProperty: 'total'
		},
	},
});
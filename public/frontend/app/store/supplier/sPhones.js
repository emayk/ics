/**
*
* Store Master Phones
*
**/

Ext.define('App.store.supplier.sPhones',{
	extend : 'Ext.data.Store',

	model : 'App.model.supplier.mPhone',
	pageSize: 30,
     proxy: {
		type: 'rest',
		url: api_url +'/supplier_phones',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},

	},

})
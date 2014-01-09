/**
*
* Store Master Phones
*
**/

Ext.define('App.store.supplier.sOffices',{
	extend : 'Ext.data.Store',

	model : 'App.model.supplier.mOffice',
	// pageSize: 30,
     proxy: {
		type: 'rest',
		url: api_url +'/supplier_offices',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},

	},

})
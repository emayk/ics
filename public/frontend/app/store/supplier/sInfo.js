/**
*
* Store Master Supplier
*
**/

Ext.define('App.store.supplier.sSuppliers',{
	extend : 'Ext.data.Store',

	model : 'App.model.supplier.mSupplier',
	pageSize: 30,
     proxy: {
		type: 'rest',
		url: api_url +'/supplier',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
        extraParams : {
            'info' : true
        }

	},

})
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
		url: getApiUrl() +'/suppliers',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}

})
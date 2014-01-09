/**
*
* Store Master Product Details
*
**/

Ext.define('App.store.product.stProdDetails',{
	extend : 'Ext.data.Store',

	model : 'App.model.product.mdProdDetails',
	pageSize: 30,
     proxy: {
		type: 'rest',
		url: getApiUrl() +'/productdetails',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}
})
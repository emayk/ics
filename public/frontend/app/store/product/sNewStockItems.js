/**
*
* Store Master Product Details
*
**/

Ext.define('App.store.product.sNewStockItems',{
	extend : 'Ext.data.Store',
	pageSize: 30,
	model : 'App.model.product.mNewStockItems',
	// pageSize: 30,
     proxy: {
		type: 'rest',
		url: api_url +'/stock_prod_detail',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
        // extraParams : {
        //     'stockId' : 1
        // }

	},

})
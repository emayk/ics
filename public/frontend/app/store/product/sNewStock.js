/**
*
* Store Master Product New Stock
*
**/

Ext.define('App.store.product.sNewStock',{
	extend : 'Ext.data.Store',
	model: 'App.model.product.mNewStock',
	// groupField: 'location',
	// groupField: 'rollnumber',
	proxy: {
		type: 'rest',
		url: api_url +'/stockprod',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
	}
});
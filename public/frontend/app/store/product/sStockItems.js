/**
*
* Store Master Product Details
*
**/

Ext.define('App.store.product.sStockItems',{
	extend : 'Ext.data.Store',
	fields: [
			'id',
			'stock_id',
			'refdoc',
			'noroll',
			'qty_in',
			'qty_out',
			'qty_balance',
			'uuid',
			'createby_id',
			'lastupdateby_id',
			'created_at',
			'updated_at'
	],
	pageSize: 30,
     proxy: {
		type: 'rest',
		url: getApiUrl() +'/stockproducthistory',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}

})
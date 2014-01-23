/**
 *
 * Model Orders
 *
 * Programmer By Emay Komarudin.
 * 2013
 *
 *
 **/
Ext.define('App.model.Orders.mItems', {
	extend: 'Ext.data.Model',
	fields: [
		'createby_id', 'created_at', 'id', 'info', 'lastupdateby_id', 'order_id', 'price', 'qty', 'stock_id', 'updated_at', 'uuid',
		'productname', 'productimg'
//		{ name: 'productname', mapping: 'stock.product.name' },
//		{ name: 'product_img', mapping: 'stock.product.picture.url' }
	],
	proxy: {
		type: 'rest',
		url: getApiUrl() + '/transorderdetails',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}


});
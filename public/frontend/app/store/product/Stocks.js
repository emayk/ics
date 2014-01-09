/**
*
* Store Stock Product
*
**/

Ext.define('App.store.product.Stocks',{
	extend : 'Ext.data.Store',
	// model : 'App.model.product.Stock',
	fields: [
'id',
'tipelokasi_id',
'product_id',
'rollnumber',
'lokasigudang_id',
'detail_id',
'panjangkain',
'onday',
'satuan_id',
'hargabeli',
'uuid',
'createby_id',
'lastupdateby_id',
{	name : 'created_at', mapping: 'created_at.date'}

	],
	pageSize: 30,
     proxy: {
		type: 'rest',
		url: getApiUrl() +'/stockproducts',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}
})
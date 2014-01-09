Ext.define('App.store.Orders.wizard.warehouse',{
	extend : 'Ext.data.Store',
	fields: [
		'id',
		'name',
		'alamat',
		'kota_id',
		'kategori_id',
		'kepalagudang_id',
		'active',
		'uuid',
		'createby_id',
		'lastupdateby_id',
		'created_at',
		'updated_at',
	],
	proxy: {
	type: 'rest',
	url: getApiUrl() + '/wh',
	reader: {
		type: 'json',
		root: 'results',
		totalProperty: 'total'
		}
	}

});
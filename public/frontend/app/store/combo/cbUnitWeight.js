Ext.define('App.store.combo.cbUnitWeight',{
	extend: 'Ext.data.Store',
	fields: [ 'id','name' ],
    autoload: true,
    proxy: {
		type: 'rest',
		url: getApiUrl() +'/units',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
		extraParams: {
			'cbreq' : true,
			'type' : 4 // 1 = Lainnya , 2 = lebar , 3 = Panjang,4 = berat,5 = tinggi
		}
	}
});
Ext.define('App.store.combo.cbUnitWidth',{
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
			'cb' : true,
			'type' : 2 // 1 = Lainnya , 2 = lebar , 3 = Panjang,4 = berat,5 = tinggi
		}
	}
});
/**
*
* Store Combox Box Category Product
*
**/

Ext.define('App.store.combo.cbUnitHeight',{
	extend: 'Ext.data.Store',
	fields: [ 'id','name' ],
    proxy: {
		type: 'rest',
		url: api_url +'/unit',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
		extraParams: {
			'cbreq' : true,
			'type' : 5 // 1 = Lainnya , 2 = lebar , 3 = Panjang,4 = berat,5 = tinggi
		},
	}
});

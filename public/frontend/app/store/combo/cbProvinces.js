// listcity
Ext.define('App.store.combo.cbProvinces',{
	extend: 'Ext.data.Store',
	// autoLoad : true,
	fields: [ 'id','name' ],
    proxy: {
		type: 'ajax',
		url: api_url +'/find/listprovince',
		reader: {
			type: 'json',
			root: 'data',
			totalProperty: 'total'
		},
		extraParams: {
		'cbreq' : true,'level' : 2
		},
	}
});


Ext.define('App.store.combo.cbCities',{
	extend: 'Ext.data.Store',
	fields: [ 'id','name' ],
    proxy: {
		type: 'rest',
		url: getApiUrl() +'/locations',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
		extraParams: {
            'cbreq' : true,
            'level' : 3
		}
	}
});

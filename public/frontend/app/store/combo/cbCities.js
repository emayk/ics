
Ext.define('App.store.combo.cbCities',{
	extend: 'Ext.data.Store',
	fields: [ 'id','name' ],
    proxy: {
		type: 'rest',
		url: getApiUrl() +'/countries',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
		extraParams: {
		    'cb' : true,
		    'level' : 3
		}
	}
});

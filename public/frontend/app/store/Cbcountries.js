Ext.define('App.store.Cbcountries',{
	extend: 'Ext.data.Store',
	fields: [ 'id','name' ],
    proxy: {
		type: 'rest',
		url: getApiUrl() +'/countries',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}
});

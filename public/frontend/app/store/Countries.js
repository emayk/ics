Ext.define('App.store.Countries',{
	extend: 'Ext.data.Store',
	model: 'App.model.Country',
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

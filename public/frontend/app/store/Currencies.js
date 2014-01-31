Ext.define('App.store.Currencies',{
	extend: 'Ext.data.Store',
	model: 'App.model.Currency',
	proxy: {
		type: 'rest',
		url: getApiUrl() + '/currencies',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}

});
Ext.define('App.store.Legalitas',{
	extend : 'Ext.data.Store',
	model: 'App.model.Legality',
	proxy: {
		type: 'rest',
		url: getApiUrl() +'/legality',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}
});

 

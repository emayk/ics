Ext.define('App.store.unit.Allunit',{
	extend: 'Ext.data.Store',
	model : 'App.model.unit.allUnit',
	proxy: {
		type: 'rest',
		url: getApiUrl() +'/units',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
			}
		}
});
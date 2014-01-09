Ext.define('App.store.Status',{
	extend: 'Ext.data.Store',
	model: 'App.model.Status',
	proxy: {
		type: 'rest',
		url: api_url +'/status',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}
});
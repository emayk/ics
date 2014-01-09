Ext.define('App.store.cbProvinces',{
	extend: 'Ext.data.Store',
	fields: [ 'id','name' ],
    proxy: {
		type: 'rest',
		url: api_url +'/province',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}
});

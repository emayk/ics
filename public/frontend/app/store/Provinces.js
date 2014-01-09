Ext.define('App.store.Provinces',{
	extend: 'Ext.data.Store',
	model: 'App.model.Province',
	idStore : 'storeIdProvinces',
    // autoload: true,
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

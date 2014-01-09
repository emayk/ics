Ext.define('App.store.Cities',{
	extend: 'Ext.data.Store',
	model: 'App.model.City',
	idStore : 'storeIdCities',
    // autoload: true,
    proxy: {
		type: 'rest',
		url: api_url +'/city',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}
});

Ext.define('App.store.Headoffices',{
	extend: 'Ext.data.Store',
	model: 'App.model.Headoffice',
	// idStore : 'storeIdHeadoffice',
    autosync: true,
    autoload: true,
    // groupField: 'tipe',
    proxy: {
		type: 'rest',
		url: api_url +'/headoffice',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}
});

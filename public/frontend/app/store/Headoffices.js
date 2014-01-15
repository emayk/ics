Ext.define('App.store.Headoffices',{
	extend: 'Ext.data.Store',
	model: 'App.model.Headoffice',
    autosync: true,
    // groupField: 'tipe',
    proxy: {
		type: 'rest',
		url: getApiUrl() +'/offices',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}
});

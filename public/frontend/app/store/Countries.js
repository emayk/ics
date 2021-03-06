Ext.define('App.store.Countries',{
	extend: 'Ext.data.Store',
	model: 'App.model.Country',
	pageSize: 30,
    proxy: {
		type: 'rest',
		url: getApiUrl() +'/locations',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
        extraParams:{
            'type' : 'country',
            'parentId': 0
        }
	}
});

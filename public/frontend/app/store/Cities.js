/**
 * Model City
 */
Ext.define('App.store.Cities',{
	extend: 'Ext.data.Store',
	model: 'App.model.City',
    autoSync: true,
    proxy: {
		type: 'rest',
        url: getApiUrl() +'/locations',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
        extraParams:{
            'type' : 'city'
        }
	}
});

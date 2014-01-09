Ext.define('App.store.CitiesByPid',{
	extend: 'Ext.data.Store',
	fields: [ 'id','name' ],
    proxy: {
		type: 'ajax',
		url: api_url +'/find/listcity',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
		extraParams: {
		'uid' : 0
		},
	}
});

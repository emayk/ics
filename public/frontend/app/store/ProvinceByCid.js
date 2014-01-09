Ext.define('App.store.ProvinceByCid',{
	extend: 'Ext.data.Store',
	fields: [ 'id','name' ],
	// autoload : true,

	byId : 0,
    proxy: {
		type: 'ajax',
		url: api_url +'/find/listprovince',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
		extraParams: {
		'id' : 0
		},
	}
});

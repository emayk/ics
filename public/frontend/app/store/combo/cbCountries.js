// listcity
Ext.define('App.store.combo.cbCountries',{
	extend: 'Ext.data.Store',
	// autoLoad : true,
	fields: [ 'id','name' ],
    proxy: {
		type: 'ajax',
		url: api_url +'/list/country',
		reader: {
			type: 'json',
			root: 'data',
			totalProperty: 'total'
		},
		extraParams: {
		'cbreq' : true,'level' : 1
		},

	}
});

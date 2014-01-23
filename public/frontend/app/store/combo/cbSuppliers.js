Ext.define('App.store.combo.cbSuppliers',{
	extend: 'Ext.data.Store',
	fields: [ 'id','name' ],
    proxy: {
		type: 'rest',
		url: getApiUrl() +'/suppliers',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
		extraParams: {
			'cb' : true
		}
	}
});

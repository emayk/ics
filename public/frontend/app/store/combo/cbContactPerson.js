Ext.define('App.store.combo.cbContactPerson',{
	extend: 'Ext.data.Store',
	fields: [ 'id','name' ],
    proxy: {
		type: 'ajax',
		url: getApiUrl() +'/contactperson',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
		extraParams: {
			'cbreq' : true
		}
	}
});

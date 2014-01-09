// cbreq

// listcity
Ext.define('App.store.combo.cbContactPerson',{
	extend: 'Ext.data.Store',
	fields: [ 'id','name' ],
	pageSize : 5,
    proxy: {
		type: 'ajax',
		url: api_url +'/contact',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
		extraParams: {
			'cbreq' : true
		},
	}
});

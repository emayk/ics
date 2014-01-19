/**
*
* Store Combox Box Bank
*
**/

Ext.define('App.store.combo.cbTypeBank',{
	extend: 'Ext.data.Store',
	fields: [ 'id','name' ],
    proxy: {
		type: 'ajax',
		url: getApiUrl() +'/bankaccounttype',
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


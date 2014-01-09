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
		url: api_url +'/type_bank',
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


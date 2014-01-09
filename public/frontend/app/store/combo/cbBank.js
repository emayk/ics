/**
*
* Store Combox Box Bank
*
**/

Ext.define('App.store.combo.cbBank',{
	extend: 'Ext.data.Store',
	fields: [ 'id','name' ],
    proxy: {
		type: 'ajax',
		url: api_url +'/bank',
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


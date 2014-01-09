/**
*
* Store
**/

Ext.define('App.store.combo.cbTypeTax',{
	extend: 'Ext.data.Store',
	fields: [ 'id','name' ],
    proxy: {
		type: 'rest',
		url: api_url +'/type_tax',
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

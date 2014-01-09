/**
*
* Type Supplier or Buyer
*
**/

Ext.define('App.store.combo.cbStatus',{
	extend: 'Ext.data.Store',
	fields: [ 'id','name' ],
    proxy: {
		type: 'rest',
		url: api_url +'/status',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
		extraParams: {
		'cbreq' : true,'level' : 1
		},

	}
});

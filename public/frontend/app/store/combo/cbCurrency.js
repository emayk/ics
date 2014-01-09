/**
*
* Store Combox Box Currency
*
**/

Ext.define('App.store.combo.cbCurrency',{
	extend: 'Ext.data.Store',
	fields: [ 'id','name' ],
    proxy: {
		type: 'rest',
		url: getApiUrl() +'/currencies',
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

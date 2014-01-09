/**
*
* Store Combox Box Category Product
*
**/

Ext.define('App.store.combo.cbTypeProduct',{
	extend: 'Ext.data.Store',
	fields: [ 'id','name' ],
    proxy: {
		type: 'rest',
		url: getApiUrl() +'/producttype',
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

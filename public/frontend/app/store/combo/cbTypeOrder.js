/**
*
* Store Combox Box Type Payment
*
**/

Ext.define('App.store.combo.cbTypeOrder',{
	extend: 'Ext.data.Store',
	fields: [ 'id','name' ],
    proxy: {
		type: 'rest',
		url: api_url +'/typeorder',
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

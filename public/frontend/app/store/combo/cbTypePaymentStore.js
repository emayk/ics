/**
*
* Store Combox Box Type Payment
*
**/

Ext.define('App.store.combo.cbTypePaymentStore',{
	extend: 'Ext.data.Store',
	fields: [ 'id','name' ],
    proxy: {
		type: 'rest',
		url: getApiUrl() +'/paymenttype',
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

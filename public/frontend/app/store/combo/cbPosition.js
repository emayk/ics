/**
*
* Store Combox Box
*
**/

Ext.define('App.store.combo.cbPosition',{
	extend: 'Ext.data.Store',
	fields: [ 'id','name' ],
    proxy: {
		type: 'ajax',
		url: api_url +'/position',
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

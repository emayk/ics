/**
*
* Store Combox Box Category Product
*
**/

Ext.define('App.store.combo.cbUnitType',{
	extend: 'Ext.data.Store',
	fields: [ 'id','name' ],
	
    proxy: {
		type: 'rest',
		url: api_url +'/unittype',
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

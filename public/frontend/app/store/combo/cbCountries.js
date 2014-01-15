/**
 *
 * Store Combo Countries
 *
 */
Ext.define('App.store.combo.cbCountries',{
	extend: 'Ext.data.Store',
	fields: [ 'id','name' ],
    pageSize: 10,
    proxy: {
		type: 'ajax',
        url: getApiUrl() +'/locations',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
		extraParams: {
		'cbreq' : true,
        'level' : 1
		}
	}
});

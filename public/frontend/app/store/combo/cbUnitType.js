/**
 *
 * Store Combox Box Type Unit
 *
 **/

Ext.define('App.store.combo.cbUnitType', {
	extend: 'Ext.data.Store',
	fields: [ 'id', 'name' ],

	proxy: {
		type: 'rest',
		url: getApiUrl() + '/unittypes',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
		extraParams: {
			'cbreq': true
		}
	}
});

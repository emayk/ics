Ext.define('App.model.unit.allUnit', {
	extend: 'Ext.data.Model',
	fields: [
		'id',
		'name',
		'info',
		'uuid',
		'type_id',
		'typename'
	],
	proxy: {
		type: 'rest',
		url: getApiUrl() +'/units',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}
});


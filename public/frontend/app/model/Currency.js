Ext.define('App.model.Currency', {
	extend: 'Ext.data.Model',
	fields: [
		'id',
		'name',
		{ name: 'shortname', type: 'string'},
		'country_id',

		{ name: 'country', mapping: 'country.name'},

		'uuid'
	],

	validations: [
		{
			type: 'length',
			field: 'name',
			min: 2
		}

	],
	proxy: {
		type: 'rest',
		url: getApiUrl() + '/currencies',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}
});

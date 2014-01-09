Ext.define('App.model.Color',{
	extend: 'Ext.data.Model',
	fields:[
	'id',
	'name',
		{
			name : 'info',
			type: 'string'

		},
		'uuid',
		'createby_id',
		'lastupdateby_id',
		'created_at',
		'updated_at'

	],
	 validations: [{
        type: 'length',
        field: 'name',
        min: 5
    	}],

	proxy: {
	type: 'rest',
	url: getApiUrl() + '/colors',
	reader: {
		type: 'json',
		root: 'results',
		totalProperty: 'total'
		}
	}
});
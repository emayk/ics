Ext.define('App.model.TypeOrder',{
	extend: 'Ext.data.Model',
	fields:[
	{
   		name: 'id',
        type: 'int',
        useNull: true
	},
	'name',
		{
			name : 'info',
			type: 'string',

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
    	}]

});
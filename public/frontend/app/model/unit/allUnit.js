Ext.define('App.model.unit.allUnit',{
	extend: 'Ext.data.Model',
	fields:[
 
	'id',
	'name',
		{
			name : 'info',
			type: 'string'

		},
		'uuid',
		{
			name : 'creator',
			mapping : 'metadata.creator.fn'

		},
		
		{
			name : 'updater',
			mapping : 'metadata.updater.fn'

		},		
		{
			name : 'type_id',
			mapping : 'metadata.type.id'

		},
		{
			name : 'typename',
			mapping : 'metadata.type.name'
		}
	]
});


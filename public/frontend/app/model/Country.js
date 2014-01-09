Ext.define('App.model.Country',{
	extend: 'Ext.data.Model',
	fields:[
    'id',
	'name',
	{ name : 'info',	type: 'string'},
	{ 
		name: 'parent_id',
		type: 'int',
		defaultValue: 0
	},
	'uuid'
	],
	validations: [
		{
			type: 'length',
			field: 'name',
			min: 2
		}
	]
});

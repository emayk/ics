Ext.define('App.model.Country',{
	extend: 'Ext.data.Model',
	fields:[
    'id',
	'name',
	{ name : 'info',	type: 'string'},
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

Ext.define('App.model.City',{
	extend: 'Ext.data.Model',
	fields:[
	{ 
		name: 'id',
		type: 'int',
		// defaultValue: 0
		useNull: false
	},
	'name',
	'parent_id',
	'parent_type',
	'info',
	'uuid',
	// {
	// 	/*==========  Token  ==========*/
	// 	name : '_token',
	// 	type: 'string',
	// 	defaultValue: token
	// }
	],
	validations: [
		{
			type: 'length',
			field: 'name',
			min: 2
		},

	],
	init:function(){
		// log('Model Country Loaded');
	},

});

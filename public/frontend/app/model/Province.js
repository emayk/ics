Ext.define('App.model.Province',{
	extend: 'Ext.data.Model',
	fields:[
	{ 
		name: 'id',
		type: 'int',
		// defaultValue: 0
		useNull: true
	},
	'name',
	'info',
	'parent_id',
	'parent_type',
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

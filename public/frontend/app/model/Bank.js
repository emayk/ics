Ext.define('App.model.Bank',{
	extend: 'Ext.data.Model',
	fields:[
 'id', 'name','address','notelp','uuid',
	{
		/*==========  Token  ==========*/
		name : '_token',
		type: 'string',
		defaultValue: token
	}
	],
	validations: [
		{
			type: 'length',
			field: 'name',
			min: 5
		}
	],
	init:function(){
		// log('Model Bank Loaded');
	},
		proxy: {
		type: 'rest',
		url: api_url +'/bank',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}
});

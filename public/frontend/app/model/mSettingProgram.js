Ext.define('App.model.mSettingProgram',{
	extend: 'Ext.data.Model',
	field: ['name','address','phone','fax','city_id',{ name : 'city' , mapping: 'meta.city.name'}  ],
	init:function(){
		log('Model Bank Loaded');
	},
		proxy: {
		type: 'rest',
		url: api_url +'/setupcompany',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}
});

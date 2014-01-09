/**
*
* Store Setting Program
*
**/


Ext.define('App.store.SettingsProgram',{
	extend : 'Ext.data.Store',
	field: ['name','address','phone','fax','city_id',{ name : 'city' , mapping: 'meta.city.name'}  ],
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

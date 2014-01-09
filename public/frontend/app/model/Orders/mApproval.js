Ext.define('App.model.Orders.mApproval',{
	extend: 'Ext.data.Model',
	fields:['id', 'name'],
	proxy: {
		type: 'rest',
		url: api_url +'/currency',
		reader: {
			type: 'json',
			root: 'results',successProperty: 'success',
			totalProperty: 'total'
		}
	},
});
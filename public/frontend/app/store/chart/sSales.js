Ext.define('App.store.chart.sSales',{
	extend: 'Ext.data.Store', fields: ['category','total_sales'],
	autoLoad : true,
	proxy : {
		type : 'ajax',
		url : '/pie',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
		}
});
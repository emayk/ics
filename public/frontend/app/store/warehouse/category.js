Ext.define('App.store.warehouse.category',{
   extend : 'Ext.data.Store',
    model: 'App.model.warehouse.category',
	proxy: {
		type: 'rest',
		url: getApiUrl() + '/warehousecategory',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}
});






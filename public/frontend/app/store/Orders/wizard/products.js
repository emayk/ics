Ext.define('App.store.Orders.wizard.products',{
	extend : 'Ext.data.Store',
	// model : 'App.model.product.Master',
	model : 'App.model.Orders.wizard.mProductSelected',
	// fields : [
	// 'id',
	// 'name',
	// 'product_id',
	// 'supplier_id',
	// {name :'status', type : 'int', defaultValue: 0},
	// {name :'qty', type : 'int', defaultValue: 1},
	// {name: 'image', defaultValue: null, mapping: 'metadata.urlpicture'},
	// 'path'
	// ],
	pageSize: 10,
     proxy: {
		type: 'rest',
		url: api_url +'/product',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},

	},

});

Ext.define('App.store.Purchase',{
	extend: 'Ext.data.Store',
	storeId : 'PurchaseStore',
	requires:[
	'App.model.orders.User',
	'App.model.orders.Order',
	'App.model.orders.OrderItem',
	'App.model.orders.Product',
	],
	model: 'App.model.orders.User',
	// autoLoad: true,
	// load: function() {
	// 	log('Store Loaded from onLoad');
	// }
	
});
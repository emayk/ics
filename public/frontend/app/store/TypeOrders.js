/**
 * Store Type Order
 */
Ext.define('App.store.TypeOrders',{
	extend: 'Ext.data.Store',
	model : 'App.model.Orders.mOrderType',
//    autoSync: true,
     
	proxy: {
	type: 'rest',
	url: getApiUrl() +'/ordertype',
	reader: {
		type: 'json',
		root: 'results',
		totalProperty: 'total'
		}
	}
});
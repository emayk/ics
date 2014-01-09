/**
*
* Store Order - Order yang sudah diclose
* hanya menampilkan (static Data)
*
**/

Ext.define('App.store.order.OrdersClose',{
	extend: 'Ext.data.Store',
	model: 'App.model.order.Order',
 		id: 'order_orders_close',
    proxy: {
		type: 'ajax',
		url: api_url +'/dept',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}
});

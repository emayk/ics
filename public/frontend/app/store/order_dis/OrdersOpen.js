// http://ba.dev/api/order

Ext.define('App.store.order.OrdersOpen',{
	extend: 'Ext.data.Store',
	model: 'App.model.order.OrderOpen',
	// fields : ['id','name'],

    // autosync: true,
    autoload: true,
 		id: 'order_orders_open',
    proxy: {
		type: 'rest',
		// url: api_url +'/order',
		url: api_url +'/order',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}
});

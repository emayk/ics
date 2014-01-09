/**
*
* Store Order  Items
*
**/
Ext.define('App.store.order.OrderItems',{
	extend : 'Ext.data.Store',
	model : 'App.model.order.OrderItem',
		id: 'order_order_items',
    proxy: {
		type: 'ajax',
		url: api_url +'/orderitems',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}

})

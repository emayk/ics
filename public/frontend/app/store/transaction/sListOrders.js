/**
*
* Store transaction
*
* Programmer By Emay Komarudin.
* 2013
*
* Description Store transaction
*
*
**/

function generate_list_orders() {
	var order = [];
	var status = ['-', 'complete', 'progress' ];
	for (var i = 0; i < 10; i++) {
			var a = {
      			user_name: 'admin',
      			count_items: randomInt(100),
						trx_no: 'TRX-001'+i,
						order_no: 'TRX-ORDER-'+i,
						status: ucWord(status[randomInt(2)])
			};
			order.push(a);
	};
	return order;
}


var list_orders = generate_list_orders();
Ext.define('App.store.transaction.sListOrders',{
	extend : 'Ext.data.Store',
	model : 'App.model.transaction.mListOrders',
	data : list_orders
});


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
						trx_no: 'TRX-001'+i,
						order_no: 'TRX-ORDER-'+i,
						status: ucWord(status[randomInt(2)]),
						qty : randomInt(300),
						price : randomInt(400)*1000,
						product_code : 'P-0299-029'+i,
						product_name : 'Product A 0299-029'+i
			};
			order.push(a);
	};
	return order;
}


var list_orders = generate_list_orders();
Ext.define('App.store.transaction.sListItemsOrder',{
	extend : 'Ext.data.Store',
	model : 'App.model.transaction.mListItemsOrder',
	data : list_orders
});

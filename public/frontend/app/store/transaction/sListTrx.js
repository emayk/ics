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

var data_gen = generate_transaction_list(30);
Ext.define('App.store.transaction.sListTrx',{
	extend : 'Ext.data.Store',
	// groupField: 'trx_no',
	// model : 'App.model.transaction.mOrders',
	fields : ['trx_no','user_name','status','count_orders','count_items','order_no'],
	data : data_gen
});

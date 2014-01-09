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
var agree_data = generate_trx_list(40);
Ext.define('App.store.transaction.sTrxAgree',{
	extend : 'Ext.data.Store',
	fields : ['trx_no','user_name','status','count_orders','count_items'],
	data : agree_data
})

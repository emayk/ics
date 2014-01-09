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

var decline_data = generate_trx_list(10);
Ext.define('App.store.transaction.sTrxDecline',{
	extend : 'Ext.data.Store',
	fields : ['trx_no','user_name','status','count_orders','count_items'],
	data : decline_data
})

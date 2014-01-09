/**
*
* Model orderApproval
*
* Programmer By Emay Komarudin.
* 2013
*
*
**/
Ext.define('App.model.orderApproval.mOrderItems',{
	extend : 'Ext.data.Model',
	uses: [
	'App.model.orderApproval.morderApproval'
	],
	fields: [
	'id ', 'product_name', 'product_id', 'product_qty', 'order_no'
	// 'id','trx_no','count_order','count_items','status','order_no'
	],


})





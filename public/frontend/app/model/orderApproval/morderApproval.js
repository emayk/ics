/**
*
* Model orderApproval
*
* Programmer By Emay Komarudin.
* 2013
*
*
**/
Ext.define('App.model.orderApproval.morderApproval',{
	extend : 'Ext.data.Model',
	requires:[
	// 'App.model.orderApproval.mOrderItems'
	],
	// fields : [ 'id','name' ]
	fields: ['id','trx_no','count_order','count_items','status','order_no'],

})

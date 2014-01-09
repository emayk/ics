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

Ext.define('App.store.transaction.stransaction',{
	extend : 'Ext.data.Store',
	// model : 'App.model.transaction.mtransaction',
	// groupField: 'doc',
	groupField: 'trx_no',
	model : 'App.model.transaction.mOrders',
})

/**
*
* Controller transaction
*
* Programmer By Emay Komarudin.
* 2013
*
*
* Description Controller transaction
*
*
**/

Ext.define('App.controller.transaction.ctransaction',{
	extend: 'Ext.app.Controller',
	views: [
		'App.view.transaction.tabtransaction',
		'App.view.transaction.vtransaction',
		'App.view.transaction.trx.tabListTransaction',
		'App.view.transaction.trx.ListTrx',
		'App.view.transaction.trx.order.List',
	],
	models:[
		'App.model.transaction.mtransaction',
		'App.model.transaction.mOrders',
		'App.model.transaction.mListOrders',
		'App.model.transaction.mListItemsOrder',
	],
	stores:[
		'App.store.transaction.stransaction',
		'App.store.transaction.sTrxAgree',
		'App.store.transaction.sTrxDecline',
		'App.store.transaction.sListTrx',
		'App.store.transaction.sListOrders',
		'App.store.transaction.sListItemsOrder',
	],
	init: function(){
		log('Controller ctransaction Loaded');
	}
});


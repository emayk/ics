/**
*
* Store Master Product
*
**/

Ext.define('App.store.product.MasterProducts',{
	extend : 'Ext.data.Store',
	model : 'App.model.product.Master',
	pageSize: 10
})
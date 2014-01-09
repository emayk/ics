/**
*
* Store Orders
*
* Programmer By Emay Komarudin.
* 2013
*
*
**/

Ext.define('App.store.Orders.sTest',{
	extend : 'Ext.data.Store',
	id: 'sTest',
	// model : 'App.model.Orders.mCurrency',
	fields: ['createby_id', 'created_at', 'id', 'lastupdateby_id', 'name', 'negara_id', 'shortname', 'updated_at', 'uuid'],
	proxy: {
		type: 'memory',
		reader: {
			type: 'json',
			root: 'currency',
		}
	},

});

// currency

/**
*
* Store Orders
*
* Programmer By Emay Komarudin.
* 2013
*
*
**/

Ext.define('App.store.Orders.sOrdersAll',{
	extend : 'Ext.data.Store',

	model : 'App.model.Orders.mOrders',
    //
     // fields: [ 'id', 'name'],
     // pageSize: 8,
     // data : App.util.dummy.data_order,

	proxy: {
		type: 'rest',
		url: api_url +'/orders',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
	extraParams: { status : 'all' },
	},

	// listeners: {
 //        load: function(store, records, successful) {
 //        	// var sTest = Ext.getStore('sTest');
 //        	// cDir(sTest);
 //          // sTest.loadRawData(store.proxy.reader.jsonData);
 //          // substore2.loadRawData(store.proxy.reader.jsonData);
 //        }
 //    }
})

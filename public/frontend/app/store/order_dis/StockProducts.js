
/**
*
* Store Stock Product
*
**/
Ext.define('App.store.order.StockProducts',{
	extend : 'Ext.data.Store',
    // model : 'App.model.product.Master',
    //
    id: 'order_stock_product',
    fields :[
    'id',
    'name',
    'stock'
    ],
    pageSize: 30,
     proxy: {
        type: 'rest',
        url: api_url +'/product',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        },
        extraParams : {
            'withstock' : true
        }
    },

});




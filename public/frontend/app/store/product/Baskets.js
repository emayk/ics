/**
*
* Store Master Product
*
**/

Ext.define('App.store.product.Baskets',{
	extend : 'Ext.data.Store',

	model : 'App.model.product.Basket',
	pageSize: 5,
     proxy: {
        // type: 'memory',
		type: 'rest',
		url: api_url +'/obp',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
        
	},
	
	 listeners : {
        load : function (store, recs) {
            
        }
    }
})
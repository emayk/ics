Ext.define('App.store.product.pstocks',{
    extend: 'Ext.data.Store',
    model : 'App.model.product.Stock',
    pageSize: 20,
    proxy: {
        type: 'rest',
        url: getApiUrl() +'/stockproducts',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        }
    }
});
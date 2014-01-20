/**
 *
 * Store Stock Product
 *
 **/

Ext.define('App.store.product.Stocks', {
    extend: 'Ext.data.Store',
    model : 'App.model.product.Stock',
    pageSize: 30,
    proxy: {
        type: 'rest',
        url: getApiUrl() + '/stockproducts',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        }
    }
});
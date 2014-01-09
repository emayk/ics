/**
*
* Store Master Supplier
*
**/

Ext.define('App.store.supplier.sAccountbank',{
    extend : 'Ext.data.Store',

    model : 'App.model.supplier.mAccountBank',
    pageSize: 30,
     proxy: {
        type: 'rest',
        url: api_url +'/supplier_account_bank',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        },

    },

})
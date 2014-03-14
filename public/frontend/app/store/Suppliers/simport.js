/**
 * Created by emayk on 3/10/14.
 */

Ext.define('App.store.Suppliers.simport',{
    extend : 'Ext.data.Store',
    model : 'App.model.Suppliers.mSuppliers',

    proxy: {
        type: 'rest',
        url: getApiUrl() +'/suppliers',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        }
    }

})

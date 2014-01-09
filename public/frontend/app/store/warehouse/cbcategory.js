Ext.define('App.store.warehouse.cbcategory',{
    extend : 'Ext.data.Store',
    fields : ['id','name'],
    proxy : {
        url : getApiUrl() + '/warehousecategory',
        type : 'rest',
        reader : {
            type : 'json',
            root : 'results',
            totalProperty : 'total'
        },
        extraParams :
        {
            cb : true
        }
    }
});








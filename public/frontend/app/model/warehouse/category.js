Ext.define('App.model.warehouse.category',{
    extend : 'Ext.data.Model',
    uses:[
        'App.model.product.Stock'
    ],
    fields : [
        'id',
        'name',
        'info',
        'uuid',
        'createby_id',
        'lastupdateby_id',
        'created_at',
        'updated_at'
    ],
    proxy : {
        url : getApiUrl() + '/warehousecategory',
        type : 'rest',
        reader : {
            type : 'json',
            root : 'results',
            totalProperty : 'total'
        }
    }
});

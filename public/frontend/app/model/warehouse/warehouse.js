Ext.define('App.model.warehouse.warehouse',{
    extend : 'Ext.data.Model',
    uses:[
        'App.model.product.Stock'
    ],
    fields : [
        'id',
        'name',
        'address',
        'city_id',
        'cat_id',
        'uuid',
        'createby_id',
        'lastupdateby_id',
        'created_at',
        'updated_at',
    ],
    proxy : {
        url : getApiUrl() + '/warehouse',
        type : 'rest',
        reader : {
            type : 'json',
            root : 'results',
            totalProperty : 'total'
        }
    }
});


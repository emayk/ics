Ext.define('App.model.product.Stock', {
    requires: [
        'App.model.warehouse.category',
        'App.model.warehouse.warehouse',
        'App.model.product.creator',
        'App.model.product.updater',
        'App.model.product.product'
    ],
    uses: [
        'App.model.product.product'
    ],
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'createby_id',
        'created_at',
        'lastupdateby_id',
        'lengthfabric',
        'onday',
        'product_id',
        'total',
        'unit_id',
        'updated_at',
        'uuid',
        'wh_id'

    ],
//
//    associations: [
////        {
////            type: 'belongsTo',
////            instanceName: 'Categorywarehouse',
////            getterName: 'getCatwh',
////            setterName: 'setCatwh',
////            model: 'App.model.warehouse.category',
////            associationKey: 'categorywarehouse',
////            foreignKey: 'catwh_id'
////
////        },
////        {
////            type: 'belongsTo',
////            instanceName: 'Warehouse',
////            getterName: 'getWh',
////            setterName: 'setWh',
////            model: 'App.model.warehouse.warehouse',
////            associationKey: 'warehouse',
////            foreignKey: 'wh_id'
////
////        },
////        {
////            type: 'belongsTo',
////            model: 'App.model.product.creator',
////            instanceName: 'Creator',
////            foreignKey: 'createby_id',
////            setterName: 'setCreator',
////            getterName: 'getCreator',
////            associationKey: 'createby'
////        },
////        {
////            type: 'belongsTo',
////            model: 'App.model.product.updater',
////            instanceName: 'Updater',
////            foreignKey: 'lastupdateby_id',
////            setterName: 'setUpdater',
////            getterName: 'getUpdater',
////            associationKey: 'updateby'
////        },
////        {
////            type: 'belongsTo',
////            model: 'App.model.product.product',
////            instanceName: 'Product',
////            foreignKey: 'product_id',
////            setterName: 'setProduct',
////            getterName: 'getProduct',
////            associationKey: 'product'
////        }
//
//    ],
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


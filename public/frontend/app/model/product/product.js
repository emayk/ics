Ext.define('App.model.product.product', {
    extend: 'Ext.data.Model',
    requires: [
        'App.model.product.type',
        'App.model.product.category',
        'App.model.product.detail',
        'App.model.product.units',
        'App.model.product.unitweight',
        'App.model.product.updater',
        'App.model.product.creator'
    ],
    fields: [
        'id',
        'name',
        'nodesign',
        'contruction',
        'cat_id',
        'type_id',
        'weight',
        'unitweight_id',
        'width',
        'unitwidth_id',
        'codeinternal',
        'parent_id',
        'parent_type',
        'uuid',
        'createby_id',
        'lastupdateby_id',
        'countstock',
        'created_at',
        'updated_at',
        'catname',
        'typename',
        'totalstocks',
        'widthname',
        'weightname'
    ],
    associations: [
        {
            /*Type Product*/
            type: 'belongsTo',
            model: 'App.model.product.type',
            instanceName: 'Type',
            foreignKey: 'type_id',
            setterName: 'setType',
            getterName: 'getType',
            associationKey: 'type'
        },
        {
            /*Detail Product*/
            type: 'belongsTo',
            model: 'App.model.product.detail',
            instanceName: 'Detail',
            foreignKey: 'product_id',
            setterName: 'setDetail',
            getterName: 'getDetail',
            associationKey: 'detail'
        },{
            /*Stocks Product*/
            type: 'hasMany',
            model: 'App.model.product.Stock',
            name: 'Stocks',
//            instanceName: 'Stocks',
//            foreignKey: 'product_id',
            setterName: 'setStocks',
            getterName: 'getStocks',
            associationKey: 'stocks'
        },
        {
            /*Category*/
            type: 'belongsTo',
            model: 'App.model.product.category',
            instanceName: 'Category',
            foreignKey: 'cat_id',
            setterName: 'setCat',
            getterName: 'getCat',
            associationKey: 'category'
        },
        {
            /*Satuan Berat*/
            type: 'belongsTo',
            model: 'App.model.product.unitweight',
            instanceName: 'Unitweight',
            foreignKey: 'unitweight_id',
            setterName: 'setUnitwe',
            getterName: 'getUnitwe',
            associationKey: 'unitweight'
        },
        {
            /*Satuan*/
            type: 'belongsTo',
            model: 'App.model.product.units',
            instanceName: 'Unitwidth',
            foreignKey: 'unitwidth_id',
            setterName: 'setUnitwi',
            getterName: 'getUnitwi',
            associationKey: 'unitwidth'
        },
        {
            /*Creator*/
            type: 'belongsTo',
            model: 'App.model.product.creator',
            instanceName: 'Creator',
            foreignKey: 'createby_id',
            setterName: 'setCreator',
            getterName: 'getCreator',
            associationKey: 'createby'
        },
        {
            /*Updater*/
            type: 'belongsTo',
            model: 'App.model.product.updater',
            instanceName: 'Updater',
            foreignKey: 'lastupdateby_id',
            setterName: 'setUpdater',
            getterName: 'getUpdater',
            associationKey: 'updateby'
        }
    ],

    proxy: {
        url: getApiUrl() + '/products',
        type: 'rest',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        }

    }
});
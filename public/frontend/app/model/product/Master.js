Ext.define('App.model.product.Master',{
	extend: 'Ext.data.Model',
//    requires:[
//        'App.model.unit.units',
//        'App.model.unit.type'
//    ],
	fields:[
        'cat_id',
        'codeinternal',
        'contruction',
        'createby_id',
        'created_at',
        'id',
        'lastupdateby_id',
        'name',
        'nodesign',
        'parent_id',
        'parent_type',
        'type_id',
        'unitweight_id',
        'unitwidth_id',
        'updated_at',
        'uuid',
        'weight',
        'width'
	],
    proxy: {
        type: 'rest',
        url: getApiUrl() +'/products',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        }
    }
//    associations : [
//        {
//            type: 'belongsTo',
//            instanceName : 'unitweight',
//            model: 'App.model.unit.units',
//            primaryKey: 'id',
//            foreignKey: 'unitweight_id',
//            getterName : 'unitweight',
//            associationKey : 'unitweight_id'
//        },{
//            type: 'belongsTo',
//            instanceName : 'unitwidth',
//            model: 'App.model.unit.units',
//            primaryKey: 'id',
//            foreignKey: 'unitwidth_id',
//            getterName : 'unitwidth',
//            associationKey : 'unitwidth_id'
//        },
//        {
//            type: 'belongsTo',
//            instanceName : 'updateby',
//            model: 'App.model.unit.units',
//            primaryKey: 'id',
//            foreignKey: 'lastupdateby_id',
//            getterName : 'updateby',
//            associationKey : 'lastupdateby_id'
//        },{
//            type: 'belongsTo',
//            instanceName : 'createby',
//            model: 'App.model.unit.units',
//            primaryKey: 'id',
//            foreignKey: 'createby_id',
//            getterName : 'createby',
//            associationKey : 'createby_id'
//        },{
//            type: 'belongsTo',
//            instanceName : 'createby',
//            model: 'App.model.unit.units',
//            primaryKey: 'id',
//            foreignKey: 'type_id',
//            getterName : 'createby',
//            associationKey : 'type_id'
//        }
//    ]
});


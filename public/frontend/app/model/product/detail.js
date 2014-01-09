Ext.define('App.model.product.detail',{
    extend : 'Ext.data.Model',
    fields:[
        'id',
        'product_id',
        'color_id',
        'unit_id',
        'grade_id',
        'salesprice',
        'salespricemin',
        'currsp_id',
        'currspm_id',
        'parent_id',
        'parent_type',
        'uuid',
        'createby_id',
        'lastupdateby_id',
        'created_at',
        'updated_at'
    ],
    proxy : {
        url : getApiUrl() + '/productdetails',
        type : 'rest',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        }

    }
});

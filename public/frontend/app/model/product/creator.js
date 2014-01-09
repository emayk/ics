Ext.define('App.model.product.creator',{
    uses: [
        'App.model.product.product'
    ],
    extend: 'Ext.data.Model',
    fields :[
        'id',
        'username',
        'fullname',
        'email',
        'pos_id',
        'dept_id',
        'warehouse_id',
        'status_id',
        'uuid',
        'createby_id',
        'lastupdateby_id',
        'created_at',
        'updated_at'
    ]
});

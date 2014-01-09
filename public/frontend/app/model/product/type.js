Ext.define('App.model.product.type',{
    uses: [
        'App.model.product.product'
    ],
    extend: 'Ext.data.Model',
    fields :[
        'id',
        'name'
    ]
});

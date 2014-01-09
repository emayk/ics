Ext.define('App.model.product.category',{
    uses: [
        'App.model.product.product'
    ],
    extend: 'Ext.data.Model',
    fields :[
        'id',
        'name'
    ]
});

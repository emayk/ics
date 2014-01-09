Ext.define('App.model.product.Basket',{
	extend: 'Ext.data.Model',
	fields:[
		'id',
		'product_id',
		'productname',
		{
			name : 'qty',
			type: 'int',
		},
		'order_id',

	],
    init : function(){
    }
});


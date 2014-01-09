Ext.define('App.model.product.mNewStockItems',{
	extend: 'Ext.data.Model',
	fields:[
		'id',
		'stock_id',
		'refdoc',
		'noroll',
		'qty_in',
		'qty_out',
		'qty_balance',
		/*==========  Mapping  ==========*/
		'uuid',
		'createby_id',
		'lastupdateby_id',
	],
    init : function(){
    	// log('Model ');
    }
});


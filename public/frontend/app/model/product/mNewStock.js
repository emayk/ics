Ext.define('App.model.product.mNewStock',{
	extend: 'Ext.data.Model',
	fields:[
		'id',
		'tipelokasi_id',
		'product_id',
		'rollnumber',
		'lokasigudang_id',
		'detail_id',
		'panjangkain',
		'onday',
		'satuan_id',
		'hargabeli',
		/*==========  Mapping  ==========*/
		'uuid',
		'createby_id',
		'lastupdateby_id',
		{
			name : 'location',
			mapping :  'typelocation.name'
		}
	],

    init : function(){
    	// log('Model ');
    }
});


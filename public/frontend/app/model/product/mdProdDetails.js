

Ext.define('App.model.product.mdProdDetails',{
	extend: 'Ext.data.Model',
	fields:[
			'id',
			'product_id',
			'warna_id',
			'satuan_id',
			'gradekain_id',
			'hargajual',
			'hargajualmin',
			'parent_id',
			'parent_type',
			'uuid',
			'createby_id',
			'lastupdateby_id',
			'created_at',
			'updated_at',
			'currhj_id',
			'currhjm_id',
			{
				name : 'product',
				mapping : 'metadata.product.name'
			},

			{
				name : 'warna',
				mapping : 'metadata.color.name'
			},

			{
				name : 'countstock',
				mapping : 'metadata.countstock'
			},

			{
				name : 'gradekain',
				mapping : 'metadata.gradekain.name'
			},

			{
				name : 'unit',
				mapping : 'metadata.unit.name'
			},

			{
				name : 'currencysales',
				mapping : 'metadata.currencysales.name'
			},

			{
				name : 'currencysalesmin',
				mapping : 'metadata.currencysalesmin.name'
			},


	]

});


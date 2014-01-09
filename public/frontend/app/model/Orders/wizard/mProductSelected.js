Ext.define('App.model.Orders.wizard.mProductSelected',{
	extend : 'Ext.data.Model',
	fields : [
		'id',
		{ name :'product_id', mapping: 'id'},
		'name',
		'nodesign',
		'kontruksi',
		'supplier_id',
		'kategori_id',
		'tipe_id',
		'berat',
		'beratsatuan_id',
		{name : 'beratName', mapping: 'metadata.unitweight.name'},
		{ name : 'createby_id', defaultValue: 1},
		{ name : 'lastupdateby_id', defaultValue: 1},
		{name : 'supname', mapping : 'metadata.supplier.name'},
		{name : 'catname', mapping: 'metadata.category.name', },
		{name : 'typename', mapping : 'metadata.type.name'},
		{name: 'urlpicture', defaultValue: null, mapping: 'metadata.urlpicture'},
		{name: 'img', mapping: 'metadata.urlpicture'},
		{name : 'color_id', mapping : 'metadata.detail.color.id', },
		{name : 'unit_id', mapping : 'metadata.detail.unit.id', },
		{name : 'gradekain_id', mapping : 'metadata.detail.gradekain.id', },
		{name : 'hargajual', mapping : 'metadata.detail.hargajual', },
		{name : 'hargajual', mapping : 'metadata.detail.hargajual', },
		{name : 'hargajualmin', mapping : 'metadata.detail.hargajualmin', },
		{name : 'currhjm_id', mapping : 'metadata.detail.currencyhjm.id', },
		{name : 'currhj_id', mapping : 'metadata.detail.currencyhj.id', },
		{name : 'status', defaultValue: 0 },
		{name : 'qty', defaultValue: 1 },
		{name : 'status_supplier', defaultValue: 0 },
		{name : 'status_contact', defaultValue: 0 },
		{name : 'status_wh', defaultValue: 0 },
		{name : 'status_payment', defaultValue: 0 },
		{name : 'status_payment', defaultValue: 0 },
		/*Supplier*/
		{name : 'sup_id', defaultValue: null },
		{name : 'sup_name', defaultValue: null },

		{name : 'cp_id', defaultValue: null },
		{name : 'cp_name', defaultValue: null },

		{name : 'wh_id', defaultValue: null },
		{name : 'wh_name', defaultValue: null },

		{name : 'pay_id', defaultValue: null },
		{name : 'pay_name', defaultValue: null },

		{name : 'path', defaultValue: null },
		{name : 'order', defaultValue: null },
	],
});

 // 'id',
 //        {name: 'name', mapping: 1},         // "mapping" only needed if an "id" field is present which
 //        {name: 'occupation', mapping: 2}
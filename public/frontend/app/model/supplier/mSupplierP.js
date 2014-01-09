/**
*
* Model Supplier
*
**/


Ext.define('App.model.supplier.mSupplierP',{
	extend: 'Ext.data.Model',
	fields:['id', 'name', 'codepos', 'npwp', 'fax', 'email', 'plafon', 'kredit', 'alamat', 'phone', 'status_id','tipe_id', 'legalitas_id', 'typeprod_id','negara_id','province_id','city_id', 'uuid', 'createby_id', 'lastupdateby_id',

],

     proxy: {
		type: 'rest',
		url: api_url +'/supplier',
		reader: {
			type: 'json',
			root: 'data',
			totalProperty: 'total'
		},
	}
// associations: [
// 		{ type: 'hasOne', model: 'App.model.supplier.mUser', associationKey : 'creator' }
// 		]


});


/**
*
* Store Master Supplier
*
**/

Ext.define('App.store.product.prodSuppliers',{
	extend : 'Ext.data.Store',
	fields:[
		'id',
		'name',
		'codepos',
		'npwp',
		'fax',
		'email',
		'plafon',
		'kredit',
		// 'deleted_at',
		'alamat',
		'phone',
		'status_id',
		{
			name : 'status',
			mapping: 'm.status.name'
		},
		'tipe_id',
		{
			name : 'tipe',
			mapping: 'm.tipe.name'
		},
		'legalitas_id',
		{
			name : 'legalitas',
			mapping: 'm.legalitas.name'
		},
		'typeprod_id',
		{
			name : 'tipeproduct',
			mapping: 'm.tipeproduct.name'
		},
		'negara_id',
		{
			name : 'country',
			mapping: 'm.country.name'
		},
		'province_id',
		{
			name : 'province',
			mapping: 'm.province.name'
		},
		'city_id',
		{
			name : 'city',
			mapping: 'm.city.name'
		},
		'uuid',
		'createby_id',
		{
			name : 'creator',
			mapping: 'm.creator.name'
		},
		'lastupdateby_id',
		{
			name : 'updater',
			mapping: 'm.updater.name'
		},
		// 'codeinternal',
		// 'created_at',
		// 'updated_at',

		/**
		*
		* Membuat Response untuk Meta
		* status , tipe , legalitas, tipeproduct, negara, province , city, creator , updater
		*
		**/
	],

	pageSize: 30,
     proxy: {
		type: 'rest',
		url: getApiUrl() +'/suppliers',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}

})
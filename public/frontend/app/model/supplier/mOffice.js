/**
*
* Model Supplier
*
**/


Ext.define('App.model.supplier.mOffice',{
	extend: 'Ext.data.Model',
	fields:[
			'id',
			'alamat',
			'negara_id',
			'provinsi_id',
			'kota_id',
			'kodepos',
			'tipe',
			'parent_id',
			'parent_type',
			'codeinternal',
			'mainoffice',
			'uuid',
			'createby_id',
			'lastupdateby_id',
			'created_at',
			'updated_at',
				{
					name : 'country',
					mapping : 'm.country.name'
				},

				{
					name : 'province',
					mapping : 'm.province.name'
				},


				{
					name : 'city',
					mapping : 'm.city.name'
				},


				{
					name : 'creator',
					mapping : 'm.creator.name'
				},

				{
					name : 'updater',
					mapping : 'm.updater.name'
				}
				]

});




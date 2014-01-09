Ext.define('App.model.User',{
	extend: 'Ext.data.Model',
	/*==========  Tipe Data  ==========*/
	fields: [
			'id',
			'email',
			'password',
			'permissions',
			'activated',
			// 'activation_code',
			// 'activated_at',
			'last_login',
			'persist_code',
			'reset_password_code',
			'first_name',
			'last_name',
			'created_at',
			'updated_at',
			'deleted_at',
			'website',
			'country',
			'gravatar',

			'jabatan_id',
			'departement_id',
			'gudang_id',
			'image_id',
			'uuid',
			'createby_id',
			'lastupdateby_id',

	],
/**
*
* Relasi
*
**/
	associations: [
	// departement
		{ type: 'belongsTo', model: 'Departement', foreignKey: 'departement_id'} ,
		{ type: 'belongsTo', model: 'Jabatan', foreignKey: 'jabatan_id'} ,
		{ type: 'belongsTo', model: 'Gudang', foreignKey: 'gudang_id'} 
	],
	
	/*==========  Validasi  ==========*/
	validations: [
	{
		type: 'length',
		field: 'name',
		min: 5
	}
	],
	init:function(){
		// log('Model User define');
	}
});
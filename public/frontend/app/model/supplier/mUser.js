/**
*
* Model User
*
**/


Ext.define('App.model.supplier.mUser',{
	extend: 'Ext.data.Model',
fields:[
			'id', 'username', 'fullname', 'email', 'jabatan_id', 'departement_id', 'group_id',
			'gudang_id', 'wewenang', 'status_id', 'image_id', 'is_superadmin', 'codeinternal', 'uuid',
			'createby_id', 'lastupdateby_id', 'created_at', 'updated_at',
			],
});


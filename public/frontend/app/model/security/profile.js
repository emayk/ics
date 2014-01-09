Ext.define('App.model.security.profile',{
	extend: 'Ext.data.Model',
	requires: ['App.model.security.picture'],
	fields: [
				'id',
				'username',
				'fullname',
				'email',
				'jabatan_id',
				'departement_id',
				'group_id',
				'gudang_id',
				'wewenang',
				'status_id',
				'image_id',
				'is_superadmin',
				'codeinternal',
				'uuid',
				'createby_id',
				'lastupdateby_id',
				'picture',
	],
belongsTo:[
	        {
	        	name:'picture',
						instanceName:'picture',
						getterName:'getPicture',
						setterName:'setPicture',
						associationKey:'image',
						model: 'App.model.security.picture'
	        }
        ],

	proxy: {
        type: 'rest',
        url: api_url + '/users',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});






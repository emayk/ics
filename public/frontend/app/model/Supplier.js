Ext.define('App.model.Supplier',{
	extend: 'Ext.data.Model',
	fields:[
	{
   		name: 'id',
        type: 'int',
	},
	'name',
	'codepos',
	'npwp',

	'npwp',
	'fax',
	'email',
	'plafon',
	'kredit',
	'alamat',
	'phone',
	// Status
	'status_id',
	//statusName
	'tipe_id',
	//tipeName
	'legalitas_id',
	//legalitasName
	'typeprod_id',
	//typeprodName
	'negara_id',
	//negaraName
	'province_id',
	//provinceName
	'city_id',
	//cityName


		'uuid',
		'createby_id',
		'lastupdateby_id',
		'created_at',
		'updated_at'

	],
	 validations: [{
        type: 'length',
        field: 'name',
        min: 5
    	}],

	proxy: {
	type: 'rest',
	url: '/api/supplier',
	reader: {
		type: 'json',
		root: 'results',
		totalProperty: 'total'
		}
	}
        // ,
        // extraParams: {
        //     method: 'getUserTypes',
        //     token: TOKEN
        // },

});
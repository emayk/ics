/**
*
* Model
*
**/
Ext.define('App.model.supplier.wizard.Office',{
	extend: 'Ext.data.Model',
	requires: [
			'App.model.supplier.wizard.Country',
			'App.model.supplier.wizard.User',
			'App.model.supplier.wizard.Phones'
	],
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
			{ name : 'created_at', type: 'date' },
			{name : 'updated_at', type: 'date' },
	 ],

   proxy: {
		type: 'rest',
		url: api_url +'/supplier_offices',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
	},

 belongsTo:[
        {name:'country', instanceName:'country', getterName:'getCountry', setterName:'setCountry',
            associationKey:'country', model: 'App.model.supplier.wizard.Country'
        },
				{name:'province', instanceName:'province', getterName:'getProvince', setterName:'setProvince',
            associationKey:'province', model: 'App.model.supplier.wizard.Country'
        },
				{name:'city', instanceName:'city', getterName:'getCity', setterName:'setCity',
            associationKey:'city', model: 'App.model.supplier.wizard.Country'
        },

        {name:'updater', instanceName:'updater', getterName:'getUpdater', setterName:'setUpdater',
            associationKey:'updater', model: 'App.model.supplier.wizard.User'
        },

        {name:'creator', instanceName:'creator', getterName:'getCreator', setterName:'setCreator',
            associationKey:'creator', model: 'App.model.supplier.wizard.User'
        },

        ],

 hasMany:[
    {
        name: 'Phones',
        model:'App.model.supplier.wizard.Phones',
        associationKey:'phones',
        foreignKey: 'parent_id',
		}
    ],


});




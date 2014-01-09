/**
*
* Model Supplier
*
**/


Ext.define('App.model.supplier.wizard.AccountBank',{
	extend: 'Ext.data.Model',
	requires: ['App.model.supplier.wizard.Bank'],
	fields:['id', 'bank_id', 'norek', 'name', 'dimiliki_id', 'dimiliki_type',
		'type_id', 'uuid', 'createby_id', 'lastupdateby_id', 'created_at', 'updated_at',
	],

	belongsTo:[
        {
            name:'Bank',
            instanceName:'Bank',
            model: 'App.model.supplier.wizard.Bank',
            getterName:'getBank',
            setterName:'setBank',
            associationKey:'bank'
        }        ,
        {
            name:'Type',
            instanceName:'Type',
            model: 'App.model.supplier.wizard.Bank',
            getterName:'getType',
            setterName:'setType',
            associationKey:'type'
        }
    ],

  proxy: {
		type: 'rest',
		url: api_url +'/supplier_account_bank',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
		extraParams : {dimiliki_type : 'Supplier' }
	},
});


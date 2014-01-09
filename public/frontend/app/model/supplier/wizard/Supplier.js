/**
*
* Model Supplier
*
**/


Ext.define('App.model.supplier.wizard.Supplier',{
	extend: 'Ext.data.Model',
	requires: [
	'App.model.supplier.wizard.AccountBank',
	],
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
	},

 hasMany:[
    {
        name: 'bankAccounts',
        model:'App.model.supplier.wizard.AccountBank',
        associationKey:'account_bank',
        foreignKey: 'dimiliki_id',
		}
    ],


});




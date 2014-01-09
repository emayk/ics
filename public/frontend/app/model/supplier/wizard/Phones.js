Ext.define('App.model.supplier.wizard.Phones',{
	extend: 'Ext.data.Model',
	fields:[
		'id',
		'telp',
		'info',
		'parent_id',
		'parent_type',
		'uuid',
		'createby_id',
		'lastupdateby_id',
		{ name : 'created_at', type :'date'},
		{ name: 'updated_at', type: 'date'},
		'phone-1',
		'phone-2',
		'phone-3',
	],
	  proxy: {
		type: 'rest',
		url: api_url +'/supplier_phones',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
	},
   // belongsTo:[
   //      {
   //          name:'departement',
   //          instanceName:'departement',
   //          model:'App.model.Departement',
   //          getterName:'getDept',
   //          setterName:'setDept',
   //          associationKey:'departement'
   //      }
   //  ]
});




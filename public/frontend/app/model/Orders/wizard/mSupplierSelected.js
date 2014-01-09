
Ext.define('App.model.Orders.wizard.mSupplierSelected',{
	// requires: ['App.model.Orders.wizard.mProductSelected'],
	extend : 'Ext.data.Model',
	fields:[
	'id',
	'sup_id',
	'sup_name',
	'product_id',
	'product_name',
	'product_img',
	'product_qty',
	'path',
	'oid',
	'status',
	// 'codepos', 'npwp', 'fax', 'email', 'plafon', 'kredit', 'alamat', 'phone', 'status_id','tipe_id', 'legalitas_id', 'typeprod_id','negara_id','province_id','city_id', 'uuid', 'createby_id', 'lastupdateby_id',
	],
	 // associations: [
  //       {
  //       	type: 'belongsTo',
  //       	name: 'product',
		// 			instanceName: 'product',
		// 			getterName : 'getProduct',
		// 			setterName:'setProduct',
		// 			model: 'App.model.Orders.wizard.mProductSelected',
	 //      }
  //   ]

	// belongsTo : [
	// 		{
	// 		name: 'product',
	// 		instanceName: 'product',
	// 		model: 'App.model.Orders.wizard.mProductSelected',
	// 		getterName : 'getProduct',
	// 		setterName:'setProduct',
	// 		associationKey: 'product_id'
	// 		}
	// ],

});
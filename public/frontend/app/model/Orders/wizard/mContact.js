
Ext.define('App.model.Orders.wizard.mContact',{
	extend : 'Ext.data.Model',
	fields:[
	'id',
	'cp_id',
	'cp_name',
	'cp_nohp',
	'sup_id',
	'sup_name',
	'product_id',
	'product_name',
	'product_image',
	'product_qty',
	'oid',
	'path',
	'status'
	],
	// belongsTo : [
	// 		{
	// 		name: 'supplier',
	// 		instanceName: 'supplier',
	// 		model: 'App.model.Orders.wizard.mSupplierSelected',
	// 		getterName : 'getSupplier',
	// 		setterName:'setSupplier',
	// 		associationKey: 'sup_id'
	// 		},{
	// 		name: 'product',
	// 		instanceName: 'product',
	// 		model: 'App.model.Orders.wizard.mProductSelected',
	// 		getterName : 'getProduct',
	// 		setterName:'setProduct',
	// 		associationKey: 'product_id'
	// 		}

	// ],

});
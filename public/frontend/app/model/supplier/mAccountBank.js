/**
*
* Model Supplier
*
**/


Ext.define('App.model.supplier.mAccountBank',{
	extend: 'Ext.data.Model',
	fields:['id', 'bank_id', 'norek', 'name', 'dimiliki_id', 'dimiliki_type',
		'type_id', 'uuid', 'createby_id', 'lastupdateby_id', 'created_at', 'updated_at',
		{name : 'updater_name', mapping : 'updater.username'},
		{name : 'creator_name', mapping : 'creator.username'},
		{name : 'bank_name', mapping : 'bank.name'},
		{name : 'bank_address', mapping : 'bank.alamat'},
		{name : 'supplier_name', mapping : 'supplier.name'},
		{name : 'type_name', mapping : 'type.name'},
	],
});


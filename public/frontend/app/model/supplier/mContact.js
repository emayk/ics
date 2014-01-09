/**
*
* Model Supplier
*
**/


Ext.define('App.model.supplier.mContact',{
	extend: 'Ext.data.Model',
	fields:['id', 'name', 'info', 'jabatan_id', 'departement_id', 'nohp', 'email', 'fax',
		'parent_id', 'parent_type', 'uuid', 'createby_id', 'lastupdateby_id', 'created_at',
		{name : 'departement_name', mapping : 'departement.name'},
		{name : 'supplier_name', mapping : 'supplier.name'},
		{name : 'position_name', mapping : 'position.name'},
		{name : 'updater_name', mapping : 'updater.username'},
		{name : 'creator_name', mapping : 'creator.username'},
	],
 });


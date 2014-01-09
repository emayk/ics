/**
*
* Model Supplier
*
**/


Ext.define('App.model.supplier.mSupplier',{
	extend: 'Ext.data.Model',
	fields:['id', 'name', 'codepos', 'npwp', 'fax', 'email', 'plafon', 'kredit', 'alamat', 'phone', 'status_id','tipe_id', 'legalitas_id', 'typeprod_id','negara_id','province_id','city_id', 'uuid', 'createby_id', 'lastupdateby_id',

{name : 'status', mapping: 'status.name'},
{name : 'tipe', mapping: 'type.name'},
{name : 'legalitas', mapping: 'legalitas.name'},
{name : 'tipeproduct', mapping: 'type_product.name'},
{name : 'country', mapping: 'country.name'},
{name : 'province', mapping: 'province.name'},
{name : 'city', mapping: 'city.name'},
{name : 'creator', mapping: 'creator.name'},
{name : 'updater', mapping: 'updater.name'}
],

associations: [
		{ type: 'hasOne', model: 'App.model.supplier.mUser', associationKey : 'creator' }
		]


});


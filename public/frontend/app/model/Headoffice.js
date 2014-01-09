Ext.define('App.model.Headoffice',{
	extend: 'Ext.data.Model',
	fields:[
	{ 
		name: 'id',
		type: 'int',
		useNull: true
		// allowBlank: true
	},
	'alamat',
	'negara_id',
	'provinsi_id',
	'kota_id',
	{
		name : 'kodepos',
		type: 'int'
	},
	{
		// 0 = Supplier , 1 = Buyer
		name : 'tipe',
		type: 'int',
		allowBlank: true
	},
	// kepemilikan oleh ID buyer/Supplier
	{ name : 'parent_id', type: 'int',allowBlank: true},
	// Pilihan Hanya 2  yaitu Supplier atau Buyer
	{ name : 'parent_type', type: 'string',allowBlank: true},
	{ name : 'mainoffice', type: 'int' ,defaultValue: 1},
	// dibuat Oleh UID user
	{ name : 'createby_id', type: 'int' ,allowBlank: true},
	// diUpdate Oleh UID user
	{ name : 'lastupdateby_id', type: 'int' ,allowBlank: true},
	{ name : 'uuid', type: 'string',allowBlank: true}
	// {
	// 	/*==========  Token  ==========*/
	// 	name : '_token',
	// 	type: 'string',
	// 	defaultValue: token
	// }
	]

});

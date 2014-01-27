Ext.define('App.model.ContactPerson',{
	extend: 'Ext.data.Model',
	fields: [
	'id',
	'name',
	{
		name : 'deptname',
		type: 'string',
		mapping : 'dept.name'
	},

	{
		name : 'positionnname',
		mapping: 'position.name',
	},
	{
		name : 'nohp',
		mapping: 'phone'
	},

	'jabatan_id',
	'departement_id',
	'email',
	'fax',
	'info',

	{
	/*==========  Token  ==========*/
		name : '_token',
		type: 'string',
		defaultValue: token
	}
	],
	/*==========  Validation  ==========*/
	validations: [
	{
		type: 'length',
		field: 'name',
		length: 5
	}
	],
 	proxy: {
        type: 'rest',
        url : '/api/contact',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        }
    }
});

// master_contactperson
// id	int(10) unsigned Auto Increment
// name	varchar(255)
// info	varchar(255)
// jabatan_id	int(10) unsigned
// departement_id	int(10) unsigned
// nohp	varchar(30)
// email	varchar(30)
// fax	varchar(255)
// parent_id	int(11)
// parent_type	varchar(255)
// uuid	varchar(255)
// createby_id	int(10) unsigned
// lastupdateby_id	int(10) unsigned
// created_at	timestamp [0000-00-00 00:00:00]
// updated_at	timestamp [0000-00-00 00:00:00]

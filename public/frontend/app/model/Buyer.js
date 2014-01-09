/*==========  Model Buyer  ==========*/
/**
*
* Belong to : 
* Field > Model
* status_id > status
* legalitas_id > legalitas
* negara_id > Country
* type_id > type (master_type)
* typeprod_id > Product (master_tipeproduct)
* 
**/


Ext.define('App.model.Buyer',{
	fields:[
	],
	associations: [
	/*==========  Status  ==========*/
	{ type: 'belongsTo', model: 'Status', primaryKey: 'id', foreignKey: 'status_id'}
	]
});
// Ext.define('Product', {
//     fields: [...],

//     associations: [
//         { type: 'belongsTo', model: 'Category', primaryKey: 'unique_id', foreignKey: 'cat_id' }
//     ]
// });
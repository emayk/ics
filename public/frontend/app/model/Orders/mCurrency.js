/**
*
* Model Orders
*
* Programmer By Emay Komarudin.
* 2013
*
*
**/
Ext.define('App.model.Orders.mCurrency',{extend: 'Ext.data.Model',
	fields:['id', 'name',
	{ name : 'shortname',	type: 'string'},
	{ name : 'negara_id', 	type: 'int'	},
	'uuid'
	],
	// proxy: {
	// 	type: 'rest',
	// 	url: api_url +'/currency',
	// 	reader: {
	// 		type: 'json',
	// 		root: 'results',successProperty: 'success',
	// 		totalProperty: 'total'
	// 	}
	// },
	// associations: [
	// 			{ type: 'hasOne',
	// 				model: 'App.model.Orders.mOrders',
	// 				foreignKey : 'curr_id',
	// 				getterName     : 'getOrder',
	// 				associationKey: 'curr_id',
	// 			}
	// ],
});

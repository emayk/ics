/**
 *
 * Model Orders
 *
 * Programmer By Emay Komarudin.
 * 2013
 *
 *
 **/
Ext.define('App.model.Orders.mOrders', {
	extend: 'Ext.data.Model',
	requires: [
		'App.model.Orders.mCurrency',
		'App.model.Orders.mItems'
	],
	fields: [
		'id',
		// 'nodoc',
		{ name: 'nodoc', mapping: 'notrx.doc'},
		'type_id',
		'supplier_id',
		'ppn_id',
		'warehouse_id',
		'paymenttype_id',
		'cp_id',
		'curr_id',
		// { name: 'curr_id', type: 'int' },
		'delivery_at',
		{ name: 'credit', type: 'int' },
		{ name: 'kurs', type: 'int' },
		'approve_id',
		'uuid',
		'status',
		'createby_id',
		'lastupdateby_id',
		{name: 'created_at', type: 'date', dateFormat: 'Y-m-d H:i:s'},
		{name: 'updated_at', type: 'date', dateFormat: 'Y-m-d H:i:s'},
		{ name: 'payment', mapping: 'payment_type.name' },
		{ name: 'supplier', mapping: 'supplier.name' },
		{ name: 'type', mapping: 'type.name' },
		{ name: 'ppn', mapping: 'ppn.name' },
		{ name: 'warehouse', mapping: 'warehouse.name' },
		{ name: 'currency', mapping: 'currency.name' },
		{ name: 'items', mapping: 'items' },
		{ name: 'contact', mapping: 'contact.name' },
		{ name: 'creator', mapping: 'creator.fullname' },
		{ name: 'updater', mapping: 'updater.fullname' },
		{ name: 'currency_name', mapping: 'currency.name' },
		{ name: 'status_name',
			convert: function (v, record) {
				return (record.data.status == 1) ? e('status_open') : e('status_close');
			}
		},

	],

	// 	associations: [
	// 	// { type: 'belongsTo', model: 'Category' }
	// 		{ type: 'belongsTo',
	// 			model: 'App.model.Orders.mCurrency',
	// 			foreignKey 		 :  'curr_id',
	// 			// associationKey: 'curr_id',
	// 			getterName     : 'getCurrency',
	// 			reader: {type: 'json'},
	// 		},
	// 	// 	{ type: 'belongsTo',
	// 	// 		model: 'App.model.Orders.mCurrency',
	// 	// 		foreignKey 		 :  'warehouse_id',
	// 	// 		getterName     : 'getWarehouse',
	// 	// 		reader: 'json',
	// 	// 	}
	// ]

	belongsTo: [
		{
			name: 'currency',
			instanceName: 'currency',
			model: 'App.model.Orders.mCurrency',
			getterName: 'getCurrency',
			setterName: 'setCurrency',
			associationKey: 'currency'
		}
	],
	hasMany: [
		{
			name: 'items',
			model: 'App.model.Orders.mItems',
			associationKey: 'items'
		}
	],

	proxy: {
		type: 'rest',
		url: getApiUrl() + '/transorders',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}

});


//  belongsTo:[
//     {
//         name:'author',
//         instanceName:'author',
//         model:'My.model.Author',
//         getterName:'getAuthor',
//         setterName:'setAuthor',
//         associationKey:'author'
//     }
// ],


// {
//     "data": [
//         {
//             "id": 1,
//             "title": "some title",
//             "body": "some body",
//             "author": {"id":1, "name": "neil"},
//             "comments": [
//                 {
//                     "id":55,
//                     "emailAddress": "user@example.com",
//                     "body": "test comment"
//                 },
//                 {
//                     "id":66,
//                     "emailAddress": "user2@example.com",
//                     "body": "another comment"
//                 }
//             ]
//         }
//     ]
// }


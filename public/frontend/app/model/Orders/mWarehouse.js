/**
*
* Model Orders
*
* Programmer By Emay Komarudin.
* 2013
*
*
**/
Ext.define('App.model.Orders.mWarehouse',{
    extend : 'Ext.data.Model',
    	extend: 'Ext.data.Model',
	fields:['id', 'name',
	{ name : 'shortname',	type: 'string'},
	{ name : 'negara_id', 	type: 'int'	},
	'uuid'
	],
	proxy: {
		type: 'rest',
		url: api_url +'/wh',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	},
	associations: [
				{ type: 'hasOne',
					model: 'App.model.Orders.mOrders',
					foreignKey : 'curr_id',
					getterName     : 'getOrder',
				}
	],
});

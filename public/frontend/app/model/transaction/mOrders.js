/**
*
* Model transaction
*
* Programmer By Emay Komarudin.
* 2013
*
*
**/
Ext.define('App.model.transaction.mOrders',{
	extend : 'Ext.data.Model',
           // uses : 'App.model.transaction.mtransaction',
         requires: ['App.model.transaction.mtransaction'],

           fields: ['approve_id', 'cp_id', 'createby_id', 'created_at', 'credit', 'curr_id', 'delivery_at', 'id', 'kurs', 'lastupdateby_id', 'nodoc', 'paymenttype_id', 'ppn_id', 'status', 'supplier_id', 'type_id', 'updated_at', 'uuid', 'warehouse_id',
           { name : 'trx_no', mapping : 'notrx.doc'}
           ],

associations: [
        {
        	type: 'belongsTo',
        	model: 'App.model.transaction.mtransaction',
					instanceName: 'trx',
					associationKey: 'notrx',
					getterName : 'getTrx',
		      setterName:'setTrx',
					primaryKey: 'id',
					foreignKey: 'nodoc',
					reader : 'json'
      }
    ],

proxy: {
		type: 'ajax',
		url: getApiUrl() +'/transaction/list',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
	},
});



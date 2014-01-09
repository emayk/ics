/**
*
* Model Orders
*
* Programmer By Emay Komarudin.
* 2013
*
*
**/

Ext.define('App.model.Orders.wizard.order',
    extend : 'Ext.data.Model',
    requires: [

    ],
	fields : [
						'id',
						'nodoc',
						'type_id',
						'supplier_id',
						'ppn_id',
						'warehouse_id',
						'paymenttype_id',
						'cp_id',
						'curr_id',
						{ name : 'delivery_at', type: 'date'},
						{ name: 'credit' , type: 'int' },
						{ name: 'kurs' , type: 'int' },
						// 'approve_id',
						'uuid',
						'status',
						'createby_id',
						'lastupdateby_id',
						{name: 'created_at' ,type:'date' ,dateFormat: 'd M Y'},
						{name: 'updated_at' ,type:'date' ,dateFormat: 'd M Y'},
						{ name: 'payment', mapping : 'payment_type.name' },
						{ name: 'supplier', mapping : 'supplier.name' },
						{ name: 'type', mapping : 'type.name' },
						{ name: 'ppn', mapping : 'ppn.name' },
						{ name: 'warehouse', mapping : 'warehouse.name' },
						{ name: 'currency', mapping : 'currency.name' },
						{ name: 'items', mapping : 'items' },
						{ name: 'contact', mapping : 'contact.name' },
						{ name: 'creator', mapping : 'creator.fullname' },
						{ name: 'updater', mapping : 'updater.fullname' },
						{ name: 'currency_name', mapping : 'currency.name' },
						{ name: 'status_name',
						convert : function (v, record){
								return (record.data.status == 1) ? e('status_open') : e('status_close');
						}
					},

	 ],
		belongsTo : [{
			name: 'currency',
			instanceName: 'currency',
			model: 'App.model.Orders.mCurrency',
			getterName : 'getCurrency',
      setterName:'setCurrency',
			associationKey: 'currency'
		}],
		hasMany:[
        {
            name:'items',
            model:'App.model.Orders.mItems',
            associationKey:'items'
        }
    ],
});


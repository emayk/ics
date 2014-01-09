Ext.define('App.model.order.OrderOpen',{
	extend : 'Ext.data.Model',
	fields : 
		[ 
		'id',
		'po_no',
        'type_id',
        'supplier_id',
        'ppn_id',
        'warehouse_id',
        'paymenttype_id',
        'cp_id',
        'delivery_at',
        'credit',
        'curr_id',
        'kurs',
        'approve_id',
		// {
		// 	name : 'delivery',
		// 	mapping : 'delivery_at.date'
		// },
		{
			name : 'tipe',
			mapping : 'tipe.name'
		},
		
		{
			name : 'supplier',
			mapping : 'supplier.name'
		},

		{
			name : 'ppn',
			mapping: 'ppn.name'
		},

		{
			name : 'warehouse',
			mapping: 'warehouse.name'
		},
		
		{
			name : 'payment',
			mapping: 'payment.name'
		},

		{
			name : 'contact',
			mapping: 'contact.name'
		},
		{
			name : 'currency',
			mapping : 'currency.name'
		},
		{
			name : 'totalitems',
			mapping : 'total_items'
		}

	]
});


 // id: "2",
// type_id: "1",
// supplier_id: "1",
// ppn_id: "1",
// warehouse_id: "1",
// paymenttype_id: "1",
// cp_id: "1",
// delivery_at: "2013-09-27",
// credit: "1",
// curr_id: "1",
// kurs: "1",
// approve_id: "103",
// uuid: "97448470-26d8-11e3-9a42-60fb42ee2e02",
// open: "1",
// createby_id: "1",
// lastupdateby_id: "1",
// created_at: "2013-09-27 01:22:24",
// updated_at: "2013-09-27 01:22:24"    
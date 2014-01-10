Ext.define('App.model.Orders.mTreeGrid',{
    	extend: 'Ext.data.Model',
			fields:[
			'id',
			'nodoc',
			'type_id',
			'supplier_id',
			'ppn_id',
			'warehouse_id',
			'paymenttype_id',
			'cp_id',
			'curr_id',
			'delivery_at',
			'credit',
			'kurs',
			'approve_id',
			'uuid',
			'status',
			'createby_id',
			'lastupdateby_id',
			'created_at',
			'updated_at',
			],
	hasMany:[
        {
            name:'children',
            model:'App.model.Orders.mItems',
            associationKey:'children'
        }
    ],
});
Ext.define('App.model.Orders.wizard.mOrderSave',{
	extend: 'Ext.data.Model',
	fields:[
	// 'id',
	// 'pay_id',
	// 'pay_name',
	// 'wh_id',
	// 'wh_name',
	// 'oid',
	// 'wh_alamat',
	// 'cp_id',
	// 'cp_name',
	// 'cp_nohp',
	// 'sup_id',
	// 'sup_name',
	// 'product_id',
	// 'product_name',
	// 'product_image',
	// 'product_qty',
	// 'path',
	// 'status'
	'data'
	],
	proxy: {
			type: 'ajax',
			url: api_url +'/orderTest',
			reader: {
				type: 'json',
				root: 'results',
				successProperty: 'success',
				// totalProperty: 'total'
			}
		},
});
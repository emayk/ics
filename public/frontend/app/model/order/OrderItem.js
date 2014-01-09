/**
*
* Model Order Item
*
**/
Ext.define('App.model.order.OrderItem',{
	extend : 'Ext.data.Model',
	fields : [
	'id', 
	'stockproduct_id',
	{
		name : 'productname',
		mapping : 'product.name'
	},
	'ponumber',
	'qty'],
 
});


// qty	int(11)	 
// price	decimal(8,2)	 
// info	varchar(255)	 
// stock_id	int(10) unsigned	 
// order_id	int(10) unsigned	 
// uuid

// client 
// harus mengenerate qty,price = 0(tidak usah diisi), info = 'Order Item PO no xxx', order_id = ponumber


// server
// qty = qty
// price = 0,
// info = 'Order Item PO no xxx' // ambil no doc dari order_id
// order_id = ponumber

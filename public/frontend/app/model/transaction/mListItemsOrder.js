/**
*
* Model transaction
*
* Programmer By Emay Komarudin.
* 2013
*
*
**/

function subtotal(v, record){
	var subtotal = (record.get('qty') * (record.get('price')));
	return subtotal;
}

Ext.define('App.model.transaction.mListItemsOrder',{
	extend : 'Ext.data.Model',
	fields : ['trx_no','order_no','status','qty','price','product_code','product_name',
	{ name : 'subtotal', convert: subtotal }
	],
});
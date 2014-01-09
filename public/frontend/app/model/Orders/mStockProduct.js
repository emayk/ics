/**
*
* Model Orders
*
* Programmer By Emay Komarudin.
* 2013
*
*
**/
Ext.define('App.model.Orders.mStockProduct',{
    extend : 'Ext.data.Model',
    requires: [
    'App.model.Orders.mCurrency',
    'App.model.Orders.mItems'
    ],
	fields : [
	'id',
	'tipelokasi_id',
	'product_id',
	'rollnumber', 'panjangkain',
	{name : 'location_name', mapping: 'typelocation.name'},
	{name : 'warehouse_name', mapping: 'warehouse.name'},
	{name : 'product_name', mapping: 'product.name'},
	],
});


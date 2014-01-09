/**
*
* Model Tipe Order
*
* Programmer By Emay Komarudin.
* 2013
*
*
**/
Ext.define('App.model.Orders.mOrderType',{
    extend : 'Ext.data.Model',
	fields : ['id', 'name', 'info', 'uuid', 'createby_id', 'lastupdateby_id', 'created_at', 'updated_at' ],
})


/**
*
* Model Order Product
*
**/

Ext.define('App.model.order.Product',{
	extend : 'Ext.data.Model',
	fields: [
		'id',
		'name',
		'column1',
		'column2',
			{ 
				name : 'qty', 
				type: 'int', 
				defaultValue : 0 
			}
		],
	
});
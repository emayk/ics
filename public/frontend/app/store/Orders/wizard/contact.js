Ext.define('App.store.Orders.wizard.contact',{
	extend : 'Ext.data.Store',
fields: [
		'id', 'name', 'email', 'fax','nohp'
	],
	 	proxy: {
        type: 'rest', url : '/api/contact',
        reader: {type: 'json', root: 'results', totalProperty: 'total'},
        extraParams : {'parent_type' : 'Supplier'}
    }
});
Ext.define('App.store.Orders.wizard.paymenttype',{
	extend : 'Ext.data.Store',
	fields: ['id', 'name', 'info', 'uuid', ],
	 	proxy: {
        type: 'rest', url : getApiUrl() + '/paymenttype',
        reader: {type: 'json', root: 'results', totalProperty: 'total'},
    }
});

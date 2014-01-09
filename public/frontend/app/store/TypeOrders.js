Ext.define('App.store.TypeOrders',{
	extend: 'Ext.data.Store',
	model : 'App.model.Color',
	idStore: 'typeorderIdStore',
    autoSync: true,
     
	proxy: {
	type: 'rest',
	url: api_url +'/typeorder',
	reader: {
		type: 'json',
		root: 'results',
		totalProperty: 'total'
		}
	}
});
Ext.define('App.store.Colors',{
	extend: 'Ext.data.Store',
	model : 'App.model.Color',
	idStore: 'colorIdStore',
    autoSync: false
});
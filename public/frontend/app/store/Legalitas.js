Ext.define('App.store.Legalitas',{
	extend : 'Ext.data.Store',
	model: 'App.model.Legality',
	id:'legalitasStore',
    
	// autoLoad: false,
 //    autoSync: false,
	// pageSize: 15,
    proxy: {
        type: 'rest',
        url: api_url +'/legality',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        }
    }
});

 

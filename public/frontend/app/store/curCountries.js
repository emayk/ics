Ext.define('App.store.curCountries',{
    extend: 'Ext.data.Store',
    model: 'App.model.Country',
    proxy: {
        type: 'rest',
        url: getApiUrl() +'/countries',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        },
        extraParams : {
             'level' : 1,
            'parent_id' : 0
        }
    }
});

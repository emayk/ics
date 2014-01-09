Ext.define('App.store.security.Depts', {
    extend: 'Ext.data.Store',

    requires: [
        'App.model.security.Dept'
    ],

    model: 'App.model.security.Dept',

    storeId: 'depts',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: api_url + '/user_depts',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});
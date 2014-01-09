Ext.define('App.store.security.Groups', {
    extend: 'Ext.data.Store',

    requires: [
        'App.model.security.Group'
    ],

    model: 'App.model.security.Group',

    storeId: 'groups',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: api_url + '/user_groups',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});
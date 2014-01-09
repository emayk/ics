Ext.define('App.store.security.Users', {
    extend: 'Ext.data.Store',
		requires: [
        'App.model.security.User' // #1
    ],

    model: 'App.model.security.User', // #2
    autoload: true,
    proxy: {
        type: 'ajax',
        url: api_url + '/users',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});

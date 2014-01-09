Ext.define('App.store.Menu', {
    extend: 'Ext.data.Store',

    requires: [
        'App.model.menu.Root'
    ],

    model: 'App.model.menu.Root',

    proxy: {
        type: 'rest',
        // url: 'php/menu.php',
        url: api_url + '/menu',

        reader: {
            type: 'json',
            // root: 'items'
            root: 'results'
        }
    }
});
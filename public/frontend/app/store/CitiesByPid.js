/**
 * Store City
 */
Ext.define('App.store.CitiesByPid', {
    extend: 'Ext.data.Store',
    fields: [ 'id', 'name' ],
    proxy: {
        type: 'ajax',
        url: getApiUrl() + '/locations',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        },
        extraParams: {
            'uid': 0,
            'level': 3
        }
    }
});

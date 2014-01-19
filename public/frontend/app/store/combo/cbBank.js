/**
 *
 * Store Combox Box Bank
 *
 **/

Ext.define('App.store.combo.cbBank', {
    extend: 'Ext.data.Store',
    fields: [ 'id', 'name' ],
    pageSize:10,
    proxy: {
        type: 'ajax',
        url: getApiUrl() + '/bank',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        },
        extraParams: {
            'cbreq': true
        },
    }
});


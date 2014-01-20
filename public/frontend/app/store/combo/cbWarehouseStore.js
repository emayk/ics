/**
 *
 * Store Combox Box Type Payment
 *
 **/

Ext.define('App.store.combo.cbWarehouseStore', {
    extend: 'Ext.data.Store',
    fields: [ 'id', 'name' ],
    proxy: {
        type: 'rest',
        url: getApiUrl() + '/warehouse',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        },
        extraParams: {
            'cbreq': true
        }
    }
});

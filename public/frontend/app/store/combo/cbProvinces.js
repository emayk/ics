/**
 * Combo box Stora Province
 */

Ext.define('App.store.combo.cbProvinces', {
    extend: 'Ext.data.Store',
    fields: [ 'id', 'name' ],
    pageSize: 10,
    proxy: {
        type: 'ajax',
        url: getApiUrl() + '/locations',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        },
        extraParams: {
            'cbreq': true,
            'level': 2

        }
    }
});

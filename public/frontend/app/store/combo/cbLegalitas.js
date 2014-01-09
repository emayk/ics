/**
*
* Store Legality
*
**/

Ext.define('App.store.combo.cbLegalitas',{
    extend: 'Ext.data.Store',
    fields: [ 'id','name' ],
    proxy: {
        type: 'ajax',
        url: api_url +'/legality',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        },
        extraParams: {
            'cbreq' : true
        },
    }
});

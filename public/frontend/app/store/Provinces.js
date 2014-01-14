Ext.define('App.store.Provinces', {
    extend: 'Ext.data.Store',
    model: 'App.model.Province',
    autoSync: true,
    proxy: {
        type: 'rest',
        url: getApiUrl() + '/locations',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        },
        extraParams: {
            'type': 'province'
        }
    },
//    listeners: {
//        update: function (store, record, operation, eOpts) {
//            /**
//             * Akan Meload jika ada data yang berubah
//             */
//            store.reload();
//        }
//    }

});

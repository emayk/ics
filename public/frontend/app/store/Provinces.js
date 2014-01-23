Ext.define('App.store.Provinces', {
    extend: 'Ext.data.Store',
    model: 'App.model.Province',
	pageSize: 30,
    autoSync: true,
    proxy: {
        type: 'rest',
        url: getApiUrl() +'/locations',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        },
        extraParams: {
            'type': 'province',
            'level' : 2
        }
    }
//    listeners: {
//        update: function (store, record, operation, eOpts) {
//            /**
//             * Akan Meload jika ada data yang berubah
//             */
//            store.reload();
//        }
//    }

});

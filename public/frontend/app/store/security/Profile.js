Ext.define('App.store.security.Profile', {
    extend: 'Ext.data.Store',
    fields : ['id', 'username', 'fullname', 'email', 'jabatan_id',
            'departement_id', 'group_id', 'gudang_id', 'wewenang', 'status_id',
            'image_id', 'is_superadmin', 'codeinternal', 'uuid', 'createby_id',
            'lastupdateby_id', 'created_at', 'updated_at'
    ],

    proxy: {
        type: 'rest',
        url: getUrlProfile(),
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
Ext.define('App.model.security.User', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        { name: 'id' },
        { name: 'fullname' },
        { name: 'username' },
        { name: 'email' },
        { name: 'picture' },
        { name: 'group_id' },
        { name: 'departement_id' },
        { name: 'image_url', mapping: 'image.url' }
    ]
});
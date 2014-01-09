Ext.define('App.model.menu.Root', {
    extend: 'Ext.data.Model',

    uses: [
        'App.model.menu.Item'
    ],

    idProperty: 'id',

    fields: [
        {name: 'text'},
        {name: 'iconCls'},
        {name: 'className'},
        {name: 'id'}
    ],

    hasMany: {
        model: 'App.model.menu.Item',
        foreignKey: 'parent_id',
        name: 'items'
    }
});
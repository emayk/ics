Ext.define('App.model.menu.menus', {
    // extend: 'Ext.data.Model',
    extend: 'Ext.data.TreeModel',
    uses: ['App.model.menu.menusItem'],
    // idProperty: 'id',
    fields: [
        {name: 'text'},
        {name: 'iconCls'},
        {name: 'className'},
        {name: 'id'}
    ],

    hasMany: {
        model: 'App.model.menu.menusItem',
        foreignKey: 'parent_id',
        name: 'children'
    },

    proxy: {
        type: 'rest',
        url: api_url + '/menu',
        reader: {type: 'json',
        root: 'children'
    },
    }

});
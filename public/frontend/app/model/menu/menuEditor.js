Ext.define('App.model.menu.menuEditor', {
    // extend: 'Ext.data.TreeModel',
    extend: 'Ext.data.Model',
    // uses: ['App.model.menu.menusItem'],
    // idProperty: 'id',
    fields: [
        {name: 'text'},
        {name: 'iconCls'},
        {name: 'className'},
        {name: 'id'},
        {name: 'parent_id'}
    ],

    // hasMany: {
    //     model: 'App.model.menu.menusItem',
    //     foreignKey: 'parent_id',
    //     name: 'children'
    // },

    proxy: {
        type: 'rest',
        url: api_url + '/menu',
        reader: {type: 'json', root: 'results'},
				// extraParams : { 'noRoot': 'mantap'}
				// extraParams: { status : 'all' },
    },

});
Ext.define('App.model.menu.menusItem', {
   extend: 'Ext.data.Model',
    fields: [
        {name: 'text'},
        {name: 'iconCls'},
        {name: 'className'},
        {name: 'id'},
        {name: 'parent_id'} ]
});

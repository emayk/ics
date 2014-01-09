Ext.define('App.view.security.UsersList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.userslist',

    frame: true,
    // store: Ext.create('App.store.security.Users'),
    store: 'App.store.security.Users',

    columns: [
        {
            width: 150,
            dataIndex: 'username',
            text: e('username')
        },
        {
            width: 300,
            dataIndex: 'fullname',
            text: e('fullname')
        },
        {
            width: 250,
            dataIndex: 'email',
            text: e('email')
        },
        {
            width: 150,
            dataIndex: 'group_id',
            text: e('group'),
            renderer: function(value, metaData, record ){
                var groupsStore = Ext.getStore('groups');
                var group = groupsStore.findRecord('id', value);
                return group != null ? group.get('name') : value;
            }
        }
    ],
    dockedItems: [
    {
        xtype: 'pagingtoolbar',
        // id: 'pagingGudang',
        dock:'bottom',
        store: 'App.store.security.Users',
        displayInfo: true
    }]
});
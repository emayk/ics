Ext.define('App.model.menu.Item', {
    extend: 'Ext.data.Model',
    uses: ['App.model.menu.Root'],
    idProperty: 'id',
    fields: [
    	{name: 'text'},
    	{name: 'iconCls'},
    	{name: 'className'},
    	{name: 'id'},
    	{name: 'parent_id'} ],
    belongsTo: {
        model: 'App.model.menu.Root',
        foreignKey: 'parent_id',}
});

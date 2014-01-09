Ext.define('App.view.vActionBtn',{
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.vActionBtn',
	items: [
	        {   action: 'add', text: '', tooltip : 'Add', itemId: 'add', iconCls: 'action_add' },
	        {   action: 'edit', text: '', tooltip : 'Edit', disabled : true ,itemId: 'edit',iconCls : 'action_edit' },
	        {   action: 'remove', text: '', tooltip: 'Delete', disabled : true , itemId: 'remove', iconCls: 'action_delete' },
	]
});


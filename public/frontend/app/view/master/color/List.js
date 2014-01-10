Ext.define('App.view.master.color.List',{
	extend : 'Ext.grid.Panel',
	title: 'List Color',
	alias: 'widget.colorGridList',
	store: 'App.store.Colors',
	id: 'colorGridListId',
	columns: [
			{
				xtype: 'rownumberer'
			},
			{
				header: 'Name',
				dataIndex : 'name',
                flex:1,
				editor: { allowBlank: true },
			},
			{
				header: 'Information ',
				dataIndex : 'info',
                flex:1,
				editor: {
					allowBlank: true
				}
			},
			{
				header: 'UUID',
                flex:1,
				dataIndex : 'uuid'
			},
        {
            header: 'Action',
            xtype:'actioncolumn',
            width:40,
            items: [{
                iconCls:'delete',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function(btn,text){
                            if (btn == 'yes'){
                                    var rec = grid.getStore().getAt(rowIndex);
                                    grid.getStore().remove(rec);
                                    grid.getStore().sync();
                                    grid.getStore().load();
                            }
                            });
                    }
                }]
        }
			],
	columnLines: true,
	selModel: 'rowmodel',
     /*==========  Plugins  ==========*/
     plugins: [
     Ext.create('Ext.grid.plugin.RowEditing',{
     		clicksToEdit: !1,
     		pluginId: 'cellEditorColor',
     		clicksToMoveEditor: 1
     	})
     ],
	/*==========  DockedItems  ==========*/
	dockedItems: [
	{
		xtype: 'toolbar',
		items: [{
				action: 'add',
				text: 'Add'
		},
		{
			action: 'remove',
			text: 'Remove',
			disabled : true
		}
		]
	},
	{
        xtype: 'pagingtoolbar',
        id: 'pagingColor',
        dock:'bottom',
        store: 'App.store.Colors',
        displayInfo: true
	}],
    initComponent: function(){
        this.callParent(arguments);
    }
});
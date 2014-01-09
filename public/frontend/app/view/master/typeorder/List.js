Ext.define('App.view.master.typeorder.List',{
	extend : 'Ext.grid.Panel',
	title: 'List',
	alias: 'widget.typeorderGridList',
	store: 'TypeOrders',
	// id: 'typeorderGridListId',
	columns: [
			{
				xtype: 'rownumberer'
			},
			{
				header: 'Name',
				dataIndex : 'name',
				editor: {
					allowBlank: true
				},
			},
			{
				header: 'Information',
				dataIndex : 'info',
				editor: {
					allowBlank: true
				}
			},
			{
				header: 'UUID',
				dataIndex : 'uuid'
			},
			        {
            header: 'Action',
            xtype:'actioncolumn',
            flex: .4,
            items: [{
		            iconCls:'delete',
                // icon: '/assets/fugue/icons/cross-shield.png',
                tooltip: 'Delete',

                handler: function(grid, rowIndex, colIndex) {
                            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function(btn,text){
                            if (btn == 'yes'){
                                    var rec = grid.getStore().getAt(rowIndex);
                                    grid.getStore().remove(rec);
                                    grid.getStore().sync();
                                    grid.getStore().load();
                                    Ext.getCmp('pagingContactPerson').doRefresh();
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
     		pluginId: 'cellEditorOrderType',
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
        id: 'pagingTypeOrder',
        dock:'bottom',
        store: 'TypeOrders',
        displayInfo: true
	}],
	initComponent : function(){
		this.callParent(arguments);
		Ext.getStore(this.store).load();
	}
});
Ext.define('App.view.trx.order.ListClose',{
	extend : 'Ext.grid.Panel',
	// title: 'Daftar Invoice (Close)',
	alias: 'widget.gridOrderClose',
	store: 'order.OrdersClose',
 	// layout : 'fit',
 	// height : '100%',
	columns: [
			{
				xtype: 'rownumberer',
				width : 30,
			},
			{
				header: 'Name',
				dataIndex : 'name',
				flex: 1,
				editor: { allowBlank: true },
			},			
			{
				header: 'Information',
				dataIndex : 'info',
				flex: 1,
				editor: { 
					allowBlank: true 
				}
			},			
        {   
            header: 'Action',
            xtype:'actioncolumn', 
            flex: .4,
            tdCls:'delete',
            items: [{
                icon: '/assets/fugue/icons/cross-shield.png',
                tooltip: 'Delete',
                // handler: function(grid, rowIndex, colIndex) {
                //             Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function(btn,text){
                //             if (btn == 'yes'){
                //                     var rec = grid.getStore().getAt(rowIndex);
                //                     grid.getStore().remove(rec);
                //                     grid.getStore().sync();
                //                     grid.getStore().load();
                //                     Ext.getCmp('pagingContactPerson').doRefresh();
                //             }            
                //             });
                //     }
                }]
        }
			]
	,
	// columnLines: true,
	selModel: 'rowmodel',
     /*==========  Plugins  ==========*/
     plugins: [
     Ext.create('Ext.grid.plugin.RowEditing',{
     		clicksToEdit: !1,
     		pluginId: 'ceOrderClose',
     		clicksToMoveEditor: 1
     	})
     ],
	/*==========  DockedItems  ==========*/	
	dockedItems: [
	{
        xtype: 'pagingtoolbar',
        id: 'pgOrderClose',
        dock:'bottom',
        store: 'order.OrdersClose',
        displayInfo: true
	}],
	initComponent : function(){
		this.callParent(arguments);
		Ext.getStore(this.store).load();
	}
});


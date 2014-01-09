Ext.define('App.view.trx.order.ListOrderItems',{
	extend : 'Ext.grid.Panel',
	alias: 'widget.gridOrderItems',
	store: 'order.OrderItems',
	columns: [
			{
				xtype: 'rownumberer',
				width : 30,
			},
    

            {
				header : 'Product Name',
				dataIndex : 'productname',
				flex: 1,
			},

			{
				header: 'Qty',
				dataIndex : 'qty',
				flex: 1,
				editor: { 
					allowBlank: false,
                    xtype : 'numberfield',
                    // minValue : 1,
				}
			},			
        {   
            header: 'Remove',
            tooltip : 'Remove From Order',
            xtype:'actioncolumn', 
            flex: .4,
            tdCls:'delete',
            items: [{
                icon: '/assets/fugue/icons/cross-shield.png',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function(btn,text){
                            if (btn == 'yes'){
                                    var rec = grid.getStore().getAt(rowIndex);
                                    grid.getStore().remove(rec);
                                    grid.getStore().sync();
                                    grid.getStore().load();
                                    this.getPlugin('pgOrderOpenItems').doRefresh();
                            }            
                            });
                    }
                }]
        }
			]
	,
	columnLines: true,
	selModel: 'rowmodel',
     /*==========  Plugins  ==========*/
     plugins: [
     Ext.create('Ext.grid.plugin.RowEditing',{
     		clicksToEdit: !1,
     		pluginId: 'ceOrderOrderItem',
     		clicksToMoveEditor: 1
     	})
     ],
	/*==========  DockedItems  ==========*/	
	dockedItems: [
	{
        xtype: 'pagingtoolbar',
        id: 'pgOrderOpenItems',
        dock:'bottom',
        store: 'order.OrderItems',
        displayInfo: true,
	}],
	initComponent : function(){
		this.callParent(arguments);
	}
});


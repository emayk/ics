Ext.define('App.view.trx.order.ListOpen',{
	extend : 'Ext.grid.Panel',
	alias: 'widget.gridOrderOpen',
	store: 'order.OrdersOpen',
 	emptyText : 'Tidak ada Order',
	columns: [
			{
				xtype: 'rownumberer',
				width : 30,
			},
			
			{
				header : 'PO',
				dataIndex : 'po_no',
				flex: 50,
			},

			{
				header : 'Supplier',
				dataIndex : 'supplier_id',
                renderer: function(value, metaData, record, row, col, store, gridView){
                    return record.get('supplier');
                },
			},

			
			{
				header : 'Type',
				dataIndex : 'type_id',
                renderer: function(value, metaData, record, row, col, store, gridView){
                    return record.get('tipe');
                },
			},

			{
				header : 'Tax',
				dataIndex : 'ppn_id',
                renderer: function(value, metaData, record, row, col, store, gridView){
                    return record.get('ppn');
                },
			},
			
			{
				header : 'Delivery To',
				dataIndex : 'warehouse_id',
                renderer: function(value, metaData, record, row, col, store, gridView){
                    return record.get('warehouse');
                },
			},
			
			{
				header : 'Payment',
				dataIndex : 'paymenttype_id',
                renderer: function(value, metaData, record, row, col, store, gridView){
                    return record.get('payment');
                },
			},
			
			{
				header: 'Contact',
				dataIndex : 'cp_id',
                renderer: function(value, metaData, record, row, col, store, gridView){
                    return record.get('contact');
                },
			},
			
			{
				header : 'Currency',
				dataIndex : 'curr_id',
                renderer: function(value, metaData, record, row, col, store, gridView){
                    return record.get('currency');
                },
			},

			{
				header : 'Items',
				dataIndex : 'totalitems',
				renderer: function(value, metaData, record, row, col, store, gridView){
                    return ((value) == 0 ) ? 'Empty' : ((value == 1 )) ? value + ' item' : value +' items';
                },	
			},
			
			{
				header : 'Delivery',
				dataIndex : 'delivery_at',
			    // renderer: Ext.util.Format.dateRenderer('j F Y, g:i a')				
			    renderer: Ext.util.Format.dateRenderer('j F Y')				
			},

			{
				header : 'Curs',
				dataIndex : 'kurs',
			},

			{
				header : 'Approve?',
				dataIndex : 'approve_id',
	            renderer: function(value, metaData, record, row, col, store, gridView){
				    return (value > 0) ? 'Yes' : 'No'
				},
			},


			
        {   
            header: 'Action',
            xtype:'actioncolumn', 
            tooltip : 'Set Close Invoice',
            flex: .4,
            // tdCls:'delete',
            items: [{
                icon: '/assets/fugue/icons/cross-shield.png',
                tooltip: 'Set Invoice Close',
                handler: function(grid, rowIndex, colIndex) {
                            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function(btn,text){
                            if (btn == 'yes'){
                            	Ext.Msg.alert('Process', '[Simulation] Deleted Successfully');
                                    // var rec = grid.getStore().getAt(rowIndex);
                                    // grid.getStore().remove(rec);
                                    // grid.getStore().sync();
                                    // grid.getStore().load();
                                    // Ext.getCmp('pagingContactPerson').doRefresh();
                            }            
                            });
                    },

                }]
        }
			]
	,
	// columnLines: true,
	selModel: 'rowmodel',
     /*==========  Plugins  ==========*/
     // plugins: [
     // Ext.create('Ext.grid.plugin.RowEditing',{
     // 		clicksToEdit: !1,
     // 		pluginId: 'ceOrderList',
     // 		clicksToMoveEditor: 1
     // 	})
     // ],
	/*==========  DockedItems  ==========*/	
	dockedItems: [
	{
        xtype: 'pagingtoolbar',
        id: 'pgOrderOpen',
        dock:'bottom',
        store: 'order.OrdersOpen',
        displayInfo: true
	}],
	initComponent : function(){
		this.callParent(arguments);
		Ext.getStore(this.store).load();
	}
});

